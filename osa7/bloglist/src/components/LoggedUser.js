import React from 'react'

const LoggedUser = ({user, handleLogout}) => {
  if (!user) {
    return null
  }
  return (
    <div style={{marginBottom: 20, border: 'outset' , width: 500}}>
      <div style={{padding: 10}}>

        {user.name === null
          ?  <h4 style={{display: 'inline-block'}}>{user.username} is logged in</h4>

          :  <h4 style={{display: 'inline-block'}}>{user.name} is logged in</h4>
        }
        <button style={{marginLeft: 25}}type="button" onClick={handleLogout}>logout</button>

      </div>
    </div>
  )
}

export default LoggedUser
