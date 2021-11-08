import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }

  if (notification.red === true) {

    return (
      <div className='redError'>
        {notification.message}
      </div>
    )
  }

  return (
    <div className='greenError'>
      {notification.message}
    </div>
  )
}

export default Notification
