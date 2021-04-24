import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [mostVoted, setMostVoted] = useState(0)
  const [selected, setSelected] = useState(0)

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)

    setMostVoted(0)
    let most = copyVotes[0]

    for (let i = 1; i < copyVotes.length; i++) {
      if (copyVotes[i] > most) {
        most = copyVotes[i]
        setMostVoted(i)
      }
    }
  }

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <p>
        <Button handleClick={handleVoteClick} text='vote' />
        <Button handleClick={handleNextClick} text='next anecdote' />
      </p>
      <h2>Anecdote with most votes</h2>
      <Display anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App
