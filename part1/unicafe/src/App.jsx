import { useState } from "react";

const Button = ({ onButtonClick, text }) => {
  return <button onClick={onButtonClick}>{text}</button>;
};

const FeedBack = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onButtonClick={good} text={"good"} />
      <Button onButtonClick={neutral} text={"neutral"} />
      <Button onButtonClick={bad} text={"bad"} />
    </div>
  );
};

const Statistics = ({
  countGood,
  countNeutral,
  countBad,
  total,
  average,
  positivePercentage,
}) => {
  if (total !== 0) {
    return (
      <div>
        <StatisticsLine text="Good" value={countGood} />
        <StatisticsLine text="Neutral" value={countNeutral} />
        <StatisticsLine text="Bad" value={countBad} />
        <StatisticsLine text="All" value={total} />
        <StatisticsLine text="Average" value={average} />
        <StatisticsLine text="Positives" value={positivePercentage} />
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given yet</p>
      </div>
    );
  }
};

const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>{text}</th>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positivePercentage = (good / total) * 100;

  const voteGood = () => {
    console.log("Voted good");
    setGood(good + 1);
  };
  const voteNeutral = () => {
    console.log("Voted Neutral");
    setNeutral(neutral + 1);
  };
  const voteBad = () => {
    console.log("Voted Bad");
    setBad(bad + 1);
  };

  return (
    <div>
      <FeedBack good={voteGood} neutral={voteNeutral} bad={voteBad} />
      <Statistics
        countGood={good}
        countNeutral={neutral}
        countBad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
