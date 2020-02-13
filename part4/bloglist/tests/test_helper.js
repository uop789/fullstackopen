const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'ABCDEF',
    author: 'Tammy Ma',
    url: 'www.google.com',
    likes: 5
  },
  {
    title: 'HHHHHHH',
    author: 'Zach Zhe',
    url: 'www.google.com',
    likes: 2
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'www.google.com' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
};
