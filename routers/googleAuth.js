const express = require("express");
const { GoogleAuthController } = require("../controlers");
const { cntrWrapper } = require("../middlewares");

const router = express.Router();

router.get("/google", cntrWrapper(GoogleAuthController.googleAuth));

router.get(
  "/google-redirect",
  cntrWrapper(GoogleAuthController.googleRedirect)
);

module.exports = router;
