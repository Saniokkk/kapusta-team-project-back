const express = require("express");

const { auth, ctrlWrapper } = require("../middlewares");
const {ReportController} = require("../controllers")

const router = express.Router();

router.get("/currentYear-income", auth, ctrlWrapper(ReportController.getIncome));

router.get("/currentYear-expense", auth, ctrlWrapper(ReportController.getExpense));

module.exports = router;