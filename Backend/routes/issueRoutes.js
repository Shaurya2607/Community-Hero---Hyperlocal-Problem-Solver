const express = require("express");

const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  upvoteIssue,
  bookmarkIssue,
  verifyIssue,
  getDashboardAnalytics,
} = require("../controllers/issueController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/*
==========================================
Dashboard Analytics
==========================================
*/
router.get("/analytics", protect, getDashboardAnalytics);

/*
==========================================
Issue CRUD
==========================================
*/
router.route("/").post(protect, createIssue).get(getIssues);

/*
==========================================
Single Issue
==========================================
*/
router
  .route("/:id")
  .get(getIssueById)
  .put(protect, updateIssue)
  .delete(protect, deleteIssue);

/*
==========================================
Community Actions
==========================================
*/
router.put("/:id/upvote", protect, upvoteIssue);

router.put("/:id/bookmark", protect, bookmarkIssue);

router.put("/:id/verify", protect, verifyIssue);

module.exports = router;
