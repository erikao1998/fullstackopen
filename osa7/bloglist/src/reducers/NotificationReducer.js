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


export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
        notification: null
      })
    }, time*1000)
  }
}

export default notificationReducer
