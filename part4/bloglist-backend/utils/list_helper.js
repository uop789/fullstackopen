var _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  let sum = 0;
  blogs.map(blog => {
    sum += blog.likes;
  });
  return sum;
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {};
  const reducer = (max, cur) => Math.max(max, cur);
  const result = blogs.map(blog => blog.likes).reduce(reducer, -Infinity);
  return blogs.find(blog => blog.likes === result);
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return {};
  const result = _.map(_.countBy(blogs, 'author'), (value, key) => ({
    key,
    value
  }));
  const max = _.maxBy(result, 'key');
  return {
    author: max.key,
    blogs: max.value
  };
};

const mostLikes = blogs => {
  if (blogs.length === 0) return {};
  const arrOfAuthor = _.groupBy(blogs, 'author');
  const likesOfEachAuthor = _.map(arrOfAuthor, (values, key) => {
    const likes = _.sumBy(values, 'likes');
    return { key, likes };
  });
  const result = _.maxBy(likesOfEachAuthor, 'likes');
  return {
    author: result.key,
    likes: result.likes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
