import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [displayMore, setDispayMore] = useState(false);

  const label = displayMore ? 'hide' : 'view';

  const handleLike = (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    dispatch(likeBlog(blogToLike));
    dispatch(setNotification(`you voted '${blogToLike.title}'`, 5));
  };

  const handleRemove = (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    if (
      window.confirm(
        `remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      try {
        dispatch(deleteBlog(blogToRemove));
        dispatch(setNotification(`you removed '${blogToRemove.title}'`, 5));
      } catch (exception) {
        dispatch(setNotification('Delete blog failed', 5, 'error'));
      }
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} by {blog.author}{' '}
        <button onClick={() => setDispayMore(!displayMore)}>{label}</button>
      </div>
      {displayMore && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {blog.likes} likes{' '}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <p>added by {blog.user.name}</p>
          {loggedUser.username === blog.user.username ? (
            <button onClick={() => handleRemove(blog.id)}>remove</button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Blog;
