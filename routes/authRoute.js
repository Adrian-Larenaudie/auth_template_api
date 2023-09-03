const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();

router.post("", authController.login);
router.get("", authController.refreshLogin);

module.exports = router;