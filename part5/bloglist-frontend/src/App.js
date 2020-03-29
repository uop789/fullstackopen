import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successfulMessage, setSuccessfulMessage] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs);
    });
  }, []); //这里不能加上[blogs],否则页面会一直请求/api/blogs，无限循环下去

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []); //important

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const addBlog = async blog => {
    try {
      const newBlog = await blogService.create(blog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      setSuccessfulMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added!`
      );
      setTimeout(() => {
        setSuccessfulMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
    }
  };

  const increaseLikes = async id => {
    const blogToLike = blogs.find(b => b.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id
    };

    await blogService.update(likedBlog);
    setBlogs(
      blogs.map(blog =>
        blog.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : blog
      )
    );
    //because we add [blogs] into useEffect, so we dont setBlogs again, same applies to create and delete----this is wrong, reason given on top.
  };

  const deleteBlog = async id => {
    const blogToRemove = blogs.find(b => b.id === id);
    if (
      window.confirm(
        `remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (exception) {
        setErrorMessage('Delete blog failed');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification errorMessage={errorMessage} />
        <LoginForm login={login} />
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
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            increaseLikes={increaseLikes}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
}

export default App;
