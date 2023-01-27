import { useSelector } from "react-redux";

interface Notification {
  type: string;
  message: string;
  activeNotification: boolean;
}

const Notification = () => {
  const notification: Notification = useSelector(({ notification }) => {
    console.log("Notification: ", notification);
    return notification;
  });

  if (!notification.activeNotification) return;

  return (
    <div
      className={
        notification.type === "error"
          ? "alert alert-danger"
          : "alert alert-success"
      }
      role="alert"
    >
      {notification.message}
    </div>
  );
};

export default Notification;
