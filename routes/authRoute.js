const express = require("express");
const authController = require("../controllers/authController.js");
const createRateLimiter = require("../middlewares/limiter.js");

const router = express.Router();
const authRouteLimiter = createRateLimiter(process.env.USERS_ROUTES_RATE_LIMIT, process.env.RATE_LIMIT_WINDOWS_TIME);
router.use(authRouteLimiter);

router.post("/login", authController.login);
router.post("/refresh_token", authController.refreshLogin);
router.post("/logout", authController.logout);


module.exports = router;