import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, increaseLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [displayMore, setDispayMore] = useState(false);

  if (displayMore) {
    return (
      <div style={blogStyle} className="moreInfo, blog">
        <div>
          <p>
            {blog.title} by {blog.author}{' '}
            <button onClick={() => setDispayMore(!displayMore)}>hide</button>
          </p>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {blog.likes} likes{' '}
            <button onClick={() => increaseLikes(blog.id)}>like</button>
          </div>
          <p>added by {blog.user.name}</p>
          {user.username === blog.user.username ? (
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle} className="defaultInfo, blog">
        <div>
          {blog.title} by {blog.author}{' '}
          <button onClick={() => setDispayMore(!displayMore)}>view</button>
        </div>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  increaseLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

export default Blog;
