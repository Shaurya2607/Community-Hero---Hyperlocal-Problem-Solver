const User = require("../models/user");
const Issue = require("../models/Issue");
const Comment = require("../models/Comment");

const getLeaderboard = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find().select("name email");

    const leaderboard = [];

    for (const user of users) {
      // Issues reported by this user
      const issues = await Issue.find({
        reportedBy: user._id,
      });

      // Comments made by this user
      const comments = await Comment.find({
        userName: user.name,
      });

      // Calculate points
      let points = 0;

      // 10 points for every reported issue
      points += issues.length * 10;

      // 3 points for every comment
      points += comments.length * 3;

      // Extra points from issues
      issues.forEach((issue) => {
        points += issue.upvotes || 0;
        points += (issue.verifiedCount || 0) * 5;

        if (issue.status === "Resolved") {
          points += 20;
        }
      });

      let badge = "Community Hero";

      if (points >= 200) {
        badge = "🥇 Gold Hero";
      } else if (points >= 100) {
        badge = "🥈 Silver Hero";
      } else if (points >= 50) {
        badge = "🥉 Bronze Hero";
      }

      leaderboard.push({
        id: user._id,
        name: user.name,
        email: user.email,
        points,
        issues: issues.length,
        comments: comments.length,
        badge,
      });
    }

    // Sort by highest points
    leaderboard.sort((a, b) => b.points - a.points);

    res.status(200).json({
      success: true,
      leaderboard,
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
  getLeaderboard,
};
