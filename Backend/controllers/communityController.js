const Issue = require("../models/Issue");
const user = require("../models/user");
const Comment = require("../models/Comment");

const getCommunityImpact = async (req, res) => {
  try {
    // Total Issues
    const totalIssues = await Issue.countDocuments();

    // Total Resolved Issues
    const resolvedIssues = await Issue.countDocuments({
      status: "Resolved",
    });

    let aiSuccessRate = 0;

    if (totalIssues > 0) {
      aiSuccessRate = Math.round((resolvedIssues / totalIssues) * 100);
    }

    // Registered Users
    const totalUsers = await user.countDocuments();

    // Users who reported issues
    const issueOwners = await Issue.distinct("reportedBy");

    // Users who commented
    const comments = await Comment.find().select("userName");

    const commentUsers = [...new Set(comments.map((c) => c.userName))];

    // Active citizens
    const activeCitizens = Math.max(
      issueOwners.filter((id) => id).length,
      commentUsers.length,
    );

    res.status(200).json({
      success: true,
      totalIssues,
      resolvedIssues,
      totalUsers,
      activeCitizens,
      aiSuccessRate,
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
  getCommunityImpact,
};
