import anecdoteService from '../services/anecdotes'

export const vote = (id, object) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, object)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = (content) => {

  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      console.log('anecdoteToChange', anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    default:
      return state
  }

}

export default reducer
