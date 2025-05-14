const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null;
  } else if (message === null && errorMessage !== null) {
    return <div className="error-message">{errorMessage}</div>;
  }

  return <div className="notification">{message}</div>;
};

export default Notification;
