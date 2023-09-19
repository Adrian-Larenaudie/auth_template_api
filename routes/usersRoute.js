const express = require("express");
const userController = require("../controllers/userController.js");
const createRateLimiter = require("../middlewares/limiter.js");

const router = express.Router();
const accessControlAdmin = require("../middlewares/accessControlAdmin.js");
const usersRouteLimiter = createRateLimiter(10, 5000);
router.use(usersRouteLimiter);

router.get('', accessControlAdmin, userController.getAll);
router.get('/:id', accessControlAdmin, userController.getById);
router.post('', accessControlAdmin, userController.create);
router.patch('/:id', accessControlAdmin, userController.update);
router.delete('/:id', accessControlAdmin, userController.delete);

module.exports = router;