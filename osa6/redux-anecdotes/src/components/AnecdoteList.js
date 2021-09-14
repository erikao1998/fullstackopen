import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const filter = useSelector(state => state.filter)

  const voteActions = (anecdote) => {
    const updatedAnecdote = {content: anecdote.content, votes: anecdote.votes+=1}
    dispatch(vote(anecdote.id, updatedAnecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }


  return (
    <div className="search-node">
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
