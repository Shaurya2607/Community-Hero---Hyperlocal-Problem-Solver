const Issue = require("../models/Issue");

const { detectDuplicateIssue } = require("../services/duplicateDetector");

// Check for Duplicate Issue
const checkDuplicateIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, description and location are required.",
      });
    }

    // Fetch all existing issues
    const issues = await Issue.find();

    // Ask Gemini to detect duplicates
    const result = await detectDuplicateIssue(
      {
        title,
        description,
        location,
      },
      issues,
    );

    res.status(200).json({
      success: true,
      duplicate: result.duplicate,
      confidence: result.confidence,
      reason: result.reason,
      matchingIssue: result.matchingIssue,
    });
  } catch (error) {
    console.log("Duplicate Controller Error");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  checkDuplicateIssue,
};
