import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) return (
    <>
      <p>Statistics</p>
      <div>No feedback given</div>
    </>
  )

  const average = (good - bad) / total
  const positive = (good / total * 100) + '%'
  
  return (
    <>
      <p>Statistics</p>
      <StatisticsLine text='Good' value={good} />
      <StatisticsLine text='Neutral' value={neutral} />
      <StatisticsLine text='Bad' value={bad} />
      <StatisticsLine text='Average' value={average} />
      <StatisticsLine text='Positive' value={positive} />
    </>
  )
}

const StatisticsLine = ({text, value}) => <div>{text} {value}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p>Feedback</p>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad ={bad} />
    </div>
  )
}

export default App