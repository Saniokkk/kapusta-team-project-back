const express = require("express");

const { auth } = require("../middlewares");
const { cntrWrapper } = require("../middlewares");
const { BalanceControler } = require("../controlers");

const router = express.Router();

// get current user balance
router.get("/current", auth, cntrWrapper(BalanceControler.getBalance));

// update user balance
router.patch("/update", auth, cntrWrapper(BalanceControler.updateBalance));

module.exports = router;
