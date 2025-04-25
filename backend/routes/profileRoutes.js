const express = require("express");
const router = express.Router();
const {getProfile} = require("../controllers/profileController");
const {verifyAccessToken} = require("../middlewares/index");


//*// Routes Setup :: /api/profile
router.get("/", verifyAccessToken, getProfile);

module.exports = router;