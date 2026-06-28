import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../services/notificationService";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Replace this later with logged-in user's ID
  const userId = localStorage.getItem("userId");
  

  useEffect(() => {
    if (userId) {
      fetchNotifications();

      const interval = setInterval(() => {
        fetchNotifications();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications(userId);
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="position-relative">
      <button
        className="btn btn-outline-dark position-relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          className="card shadow position-absolute mt-2"
          style={{
            width: "350px",
            right: 0,
            zIndex: 1000,
          }}
        >
          <div className="card-body">
            <h5 className="mb-3">Notifications</h5>

            {notifications.length === 0 ? (
              <p className="text-muted">No Notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  className={`border-bottom pb-2 mb-2 p-2 rounded ${
                    notification.isRead ? "" : "bg-light"
                  }`}
                >
                  <h6>{notification.title}</h6>

                  <p className="mb-1">{notification.message}</p>

                  <small className="text-muted">
                    {new Date(notification.createdAt).toLocaleString()}
                  </small>

                  <div className="mt-2">
                    {!notification.isRead && (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleRead(notification._id)}
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(notification._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
