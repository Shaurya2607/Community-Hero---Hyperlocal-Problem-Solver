const express = require("express");

const { getMyIssues } = require("../controllers/myIssueController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's issues
router.get("/", protect, getMyIssues);

module.exports = router;
