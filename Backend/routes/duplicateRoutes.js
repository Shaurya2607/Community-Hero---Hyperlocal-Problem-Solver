const express = require("express");

const { checkDuplicateIssue } = require("../controllers/duplicateController");

const router = express.Router();

// Check if a similar issue already exists
router.post("/", checkDuplicateIssue);

module.exports = router;
