import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form, Button } from 'react-bootstrap';

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
    <>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            style={{ width: 150, height: 30 }}
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            style={{ width: 150, height: 30, marginBottom: 5 }}
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button variant="primary" id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default LoginForm;
