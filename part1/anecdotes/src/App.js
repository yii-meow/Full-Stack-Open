import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anecdote = ({ selected, count }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {selected} <br />
      has {count} votes
    </div>
  )
}

const MaxVotedAnecdote = ({ anecdotes }) => {
  // find the max vote of the object array
  let maxVote = Math.max(...anecdotes.map(a => a.count))

  // retrieve the position of the max voted
  let maxVotePosition = anecdotes.find(a => a.count === maxVote)

  return (<div>
    <h1>Anecdote with most votes</h1>
    {maxVotePosition.anecdote} <br /> has {maxVotePosition.count} votes
  </div>);
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState(
    [
      { "anecdote": 'If it hurts, do it more often.', count: 0 },
      { "anecdote": 'Adding manpower to a late software project makes it later!', count: 0 },
      { "anecdote": 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', count: 0 },
      { "anecdote": 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', count: 0 },
      { "anecdote": 'Premature optimization is the root of all evil.', count: 0 },
      { "anecdote": 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', count: 0 },
      { "anecdote": 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', count: 0 },
      { "anecdote": 'The only way to go fast, is to go well.', count: 0 }
    ], 0
  )

  const [selected, setSelected] = useState(0)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteAnecdote = () => {
    const copy = [...anecdotes]
    copy[selected].count += 1
    setAnecdotes(copy)
  }

  return (
    <div>
      <Anecdote selected={anecdotes[selected].anecdote} count={anecdotes[selected].count} />

      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={randomAnecdote} text="Next Anecdote" />

      <MaxVotedAnecdote anecdotes={anecdotes} />
    </div>
  )
}

export default App