import React from 'react';

const Notification = ({ message, successfulMessgae, errorMessage }) => {
  if (message === null) {
    return null;
  } else if (message === successfulMessgae) {
    return <div className="successful">{message}</div>;
  } else if (message === errorMessage) {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
