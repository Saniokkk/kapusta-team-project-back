const express = require("express");

const { auth } = require("../middlewares");
const { ctrlWrapper } = require("../middlewares");
const { BalanceControler } = require("../controlers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(BalanceControler.getBalance));

router.patch("/update", auth, ctrlWrapper(BalanceControler.updateBalance));

module.exports = router;
