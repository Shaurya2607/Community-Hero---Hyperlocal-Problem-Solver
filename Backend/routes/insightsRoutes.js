const express = require("express");

const { getAIInsights } = require("../controllers/insightsController");

const router = express.Router();

// Get AI City Insights
router.get("/", getAIInsights);

module.exports = router;
