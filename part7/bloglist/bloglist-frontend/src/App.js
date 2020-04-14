import React, { useEffect } from 'react';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRouteMatch,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { logout, setUser } from './reducers/loginReducer';
import { clearNotification } from './reducers/notificationReducer';
import blogService from './services/blogs';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

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

  const history = useHistory();
  const matchUserId = useRouteMatch('/users/:id');
  const matchBlogId = useRouteMatch('/blogs/:id');
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const user = matchUserId
    ? users.find(
        (user) => user.id.toString() === matchUserId.params.id.toString()
      )
    : null;

  const blog = matchBlogId
    ? blogs.find(
        (blog) => blog.id.toString() === matchBlogId.params.id.toString()
      )
    : null;

  if (loggedUser === null) {
    return (
      <Container>
        <div className="row justify-content-center align-items-center">
          <h2>log in to application</h2>
        </div>
        <div className="row justify-content-center align-items-center">
          <Notification />
        </div>
        <hr />

        <div className="row justify-content-center align-items-center">
          <LoginForm />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-auto">
            <Nav.Link eventKey="1" as="span">
              <Link style={{ padding: 5 }} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link eventKey="2" as="span">
              <Link style={{ padding: 5 }} to="/users">
                users
              </Link>
            </Nav.Link>
          </Nav>
          <div>
            {loggedUser.name} logged in{' '}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser');
                dispatch(logout());
                dispatch(clearNotification());
                history.push('/');
              }}
            >
              logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blog} loggedUser={loggedUser} />
        </Route>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <UserList users={users} />
        </Route>
        <Route path="/">
          <h2>blogs</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
