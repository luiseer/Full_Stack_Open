import { useState } from 'react';

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [feedBack, setFeedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    positive: 0,
  });

  console.log(feedBack);

  const handleGood = () => {
    const newTotal = feedBack.total + 1;
    const newGood = feedBack.good + 1;
    const newAverage = (newGood - feedBack.bad) / newTotal;
    const newPositive = (newGood / newTotal) * 100;

    setFeedBack({
      ...feedBack,
      total: newTotal,
      good: newGood,
      average: newAverage,
      positive: newPositive,
    });
  };

  const handleNeutral = () => {
    const newTotal = feedBack.total + 1;
    const newNeutral = feedBack.neutral + 1;
    const newAverage = (feedBack.good - feedBack.bad) / newTotal;
    const newPositive = (feedBack.good / newTotal) * 100;

    setFeedBack({
      ...feedBack,
      total: newTotal,
      neutral: newNeutral,
      average: newAverage,
      positive: newPositive,
    });
  };

  const handleBad = () => {
    const newTotal = feedBack.total + 1;
    const newBad = feedBack.bad + 1;
    const newAverage = (feedBack.good - newBad) / newTotal;
    const newPositive = (feedBack.good / newTotal) * 100;

    setFeedBack({
      ...feedBack,
      total: newTotal,
      bad: newBad,
      average: newAverage,
      positive: newPositive,
    });
  };

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
      <p>Average {feedBack.average}</p>
      <p>Positive {feedBack.positive}%</p>
    </div>
  );
};

export default App;
