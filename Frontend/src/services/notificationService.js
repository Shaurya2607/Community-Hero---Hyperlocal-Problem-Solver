import api from "./api";

// Get notifications of a user
export const getNotifications = async (userId) => {
  const response = await api.get(`/notifications/${userId}`);
  return response.data.notifications;
};

// Mark notification as read
export const markAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}`);
  return response.data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
