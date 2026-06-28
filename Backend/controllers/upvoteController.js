const Issue = require("../models/Issue");

const getMyUpvotes = async (req, res) => {
  try {
    const issues = await Issue.find({
      upvotedBy: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: issues.length,
      issues,
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
  getMyUpvotes,
};
