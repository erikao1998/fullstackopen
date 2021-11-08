import React, {useState} from 'react'
import { Table } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect, useParams
} from 'react-router-dom'
import blogService from '../services/blogs'
import { like, remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/NotificationReducer'
import {useDispatch, useSelector} from 'react-redux'


const Blog = ({user}) => {
  const id = useParams().id
  let blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return <Redirect to="/blogs" />
  }


  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)
  const blogUser = users.find(user => blog.user === user.id)

  const deleteBlog = async () => {
    console.log('delete')
    if (blog.user.username !== user.username) {
      window.alert('The blog is added by another user. You can\'t delete it')
    } else {
      console.log('deleted')
      if (window.confirm(`Delete ${blog.title}?`)) {
        dispatch(remove(id))
        dispatch(setNotification({message: `Deleted ${blog.title}`, red: false}, 3))
        window.location.reload()
      }
    }
    // else {
    //   if (window.confirm(`Delete ${searchedBlog.title}?`)) {
    //     const response = await blogService.deleteBlog(id)
    //     setBlogs(blogs.filter(b => b.id !== id))
    //     dispatch(setNotification({message: `Deleted ${searchedBlog.title}`, red: false}, 3))
    //   }
    // }
  }
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    console.log('created')
    console.log(comment)
    const createdComment = {
      comment: comment
    }
    console.log('component: ', createdComment)
    const newComment = await blogService.createComment(id, createdComment)
    blog.comments = blog.comments.concat(newComment)
    setComment('')
  }


  const updateBlog = async () => {
    console.log('update')
    const changedBlog = { ...blog, likes: blog.likes + 1}
    dispatch(like(blog.id, changedBlog))
    // console.log(blogs)
    // const newBlogs = await blogService.getAll()
    // setBlogs(newBlogs)
  }

  return (
    <div>
      <p>{blog.title} <b>by</b> {blog.author}</p>
      <div>
        {blog.likes} likes
        <button onClick={() => updateBlog()}>like</button>
      </div>
      <button onClick={() => deleteBlog()}>delete</button>
      <p>Added by <i>{!blog.user.name ? blogUser.name : blog.user.name}</i></p>
      <div className='comments'>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input id='comment' value={comment} onChange={handleCommentChange} />
          <button type='submit'>add</button>
        </form>
        {blog.comments.length === 0 ?
          <div>no comments</div> :
          <div style={{padding: 10}}>{blog.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}</div>}
      </div>
    </div>
  )
}

export default Blog
