import blogService from '../services/blogs';
import userService from '../services/users';

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
    case 'COMMENT': {
      const commented = action.data;
      return state
        .map((b) => (b.id === commented.id ? commented : b))
        .sort(byLikes);
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
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export const likeBlog = (likedblog) => {
  return async (dispatch) => {
    const toLike = {
      ...likedblog,
      likes: likedblog.likes + 1,
    };
    const updatedblog = await blogService.addLike(toLike);
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
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export const commentBlog = (comment, blogToComment) => {
  return async (dispatch) => {
    await blogService.addComment(comment, blogToComment);
    const updatedblog = {
      ...blogToComment,
      comments: blogToComment.comments.concat(comment),
    };
    dispatch({
      type: 'COMMENT',
      data: updatedblog,
    });
  };
};

export default blogReducer;
