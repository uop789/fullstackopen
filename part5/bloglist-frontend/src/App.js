import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { useField } from './hooks';

function App() {
  const [blogs, setBlogs] = useState([]);
  const { reset: resetUsername, ...username } = useField('text'); //nice solution
  const { reset: resetPassword, ...password } = useField('password'); //nice solution
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successfulMessage, setSuccessfulMessage] = useState(null);
  const { reset: resetNewTitle, ...newTitle } = useField('text');
  const { reset: resetNewAuthor, ...newAuthor } = useField('text');
  const { reset: resetNewUrl, ...newUrl } = useField('url');

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes - b.likes);
      setBlogs(blogs);
    });
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []); //important

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      resetUsername();
      resetPassword();
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const addBlog = event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
    };

    blogService.create(blogObject).then(data => {
      setBlogs(blogs.concat(data));
      resetNewTitle();
      resetNewAuthor();
      resetNewUrl();
    });

    setSuccessfulMessage(
      `a new blog ${newTitle.value} by ${newAuthor.value} added`
    );
    setTimeout(() => {
      setSuccessfulMessage(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification errorMessage={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        successfulMessage={successfulMessage}
        errorMessage={errorMessage}
      />
      <div>
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            setUser(null);
          }}
        >
          logout
        </button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
        />
      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </div>
  );
}

export default App;
