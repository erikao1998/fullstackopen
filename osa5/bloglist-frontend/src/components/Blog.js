import React, {useState} from 'react'

const Blog = ({blog, deleteBlog, updateBlog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 500,
    background: 'green'

  }


  return (
    <div>
      <div style={hideWhenVisible}>
        <b>{blog.title}</b> by {blog.author}
        <div>
          <button style={{marginLeft:10}} onClick={toggleVisibility} className='.view'>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <div style={blogStyle}>
          <p className='info'>{blog.title}</p>
          <p className='info'>{blog.author}</p>
          <p className='info'>{blog.url}</p>
          <p className='info'>{ !blog.likes ? 0 : blog.likes } <button onClick={updateBlog}>like</button></p>
          <button style={{marginLeft:10}} onClick={toggleVisibility}>hide</button>
          <button onClick={deleteBlog}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
