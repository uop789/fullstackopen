import React, { useEffect } from 'react';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { logout, setUser } from './reducers/loginReducer';
import { clearNotification } from './reducers/notificationReducer';
import blogService from './services/blogs';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const blogFormRef = React.createRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [loggedUser, dispatch]);

  if (loggedUser === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Link style={{ padding: 5 }} to="/">
          home
        </Link>
        <Link style={{ padding: 5 }} to="/users">
          users
        </Link>
      </div>

      <div>
        <h2>blogs</h2>
        <div>
          {loggedUser.name} logged in
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser');
              dispatch(logout());
              dispatch(clearNotification());
            }}
          >
            logout
          </button>
          <Notification />
        </div>
      </div>
      <Switch>
        {/* <Route path="/users/:id">
        <Note notes={notes} />
      </Route> */}
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList loggedUser={loggedUser} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
