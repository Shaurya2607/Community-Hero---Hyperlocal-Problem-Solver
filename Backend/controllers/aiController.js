const Issue = require("../models/Issue");
const { generateCityInsights } = require("../services/geminiService");

// Get AI Insights
const getAIInsights = async (req, res) => {
  try {
    const issues = await Issue.find();

    if (issues.length === 0) {
      return res.json({
        success: true,
        totalIssues: 0,
        hotspot: "No Issues",
        department: "N/A",
        summary: "No issues have been reported yet.",
        recommendation: "Community is doing great!",
      });
    }

    const aiResult = await generateCityInsights(issues);

    res.status(200).json({
      success: true,
      totalIssues: issues.length,
      hotspot: aiResult.hotspot,
      department: aiResult.department,
      summary: aiResult.summary,
      recommendation: aiResult.recommendation,
    });
  } catch (err) {
    console.error("AI Insights Error:", err);

    res.status(200).json({
      success: false,
      totalIssues: 0,
      hotspot: "Unknown",
      department: "Unknown",
      summary: "AI Insights unavailable.",
      recommendation: "Try again later.",
    });
  }
};

// Analyze a single issue while reporting
const analyzeIssueController = async (req, res) => {
  try {
    const { description } = req.body;

    const text = description.toLowerCase();

    let category = "General";
    let severity = "Medium";

    if (
      text.includes("garbage") ||
      text.includes("trash") ||
      text.includes("waste")
    ) {
      category = "Garbage";
    }

    if (text.includes("road") || text.includes("pothole")) {
      category = "Road";
    }

    if (
      text.includes("water") ||
      text.includes("leak") ||
      text.includes("pipe")
    ) {
      category = "Water";
    }

    if (text.includes("electric") || text.includes("street light")) {
      category = "Electricity";
    }

    if (text.includes("fire") || text.includes("accident")) {
      severity = "High";
    }

    res.json({
      success: true,
      category,
      severity,
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
  getAIInsights,
  analyzeIssueController,
};
