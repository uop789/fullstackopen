import React from 'react';

const BlogForm = ({ addBlog, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...newTitle} />
        </div>
        <div>
          author:
          <input {...newAuthor} />
        </div>
        <div>
          url:
          <input
            {...newUrl}
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
