const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  const ids = response.body.map(r => r.id);
  for (let id of ids) {
    expect(id).toBeDefined();
  }
});

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Isaac He',
    url: 'www.google.com',
    likes: 8
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Isaac He',
    url: 'www.google.com',
    likes: 1
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map(r => r.title);

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
  expect(titles).toContain('async/await simplifies making async calls');
});

test('likes property is missing, it will default to the value 0', async () => {
  const newBlog = {
    title: 'testing missing likes property',
    author: 'Isaac He',
    url: 'www.google.com'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const blog = blogsAtEnd.filter(
    r => r.title === 'testing missing likes property'
  );
  const likes = blog[0].likes;
  expect(likes).toBe(0);
});

test('a specific blog can be viewd', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map(b => b.title);

  expect(titles).not.toContain(blogToDelete.title);
});

test("a blog's likes can be updated", async () => {
  const newLikes = {
    likes: 9
  };

  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newLikes)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const blog = blogsAtEnd.filter(r => r.title === 'ABCDEF');
  const likes = blog[0].likes;
  expect(likes).toBe(9);
});

afterAll(() => {
  mongoose.connection.close();
});
