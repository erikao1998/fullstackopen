import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const filter = useSelector(state => state.filter)

  const voteActions = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(createNotification(`voted anecdote ${anecdote.content}`))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }


  return (
    <div>
      {filter === ''
      ? sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteActions(anecdote)}>vote</button>
          </div>
        </div>
      )
    : sortedAnecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
      .map(anecdote =>
      <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteActions(anecdote)}>vote</button>
          </div>
        </div>  )}
    </div>
  )
}


export default AnecdoteList
