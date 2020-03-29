import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={e => store.dispatch({ type: 'OK' })}>neutral</button>
      <button onClick={e => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>
        reset stats
      </button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
