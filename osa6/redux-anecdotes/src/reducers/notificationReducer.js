const initialState = null

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'DELETE_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const createNotification = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer
