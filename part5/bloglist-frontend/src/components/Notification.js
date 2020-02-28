import React from 'react';

const Notification = props => {
  if (props.successfulMessage) {
    return <div className="success">{props.successfulMessage}</div>;
  } else if (props.errorMessage) {
    return <div className="error">{props.errorMessage}</div>;
  }
  return null;
};

export default Notification;
