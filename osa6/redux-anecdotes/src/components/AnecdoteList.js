import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const anecdotesFiltered = AnecdotesToShow(anecdotes, filter)
  const anecdotesSorted = [...anecdotesFiltered.sort((first, second) => second.votes - first.votes)]

  const updateAnecdote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.content, anecdote.votes += 1, anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotesSorted.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => updateAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
