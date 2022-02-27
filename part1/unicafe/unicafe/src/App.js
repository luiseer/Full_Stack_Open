import React, { useState } from 'react'


const HandleButton = (props) => {

  return (
    <>
      <button onClick={props.handleGoodClick || props.handleNeutralClick || props.handleBadClick}>{props.text}</button>
    </>
  )
}


const Statistics = (props) => {
  return (

    <>
      <h2>Statistics</h2>
      {
        props.clicks.good || props.clicks.bad || props.clicks.neutral ?
          <>
            <table>
              <tr>good {props.clicks.good}</tr>
              <tr>bad {props.clicks.bad}</tr>
              <tr>neutral {props.clicks.neutral}</tr>
              <tr>all {props.all}</tr>
              <tr>average {props.average}</tr>
              <tr>positive {props.positive}%</tr>
            </table>

          </> : <p>No Feedback given</p>
      }
    </>
  )
}

const App = (props) => {
  const [clicks, setclicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });
  const handleGoodClick = () => setclicks({ ...clicks, good: clicks.good + 1 })
  const handleNeutralClick = () => setclicks({ ...clicks, neutral: clicks.neutral + 1 })
  const handleBadClick = () => setclicks({ ...clicks, bad: clicks.bad + 1 })
  const all = clicks.bad + clicks.good + clicks.neutral
  const average = all / 3
  const positive = (clicks.good - clicks.neutral - clicks.bad) * 1.100
  return (
    <>
      <h1>Give Feedback</h1>
      <HandleButton
        text='good'
        handleGoodClick={handleGoodClick}
      />
      <HandleButton
        text='neutral'
        handleNeutralClick={handleNeutralClick}
      />
      <HandleButton
        text='bad'
        handleBadClick={handleBadClick}
      />
      <Statistics
        clicks={clicks}
        all={all}
        average={average}
        positive={positive}
      />
    </>

  )
}

export default App