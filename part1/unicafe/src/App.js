import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = total === 0 ? 0 : (good - bad) / total;
	const positive = total === 0 ? 0 : `${(good / total) * 100}%`;

	if (total === 0) {
		return (
			<>
				<h2>statistics</h2>
				<p>No feedback given</p>
			</>
		);
	}

	return (
		<>
			<h2>statistics</h2>
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={total} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positive} />
				</tbody>
			</table>
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const setToValue = (type, newValue) => {
		switch (type) {
			case 'good':
				setGood(newValue);
				break;
			case 'neutral':
				setNeutral(newValue);
				break;
			case 'bad':
				setBad(newValue);
				break;
			default:
				break;
		}
	};

	return (
		<div>
			<h2>give feedback</h2>
			<Button handleClick={() => setToValue('good', good + 1)} text="good" />
			<Button
				handleClick={() => setToValue('neutral', neutral + 1)}
				text="neutral"
			/>
			<Button handleClick={() => setToValue('bad', bad + 1)} text="bad" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
