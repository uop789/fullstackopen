import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const BlogList = ({ blogs }) => {
  return (
    <ListGroup>
      {blogs.map((blog) => (
        <ListGroup.Item action variant="light" key={blog.id}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default BlogList;
