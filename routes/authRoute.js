const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh_token", authController.refreshLogin);

module.exports = router;