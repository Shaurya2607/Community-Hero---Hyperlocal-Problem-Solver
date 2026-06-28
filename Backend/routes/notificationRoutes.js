const express = require("express");

const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const router = express.Router();

// Get notifications of a user
router.get("/:userId", getNotifications);

// Mark notification as read
router.put("/:id", markAsRead);

// Delete notification
router.delete("/:id", deleteNotification);

module.exports = router;
