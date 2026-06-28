const express = require("express");

const { getAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

// Get Dashboard Analytics
router.get("/", getAnalytics);

module.exports = router;
