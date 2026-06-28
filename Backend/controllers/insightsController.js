const Issue = require("../models/Issue");
const { generateCityInsights } = require("../services/geminiInsights");

// Get AI City Insights
const getAIInsights = async (req, res) => {
  try {
    // Fetch all issues from MongoDB
    const issues = await Issue.find().sort({ createdAt: -1 });

    // Generate AI Insights
    const insights = await generateCityInsights(issues);

    res.status(200).json({
      success: true,
      totalIssues: issues.length,
      insights,
    });
  } catch (error) {
    console.error("AI Insights Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI Insights",
      error: error.message,
    });
  }
};

module.exports = {
  getAIInsights,
};
