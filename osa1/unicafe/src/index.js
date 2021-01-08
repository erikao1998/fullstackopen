import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)


const Statistics = ({ g, n, b, arr }) => {

  const average = () => {
    const avg = ((g * 1 + n * 0 + b * -1) / arr.length)
    return avg
  }

  const positive = () => {
    const pos = (g / (g + n + b) * 100)
    return pos
  }

  if (arr.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>

          <StatisticLine text='good' value={g} />
          <StatisticLine text='neutral' value={n} />
          <StatisticLine text='bad' value={b} />
          <StatisticLine text='average' value={average()} />
          <StatisticLine text='positive' value={positive() + " %"} />
        </tbody>
      </table>
    </div>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGood = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> Give feedback </h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <h1> Statistics </h1>
      <Statistics g={good} n={neutral} b={bad} arr={allClicks} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
