import React, { useState } from 'react';
import blogService from '../services/blogs';
const Blog = ({ blog, blogs, user, setBlogs, setErrorMessage }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [displayMore, setDispayMore] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleOnClick = () => {
    setDispayMore(!displayMore);
  };

  const increaseLikes = event => {
    event.stopPropagation();
    const blogObject = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };

    blogService.update(blog.id, blogObject).then(data => {
      setLikes(data.likes);

      const newBlogs = blogs.map(blog =>
        blog.id === data.id ? { ...blog, likes: data.likes } : blog
      );

      setBlogs(newBlogs);
    });
  };

  const deleteBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
      } catch (exception) {
        setErrorMessage('Delete blog failed');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  if (displayMore) {
    return (
      <div style={blogStyle} className="moreInfo">
        <div onClick={handleOnClick}>
          <p>
            {blog.title} {blog.author}
          </p>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {likes} likes <button onClick={increaseLikes}>like</button>
          </div>
          <p>added by {blog.user.name}</p>
          {user.name === blog.user.name ? (
            <button onClick={deleteBlog}>remove</button>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle} className="defaultInfo">
        <div onClick={handleOnClick}>
          {blog.title} {blog.author}
        </div>
      </div>
    );
  }
};

export default Blog;
