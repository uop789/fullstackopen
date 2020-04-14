import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <Card>
      <Card.Header>{user.name}</Card.Header>
      <Card.Body>
        <Card.Title>added blogs</Card.Title>
        <ListGroup>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default User;
