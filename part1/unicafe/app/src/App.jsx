import { useState } from 'react';

const StatisticLine = ({ text, value }) => (
  <p>{text}: {value}</p>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <>
      <table>
        <tr>
          <td>
            <StatisticLine text="Good" value={good} />
          </td>
          <td>
            <StatisticLine text="Neutral" value={neutral} />
          </td>
          <td>
            <StatisticLine text="Bad" value={bad} />
          </td>
          <td>
            <StatisticLine text="All" value={total} />
          </td>
          <td>
            <StatisticLine text="Average" value={average} />
          </td>
          <td>
          <StatisticLine text="Positive" value={`${positive}%`} /> 
          </td>
        </tr>
      </table>
    </>
  );
}

const WarningNotUse = () => {
  return <h1>No feedback given</h1>;
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [feedBack, setFeedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    positive: 0,
  });

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
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h2>statistics</h2>
      {feedBack.total === 0 ? (
        <WarningNotUse />
      ) : (
        <Statistics
          good={feedBack.good}
          neutral={feedBack.neutral}
          bad={feedBack.bad}
          total={feedBack.total}
          average={feedBack.average}
          positive={feedBack.positive}
        />
      )}
      
    </div>
  );
};

export default App;
