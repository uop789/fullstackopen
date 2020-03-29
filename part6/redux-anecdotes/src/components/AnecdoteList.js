import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
//import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = props => {
  //const dispatch = useDispatch();
  //const anecdotes = useSelector(state => visibleAnecdotes(state));

  const handleVote = id => {
    const likedAnecdote = props.anecdotesToShow.find(
      anecdote => anecdote.id === id
    );
    //dispatch(vote(likedAnecdote));
    //dispatch(setNotification(`You voted '${likedAnecdote.content}'`, 5));
    props.vote(likedAnecdote);
    props.setNotification(`You voted '${likedAnecdote.content}'`, 5);
  };

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const visibleAnecdotes = ({ anecdotes, filter }) => {
  const anecdotesToShow = anecdotes.filter(
    anecdote => anecdote.content.indexOf(filter) !== -1
  );
  anecdotesToShow.sort((a, b) => a.votes - b.votes);
  return anecdotesToShow;
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: visibleAnecdotes(state)
  };
};

const mapDispatchToProps = {
  vote,
  setNotification
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
//export default AnecdoteList;
