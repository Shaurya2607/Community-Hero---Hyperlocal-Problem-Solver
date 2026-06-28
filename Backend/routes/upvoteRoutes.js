const express = require("express");

const { getMyUpvotes } = require("../controllers/upvoteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getMyUpvotes);

module.exports = router;
