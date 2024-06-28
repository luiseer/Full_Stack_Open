import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [feedBack, setFeedBack] = useState(
    {
      good: 0,
      neutral: 0,
      bad: 0,
      total: 0,
      average: [],
      positive: 0
    }
  );

  console.log(feedBack)

  const handleGood = () =>{
    setFeedBack({
      ...feedBack,
      total: feedBack.total + 1,
      good: feedBack.good + 1,
      positive: feedBack.total / 3
    })
  }
  const handleNeutral = () =>{
    setFeedBack({
      ...feedBack,
      total: feedBack.total + 1,
      neutral: feedBack.neutral + 1,
      positive: feedBack.total / 3
    })
  }
  const handleBad = () =>{
    setFeedBack({
      ...feedBack,
      total: feedBack.total + 1,
      bad: feedBack.bad + 1,
      positive: feedBack.total / 3
    })
  }



  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h2>statics</h2>
      <p>Good: {feedBack.good}</p>
      <p>Neutral: {feedBack.neutral}</p>
      <p>Bad: {feedBack.bad}</p>
      <p>All {feedBack.total}</p>
      <p>Average {feedBack.positive}</p>
    
    </div>
  )
}

export default App