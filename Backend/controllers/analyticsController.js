const Issue = require("../models/Issue");

const getAnalytics = async (req, res) => {
  try {
    const issues = await Issue.find().lean();

    // Overall Counts
    const total = issues.length;

    const pending = issues.filter((issue) => issue.status === "Pending").length;

    const inProgress = issues.filter(
      (issue) => issue.status === "In Progress",
    ).length;

    const resolved = issues.filter(
      (issue) => issue.status === "Resolved",
    ).length;

    const highPriority = issues.filter(
      (issue) => issue.priority === "High",
    ).length;

    const mediumPriority = issues.filter(
      (issue) => issue.priority === "Medium",
    ).length;

    const lowPriority = issues.filter(
      (issue) => issue.priority === "Low",
    ).length;

    // Category Distribution
    const categories = {};

    issues.forEach((issue) => {
      const category = issue.category || "General";

      categories[category] = (categories[category] || 0) + 1;
    });

    // Status Distribution
    const status = {};

    issues.forEach((issue) => {
      status[issue.status] = (status[issue.status] || 0) + 1;
    });

    // Priority Distribution
    const priority = {};

    issues.forEach((issue) => {
      priority[issue.priority] = (priority[issue.priority] || 0) + 1;
    });

    // Monthly Reports
    const monthlyReports = {};

    issues.forEach((issue) => {
      const month = new Date(issue.createdAt).toLocaleString("default", {
        month: "short",
      });

      monthlyReports[month] = (monthlyReports[month] || 0) + 1;
    });

    res.status(200).json({
      success: true,

      total,

      pending,

      inProgress,

      resolved,

      highPriority,

      mediumPriority,

      lowPriority,

      categories,

      status,

      priority,

      monthlyReports,
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
  getAnalytics,
};
