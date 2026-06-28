const Notification = require("../models/Notification");

// ===============================
// Get Notifications of a User
// ===============================
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Create Notification
// (Used inside other controllers)
// ===============================
const createNotification = async (
  userId,
  issueId,
  title,
  message,
  type = "general",
) => {
  try {
    await Notification.create({
      userId,
      issueId,
      title,
      message,
      type,
    });
  } catch (error) {
    console.log("Notification Error:", error.message);
  }
};

// ===============================
// Mark Notification as Read
// ===============================
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Notification
// ===============================
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
};
