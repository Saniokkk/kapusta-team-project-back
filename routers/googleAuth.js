const express = require("express");
const { GoogleAuthController } = require("../controllers");
const { ctrlWrapper } = require("../middlewares");

const router = express.Router();

router.get("/google", ctrlWrapper(GoogleAuthController.googleAuth));

router.get(
  "/google-redirect",
  ctrlWrapper(GoogleAuthController.googleRedirect)
);

module.exports = router;
