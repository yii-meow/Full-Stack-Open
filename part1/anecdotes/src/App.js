import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anectode = ({ selected, count }) => {
  return (
    <div>
      <h1>Anectode of the day</h1>
      {selected} <br />
      has {count} votes
    </div>
  )
}

const MaxVotedAnectode = ({ anecdotes }) => {
  // find the max vote of the object array
  let maxVote = Math.max(...anecdotes.map(a => a.count))

  // retrieve the position of the max voted
  let maxVotePosition = anecdotes.find(a => a.count === maxVote)

  return (<div>
    <h1>Anectode with most votes</h1>
    {maxVotePosition.anectode} <br /> has {maxVotePosition.count} votes
  </div>);
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState(
    [
      { "anectode": 'If it hurts, do it more often.', count: 0 },
      { "anectode": 'Adding manpower to a late software project makes it later!', count: 0 },
      { "anectode": 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', count: 0 },
      { "anectode": 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', count: 0 },
      { "anectode": 'Premature optimization is the root of all evil.', count: 0 },
      { "anectode": 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', count: 0 },
      { "anectode": 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', count: 0 },
      { "anectode": 'The only way to go fast, is to go well.', count: 0 }
    ], 0
  )

  const [selected, setSelected] = useState(0)

  const randomAnectode = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteAnectode = () => {
    const copy = [...anecdotes]
    copy[selected].count += 1
    setAnecdotes(copy)
  }

  return (
    <div>
      <Anectode selected={anecdotes[selected].anectode} count={anecdotes[selected].count} />

      <Button handleClick={voteAnectode} text="vote" />
      <Button handleClick={randomAnectode} text="next anectode" />

      <MaxVotedAnectode anecdotes={anecdotes} />
    </div>
  )
}

export default App