const express = require("express");
const { AuthController } = require("../controlers");
const { auth, validation, ctrlWrapper } = require("../middlewares");

const { joiSchemas } = require("../models/user");

const router = express.Router();

router.post("/register", validation(joiSchemas.register), ctrlWrapper(AuthController.register));

router.get('/verify/:verificationToken', ctrlWrapper(AuthController.verifyEmail));

// router.get('/verify', ctrlWrapper(ctrl.resendVerifyEmail));

router.post("/login", validation(joiSchemas.login), ctrlWrapper(AuthController.login));

router.get("/logout", auth, ctrlWrapper(AuthController.logout));

module.exports = router;
