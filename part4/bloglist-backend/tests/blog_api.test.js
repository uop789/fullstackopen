const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // let blogObject = new Blog(helper.initialBlogs[0]);
  // await blogObject.save();

  // blogObject = new Blog(helper.initialBlogs[1]);
  // await blogObject.save();
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('when some blogs are saved', () => {
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

  test("a blog's likes can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const blog = blogsAtEnd.find(r => r.url === blogToUpdate.url);
    const likes = blog.likes;
    expect(likes).toBe(blogToUpdate.likes + 1);
  });
});
describe('when a blog is posted to api', () => {
  let headers;

  beforeEach(async () => {
    const newUser = {
      username: 'tammy',
      name: 'Tammy Ma',
      password: 'password'
    };

    await api.post('/api/users').send(newUser);
    const result = await api.post('/api/login').send(newUser);

    headers = { Authorization: `bearer ${result.body.token}` };
  });
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'NEW-async/await simplifies making async calls',
      author: 'Isaac He',
      url: 'www.google.com',
      likes: 9
    };

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(r => r.title);

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
    expect(titles).toContain('NEW-async/await simplifies making async calls');
  });

  test('blog without title or url is not added', async () => {
    const newBlog = {
      author: 'Isaac He',
      likes: 8
    };

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
  });

  test('likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'testing missing likes property',
      author: 'Isaac He',
      url: 'www.google.com'
    };

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blog = blogsAtEnd.filter(
      r => r.title === 'testing missing likes property'
    );
    const likes = blog[0].likes;
    expect(likes).toBe(0);
  });

  test('operation fails with proper error if token is missing', async () => {
    const newBlog = {
      title: 'lollollollol',
      author: 'Isaac He',
      url: 'www.google.com',
      likes: 2
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
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

  describe('and it is saved to database', () => {
    let result;
    beforeEach(async () => {
      const newBlog = {
        title: 'Great developer experience',
        author: 'Hector Ramos',
        url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
        likes: 7
      };

      result = await api
        .post('/api/blogs')
        .set(headers)
        .send(newBlog);
    });

    test('it can be deleted', async () => {
      const blogToDelete = result.body;

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(headers)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);

      const titles = blogsAtEnd.map(b => b.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
