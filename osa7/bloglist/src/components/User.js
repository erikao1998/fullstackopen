import React from 'react'
import {
  useParams
} from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return (
    <div style={{marginLeft: 10}}>
      <h2>{user.username}</h2>
      <p>added blogs</p>
      <div style={{marginLeft: 35}}>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </div>
    </div>
  )
}

export default User
