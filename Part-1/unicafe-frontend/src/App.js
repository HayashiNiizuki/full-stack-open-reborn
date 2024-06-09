import { useState } from 'react'

const StatisticLine = ({ _name, value }) => (<tr>
  <td>{_name}</td>
  <td>{value}</td>
</tr>)

const Statistics = ({ good, neutral, bad }) => {
  if (good > 0 || neutral > 0 || bad > 0)
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <StatisticLine _name="Good" value={good}></StatisticLine >
          <StatisticLine _name="Neutral" value={neutral}></StatisticLine >
          <StatisticLine _name="Bad" value={bad}></StatisticLine >
          <StatisticLine _name="Total" value={good + neutral + bad}></StatisticLine >
          <StatisticLine _name="Average" value={good - bad}></StatisticLine >
          <StatisticLine _name="Positive" value={`${(good / (good + neutral + bad) * 100).toFixed(2)}%`}></StatisticLine >
        </table>
      </div>
    )
  else
    return (<div><h1>Statistics</h1><p>No Feedback yet.</p></div>)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good(*^▽^*)</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral(⊙︿⊙)</button>
      <button onClick={() => setBad(bad + 1)}>Bad(•́へ•́╬)</button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App