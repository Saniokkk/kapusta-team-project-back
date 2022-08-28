const express = require("express");

const { auth } = require("../middlewares");
const { cntrWrapper } = require("../middlewares");
const { BalanceControler } = require("../controlers");

const router = express.Router();

router.get("/current", auth, cntrWrapper(BalanceControler.getBalance));

router.patch("/update", auth, cntrWrapper(BalanceControler.updateBalance));

module.exports = router;
