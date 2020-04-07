import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setNotification(`${user.name} welcome back!`, 5));
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch({ type: 'SET_USER', data: null });
  };
};

export default loginReducer;
