const express = require("express");

const { auth, ctrlWrapper } = require("../middlewares");
const { ReportController } = require("../controllers");

const router = express.Router();

router.get("/currentYear-income", auth, ctrlWrapper(ReportController.getIncome));

router.get("/currentYear-expense", auth, ctrlWrapper(ReportController.getExpense));

router.get("/:month/:year", auth, ctrlWrapper(ReportController.getTransaction));

module.exports = router;