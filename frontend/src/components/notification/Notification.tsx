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

  const errorStyle = {
    border: "solid red",
    padding: 10,
    borderWidth: 1,
    color: "red",
  };

  const successStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={notification.type === "error" ? errorStyle : successStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
