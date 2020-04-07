import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    try {
      await dispatch(login({ username, password }));
    } catch (exception) {
      dispatch(setNotification('wrong username/password', 5, 'error'));
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
