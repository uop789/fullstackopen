const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = request.token;
  try {
    if (!token) {
      return response.status(401).json({ error: 'token missing' });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(request.params.id);
    const user = await User.findById(decodedToken.id);

    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: 'only the creator can delete blogs' });
    }
    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter(
      (b) => b.toString() !== request.params.id.toString()
    );
    await user.save();
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const body = request.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    }).populate('user', { username: 1, name: 1 }); //可以与前端数据(get方法里也有populate)一致;

    response.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const comment = request.body.comment;
    const blog = await Blog.findById(request.params.id);
    blog.comments = blog.comments.concat(comment);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
