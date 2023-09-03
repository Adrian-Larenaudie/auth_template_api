const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();
const accessControlAdmin = require("../middlewares/accessControlAdmin.js");

router.get('', accessControlAdmin, userController.getAll);
router.get('/:id', accessControlAdmin, userController.getById);
router.post('', accessControlAdmin, userController.create);
router.patch('/:id', accessControlAdmin, userController.update);
router.delete('/:id', accessControlAdmin, userController.delete);

module.exports = router;