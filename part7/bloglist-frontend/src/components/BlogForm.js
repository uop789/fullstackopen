import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const addBlog = event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    dispatch(
      createBlog({
        title,
        author,
        url
      })
    );
    dispatch(setNotification(`a new blog ${title} by ${author} added!`, 5));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
