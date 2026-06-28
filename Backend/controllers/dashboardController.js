const Issue = require("../models/Issue");
const User = require("../models/User");
const Comment = require("../models/Comment");

const getDashboard = async (req, res) => {
  try {
    // =========================
    // Basic Statistics
    // =========================

    const totalIssues = await Issue.countDocuments();

    const resolvedIssues = await Issue.countDocuments({
      status: "Resolved",
    });

    const pendingIssues = await Issue.countDocuments({
      status: "Pending",
    });

    const inProgressIssues = await Issue.countDocuments({
      status: "In Progress",
    });

    const highPriorityIssues = await Issue.countDocuments({
      priority: "High",
    });

    const totalUsers = await User.countDocuments();

    // =========================
    // Active Citizens
    // =========================

    const issueOwners = await Issue.distinct("reportedBy");

    const commentUsers = await Comment.distinct("userName");

    const activeCitizens = Math.max(
      issueOwners.filter(Boolean).length,
      commentUsers.length,
      totalUsers,
    );

    // =========================
    // Comments
    // =========================

    const comments = await Comment.countDocuments();

    // =========================
    // Total Upvotes
    // =========================

    const upvoteResult = await Issue.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$upvotes",
          },
        },
      },
    ]);

    const upvotes = upvoteResult.length > 0 ? upvoteResult[0].total : 0;

    // =========================
    // AI Generated Issues
    // =========================

    const aiGenerated = await Issue.countDocuments({
      aiSummary: {
        $ne: "",
      },
    });

    const aiSuccessRate =
      totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

    // =========================
    // Hotspot Area
    // =========================

    const hotspotResult = await Issue.aggregate([
      {
        $group: {
          _id: "$location",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const hotspot = hotspotResult.length > 0 ? hotspotResult[0]._id : "N/A";

    // =========================
    // Charts
    // =========================

    const statusData = await Issue.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const priorityData = await Issue.aggregate([
      {
        $group: {
          _id: "$priority",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const categoryData = await Issue.aggregate([
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // =========================
    // Response
    // =========================

    res.status(200).json({
      success: true,

      stats: {
        totalIssues,
        resolvedIssues,
        pendingIssues,
        inProgressIssues,
        highPriorityIssues,
        activeCitizens,
        upvotes,
      },

      impact: {
        issuesReported: totalIssues,
        issuesResolved: resolvedIssues,
        citizensEngaged: activeCitizens,
        aiSuccessRate,
        hotspot,
      },

      ai: {
        aiGenerated,
        highPriorityIssues,
        successRate: aiSuccessRate,
        hotspot,
      },

      comments,

      charts: {
        statusData,
        priorityData,
        categoryData,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
