import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useHistory } from 'react-router-dom';
import {
  Card,
  ListGroup,
  Button,
  InputGroup,
  FormControl,
  Modal,
} from 'react-bootstrap';

const Blog = ({ blog, loggedUser }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const blogs = useSelector((state) => state.blogs);

  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleLike = (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    dispatch(likeBlog(blogToLike));
    dispatch(setNotification(`you voted '${blogToLike.title}'`, 5));
  };

  const handleRemove = (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    try {
      dispatch(deleteBlog(blogToRemove));
      dispatch(setNotification(`you removed '${blogToRemove.title}'`, 5));
      history.push('/');
    } catch (exception) {
      dispatch(setNotification('Delete blog failed', 5, 'error'));
    }
  };

  const handleComment = (id) => {
    const blogToComment = blogs.find((b) => b.id === id);
    dispatch(commentBlog(comment, blogToComment));
    dispatch(setNotification(`you commented '${blogToComment.title}'`, 5));
    setComment('');
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <Card className="text-center blog">
        <Card.Header>Details</Card.Header>
        <Card.Body>
          <Card.Title>
            {blog.title} by {blog.author}
          </Card.Title>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
          <div>
            {blog.likes} likes{' '}
            <Button size="sm" onClick={() => handleLike(blog.id)}>
              like
            </Button>
          </div>
          <Card.Text>added by {blog.user.name}</Card.Text>
          {loggedUser.username === blog.user.username ? (
            <>
              <Button variant="primary" size="sm" onClick={handleShow}>
                remove
              </Button>

              <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  remove blog {blog.title} by {blog.author}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleRemove(blog.id)}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : null}
        </Card.Body>
      </Card>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>comments</Card.Title>
          <InputGroup>
            <FormControl
              as="textarea"
              rows="3"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={() => handleComment(blog.id)}
              >
                add comment
              </Button>
            </InputGroup.Append>
          </InputGroup>

          <ListGroup className="list-group-flush">
            {blog.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Blog;
