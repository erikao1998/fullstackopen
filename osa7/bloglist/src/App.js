import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import User from './components/User'
import { Table, Navbar, Nav } from 'react-bootstrap'
import Notification from './components/Notification'
import { setNotification } from './reducers/NotificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from 'react-router-dom'
import Users from './components/Users'
import LoggedUser from './components/LoggedUser'

const App = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUser', loggedUserJSON)

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)

    }

  }, [])

  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      if (!username || !password) {
        dispatch(setNotification({message: 'username or password needed', red: true}, 3))
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
      dispatch(setNotification({message: 'wrong username or password', red: true}, 3))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    try {
      dispatch(addBlog(blogObject))
      dispatch(setNotification({message: `Added '${blogObject.title}'`, red: false}, 3))
    } catch (e) {
      console.log(e)
      dispatch(setNotification({message: 'Something went wrong', red: true}, 3))
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

        <Togglable buttonLabel="add a new blog">
          <BlogForm
            createBlog={createBlog} user={user}
          />
        </Togglable>

        <div id='blogs'>
          <h2>Blogs</h2>
          <Table striped>
            <tbody>
              {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}><strong>{blog.title}</strong></Link>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h1 className='title'>Bloglist</h1>
      </div>
      <div>
        <Navbar collapseOnSelect className="color-nav" expand="xl" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={{padding: 5}} to="/blogs"><strong>blogs</strong></Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={{padding: 5}} to="/users"><strong>users</strong></Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>

      <LoggedUser user={user} handleLogout={handleLogout} />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blogs={blogs} user={user}/>
        </Route>
        <Route path="/users/:id">
          <User users={users}/>
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!user ? loginForm() : <Redirect to="/blogs" />}
        </Route>
        <Route path="/blogs">
          {user ?
            <div>
              <div>
                <Notification />
                {blogilista()}
              </div>
            </div> : <Redirect to="/login" />
          }
        </Route>
      </Switch>
    </Router>
  )
}

export default App
