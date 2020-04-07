import blogService from '../services/blogs';

const byLikes = (b1, b2) => b2.likes - b1.likes;

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort(byLikes);
    case 'CREATE':
      return [...state, action.data];
    case 'LIKE': {
      const liked = action.data;
      return state.map((b) => (b.id === liked.id ? liked : b)).sort(byLikes);
    }
    case 'DELETE': {
      const id = action.data;
      return state.filter((b) => b.id !== id).sort(byLikes);
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    dispatch({
      type: 'CREATE',
      data: blog,
    });
  };
};

export const likeBlog = (likedblog) => {
  return async (dispatch) => {
    const toLike = {
      ...likedblog,
      likes: likedblog.likes + 1,
      user: likedblog.user.id,
    };
    await blogService.update(toLike);
    const updatedblog = { ...likedblog, likes: likedblog.likes + 1 };
    dispatch({
      type: 'LIKE',
      data: updatedblog,
    });
  };
};

export const deleteBlog = (deletedblog) => {
  return async (dispatch) => {
    await blogService.remove(deletedblog.id);
    dispatch({
      type: 'DELETE',
      data: deletedblog.id,
    });
  };
};

export default blogReducer;
