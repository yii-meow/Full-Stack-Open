import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {

  if (total === 0) {
    return <div>No Feedback Given</div>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodFeedback = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={goodFeedback} text="good" />
      <Button handleClick={neutralFeedback} text="neutral" />
      <Button handleClick={badFeedback} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}
        average={(good * 1 + bad * -1) / total} positive={good / total * 100} />

    </div>
  )
}

export default App