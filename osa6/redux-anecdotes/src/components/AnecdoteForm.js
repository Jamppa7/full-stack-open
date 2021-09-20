import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)
    props.setNotification(`new anecdote '${content}'`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
      <b>create new</b>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
      <br></br><br></br>
    </form>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)
