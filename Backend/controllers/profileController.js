const User = require("../models/User");
const Issue = require("../models/Issue");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

const getProfile = async (req, res) => {
  try {
    // Logged-in user
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User's Issues
    const issues = await Issue.find({
      reportedBy: req.user.id,
    }).sort({ createdAt: -1 });

    // User's Comments
    const comments = await Comment.find({
      userName: user.name,
    });

    // User Notifications
    const notifications = await Notification.find({
      userId: req.user.id,
    });

    // Points Calculation
    let points = 0;

    // 10 points per issue
    points += issues.length * 10;

    // 3 points per comment
    points += comments.length * 3;

    // Extra Points
    issues.forEach((issue) => {
      points += issue.upvotes || 0;
      points += (issue.verifiedCount || 0) * 5;

      if (issue.status === "Resolved") {
        points += 20;
      }
    });

    // Badge
    let badge = "Community Hero";

    if (points >= 400) {
      badge = "👑 Legend Hero";
    } else if (points >= 200) {
      badge = "🥇 Gold Hero";
    } else if (points >= 100) {
      badge = "🥈 Silver Hero";
    } else if (points >= 50) {
      badge = "🥉 Bronze Hero";
    }

    res.status(200).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      stats: {
        points,
        badge,
        issues: issues.length,
        comments: comments.length,
        notifications: notifications.length,
      },

      recentIssues: issues.slice(0, 5),
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
  getProfile,
};
