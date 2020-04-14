const notificationreducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeoutId;

export const setNotification = (content, time, type = 'success') => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, type }
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      });
    }, time * 1000);
  };
};

export const clearNotification = () => {
  return async dispatch => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };
};

export default notificationreducer;
