import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

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
      if (!username || !password) {
        setErrorMessage({message: 'username or password needed', red: true})
        setTimeout(() => {
          setErrorMessage({message: null, red: false})
        }, 3000)
      }
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

  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(blog => {

        setBlogs(blogs.concat(blog))


        setErrorMessage(
          {message: `Added '${blog.title}'`, red: false}
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

  const updateBlog = async (id) => {
    const searchedBlog = blogs.find(blog => blog.id === id)
    let like = 0
    if (!searchedBlog) {
      like = 1
    } else {
      like += searchedBlog.likes + 1
    }
    const changedBlog = { ...searchedBlog, likes: like}
    const response = await blogService.update(id, changedBlog)
    console.log(blogs)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const deleteBlog = async (id) => {
    console.log(id)
    const searchedBlog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete ${searchedBlog.title}?`)) {
      const response = await blogService.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
      setErrorMessage({message: `Deleted ${searchedBlog.title}`, red: false})
      setTimeout(() => {
        setErrorMessage({message: null, red: false})
      }, 2000)
    }
  }


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogilista = () => {

    return (
      <div>
        {user.name === null
          ?  <p>{user.username} is logged in</p>

          :  <p>{user.name} is logged in</p>
        }


        <button type="button" onClick={handleLogout}>logout</button>

        <Togglable buttonLabel="add a new blog">
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>

        <p><b>Blogs</b></p>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={() => deleteBlog(blog.id)} updateBlog={() => updateBlog(blog.id)} />

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
