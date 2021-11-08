import axios from 'axios'
import React, {useState, useEffect} from 'react'
import blogService from '../services/blogs'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {

  const users = useSelector(state => state.users)

  return (
    <div style={{marginLeft: 5}}>
      <h2>Users</h2>
      <table style={{width: 200}}>
        <tbody>
          <tr>
            <th></th>
            <th><b>Blogs created</b></th>
          </tr>
          <td style={{width: 120}}>
            {users.map(user =>
              <tr key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </tr>
            )}
          </td>
          <td>
            {users.map(user =>
              <tr key={user.id}>{user.blogs.length}</tr>
            )}
          </td>
        </tbody>
      </table>
    </div>
  )
}

export default Users
