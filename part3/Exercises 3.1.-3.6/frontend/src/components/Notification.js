import React, { useState, useEffect } from 'react';
import './Notification.css'; // Import CSS for styling

const Notification = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000); // Hide notification after 3 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`notification ${type} ${visible ? 'show' : 'hide'}`}>
      {message}
    </div>
  );
};

export default Notification;
