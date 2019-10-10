import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const MostVotes = ({ points }) => {
  let mostVotes = 0;
  let mostVotesIndex = 0;

  for (let i = 0; i < points.length; i++) {
    if (points[i] > mostVotes) {
      mostVotes = points[i];
      mostVotesIndex = i;
    }
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  );
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    new Array(props.anecdotes.length).fill(0)
  );
  //   points.length = props.anecdotes.length;
  //   points.fill(0);

  const handleNext = () => {
    const next = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(next);
  };

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    //console.log(copy);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <MostVotes points={points} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
