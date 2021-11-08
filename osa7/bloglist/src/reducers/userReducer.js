import blogService from '../services/blogs'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await blogService.getUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }

}

export default reducer
