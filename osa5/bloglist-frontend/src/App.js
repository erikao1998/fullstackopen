import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({errorMessage}) => {
  if (errorMessage.message === null) {
    return null
  }

  if (errorMessage.red === true) {

    return (
      <div className='redError'>
        {errorMessage.message}
      </div>
    )
  }

  return (
    <div className='greenError'>
     {errorMessage.message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage ] = useState({message: null, red: true})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({message: 'wrong username or password', red: true})
      setTimeout(() => {
        setErrorMessage({message: null, red: false})
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(blog => {

        setBlogs(blogs.concat(blog))

        setTitle('')
        setAuthor('')
        setUrl('')
        setErrorMessage(
          {message: `Added '${blogObject.title}'`, red: false}
        )
        setTimeout(() => {
          setErrorMessage({message: null, red: false})
        }, 2000)
      })
      .catch(error => {
        setErrorMessage({message: 'something went wrong', red: true})

        setTimeout(() => {
          setErrorMessage(
            {message: null, red: false}
          )
        }, 3000)
      })

  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogilista = () => {
    console.log("blogs", blogs)
    return (
      <div>
        {user.name === null
        ?  <p>{user.username} is logged in</p>

        :  <p>{user.name} is logged in</p>
        }


        <button type="button" onClick={handleLogout}>logout</button>
        <BlogForm add={addBlog} handleTitle={handleTitleChange} handleAuthor={handleAuthorChange} handleUrl={handleUrlChange} url={url} title={title} author={author} />
        <p><b>Blogs</b></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />

        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogilista</h1>

      <Notification errorMessage={errorMessage}/>

      {user === null ?

         loginForm() :

         blogilista()}
    </div>
  )
}

export default App
