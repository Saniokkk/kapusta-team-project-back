const express = require("express");

const {
    AuthController,
    googleAuth,
    googleRedirect,
} = require("../controllers");

const { auth, validation, ctrlWrapper } = require("../middlewares");

const { joiUserSchemas } = require("../models/user");

const router = express.Router();

router.post("/register", validation(joiUserSchemas.register), ctrlWrapper(AuthController.register));

router.get('/verify/:verificationToken', ctrlWrapper(AuthController.verifyEmail));

// router.get('/verify', ctrlWrapper(ctrl.resendVerifyEmail));

router.post("/login", validation(joiUserSchemas.login), ctrlWrapper(AuthController.login));

router.post("/logout", auth, ctrlWrapper(AuthController.logout));


router.get("/current", auth, ctrlWrapper(AuthController.current));

router.get("/google", ctrlWrapper(googleAuth));

router.get("/google-redirect", ctrlWrapper(googleRedirect));


module.exports = router;
