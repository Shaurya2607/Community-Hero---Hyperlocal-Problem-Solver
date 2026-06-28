const Comment = require("../models/Comment");
const Issue = require("../models/Issue");
const { createNotification } = require("./notificationController");

// Add Comment
// Add Comment
const addComment = async (req, res) => {
  try {
    const { issueId, userName, message } = req.body;

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    const comment = await Comment.create({
      issue: issueId,
      userName: userName || "Anonymous",
      message,
    });

    issue.commentsCount += 1;
    await issue.save();

    // Notify issue owner
    if (issue.reportedBy) {
      await createNotification(
        issue.reportedBy,
        issue._id,
        "💬 New Comment",
        `${userName} commented on your issue.`,
        "comment",
      );
    }

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Comments of an Issue
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      issue: req.params.issueId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addComment,
  getComments,
};
