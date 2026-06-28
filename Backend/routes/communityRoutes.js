const express = require("express");

const { getCommunityImpact } = require("../controllers/communityController");

const router = express.Router();

router.get("/", getCommunityImpact);

module.exports = router;
