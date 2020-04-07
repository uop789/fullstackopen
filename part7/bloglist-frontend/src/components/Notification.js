import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const style = {
    border: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    borderWidth: 1,
    background: 'lightgrey',
    marginTop: 10,
    marginBottom: 10,
  };
  return <div style={style}>{notification.content}</div>;
};

export default Notification;
