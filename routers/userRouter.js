const express = require("express");

const { UserController } = require("../controllers");

const { auth, ctrlWrapper } = require("../middlewares");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(UserController.current));

module.exports = router;
