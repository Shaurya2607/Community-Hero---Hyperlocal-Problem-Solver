const express = require("express");

const {
  getAIInsights,
  analyzeIssueController,
} = require("../controllers/aiController");

const router = express.Router();

router.get("/insights", getAIInsights);

router.post("/analyze", analyzeIssueController);

module.exports = router;
