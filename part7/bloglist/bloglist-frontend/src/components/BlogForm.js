import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form, Button } from 'react-bootstrap';

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    dispatch(
      createBlog({
        title,
        author,
        url,
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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
          />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
