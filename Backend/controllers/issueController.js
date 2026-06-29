const Issue = require("../models/Issue");
const { analyzeIssue } = require("../services/geminiService");
const { createNotification } = require("./notificationController");

// Create Issue
const createIssue = async (req, res) => {
  try {
    const { title, description, location, latitude, longitude } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }

    // AI Analysis
    let aiData = {};

    try {
      const aiAnalysis = await analyzeIssue(title, description);

      if (aiAnalysis) {
        aiData = JSON.parse(aiAnalysis.replace(/```json|```/g, "").trim());
      }
    } catch (err) {
      console.log("Gemini AI Error:", err.message);
    }

    const issue = await Issue.create({
      title,
      description,
      location,

      coordinates: {
        latitude,
        longitude,
      },

      category: aiData.category || "General",
      priority: aiData.priority || "Medium",
      department: aiData.department || "Municipality",
      aiSummary: aiData.summary || "",
      aiSolution: aiData.solution || "",

      status: "Pending",

      reportedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Issue Created Successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Issues
// Get All Issues with Search & Filters
const getIssues = async (req, res) => {
  try {
    const { search, category, priority, status } = req.query;

    const filter = {};

    // Search by title or description
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category Filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // Priority Filter
    if (priority && priority !== "All") {
      filter.priority = priority;
    }

    // Status Filter
    if (status && status !== "All") {
      filter.status = status;
    }

    const issues = await Issue.find(filter).sort({
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

// Get Single Issue
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Issue
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    issue.title = req.body.title || issue.title;
    issue.description = req.body.description || issue.description;
    issue.location = req.body.location || issue.location;
    issue.category = req.body.category || issue.category;
    issue.priority = req.body.priority || issue.priority;
    issue.status = req.body.status || issue.status;

    const updatedIssue = await issue.save();
    if (updatedIssue.status === "Resolved" && updatedIssue.reportedBy) {
      await createNotification(
        updatedIssue.reportedBy,
        updatedIssue._id,
        "🎉 Issue Resolved",
        "Your reported issue has been marked as resolved.",
        "resolved",
      );
    }

    res.status(200).json({
      success: true,
      message: "Issue Updated Successfully",
      issue: updatedIssue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Issue
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    await issue.deleteOne();

    res.status(200).json({
      success: true,
      message: "Issue Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Upvote Issue
const upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    // Prevent duplicate upvotes
    if (issue.upvotedBy.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "You have already upvoted this issue.",
      });
    }

    issue.upvotes += 1;
    issue.upvotedBy.push(req.user.id);

    await issue.save();

    res.status(200).json({
      success: true,
      message: "Issue upvoted successfully",
      issue,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const bookmarkIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { bookmarks: 1 },
      },
      {
        new: true,
        runValidators: false,
      },
    );

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue bookmarked successfully",
      issue,
    });
  } catch (error) {
    console.error("Bookmark Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const verifyIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { verifiedCount: 1 },
      },
      {
        new: true,
        runValidators: false,
      },
    );

    if (issue.reportedBy) {
      await createNotification(
        issue.reportedBy,
        issue._id,
        "✔ Issue Verified",
        "Your issue has been verified by the community.",
        "verification",
      );
    }

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue verified successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Analytics
const getDashboardAnalytics = async (req, res) => {
  try {
    // Fetch all issues and users
    const issues = await Issue.find().sort({ createdAt: -1 });
    const users = await user.find();

    // Statistics
    const totalIssues = issues.length;

    const pending = issues.filter((issue) => issue.status === "Pending").length;

    const resolved = issues.filter(
      (issue) => issue.status === "Resolved",
    ).length;

    const inProgress = issues.filter(
      (issue) => issue.status === "In Progress",
    ).length;

    const totalUsers = users.length;

    const totalUpvotes = issues.reduce(
      (sum, issue) => sum + (issue.upvotes || 0),
      0,
    );

    // Category Counts
    const categoryCounts = {};

    issues.forEach((issue) => {
      const category = issue.category || "Other";

      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Weekly Trend (Last 7 Days)
    const weeklyTrend = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date();

      day.setDate(day.getDate() - i);

      const dayName = day.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const count = issues.filter((issue) => {
        const issueDate = new Date(issue.createdAt);

        return issueDate.toDateString() === day.toDateString();
      }).length;

      weeklyTrend.push({
        day: dayName,
        count,
      });
    }

    // Recent Issues
    const recentIssues = issues.slice(0, 5);

    res.status(200).json({
      success: true,

      totalIssues,

      pending,

      resolved,

      inProgress,

      totalUsers,

      totalUpvotes,

      categoryCounts,

      weeklyTrend,

      recentIssues,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  upvoteIssue,
  bookmarkIssue,
  verifyIssue,
  getDashboardAnalytics,
};
