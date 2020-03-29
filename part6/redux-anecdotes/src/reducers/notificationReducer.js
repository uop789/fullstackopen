const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};

let timeoutID = null;

export const setNotification = (text, timeToDisplay) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      data: text
    });

    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: ''
      });
    }, timeToDisplay * 1000);
  };
};

export default notificationReducer;
