import React, { useState } from 'react'

const App = () => {

    const [clicks, setclicks] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });

    const handleGoodClick = () => setclicks({...clicks, good: clicks.good + 1})
    const handleNeutralClick = () => setclicks({...clicks, neutral: clicks.neutral + 1})
    const handleBadClick = () => setclicks({...clicks, bad: clicks.bad + 1})


  return (
      <>
        <h1>Give Feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={}>neutral</button>
        <button>bad</button>
      </>
    
  )
}

export default App