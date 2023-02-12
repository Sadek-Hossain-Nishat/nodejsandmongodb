const express = require("express");
const AuthController = require("../controllers/AuthController");
// const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", AuthController.register);
// router.post("/login", authenticate, AuthController.login);
router.post("/login", AuthController.login);

router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
