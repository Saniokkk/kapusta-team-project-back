const express = require("express");

const { auth } = require("../middlewares");
const { ctrlWrapper } = require("../middlewares");
const { BalanceController } = require("../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(BalanceController.getBalance));

router.patch("/update", auth, ctrlWrapper(BalanceController.updateBalance));

module.exports = router;
