const express = require("express");

const { auth, ctrlWrapper } = require("../middlewares");
const { ReportController } = require("../controllers");

const router = express.Router();

router.get("/byCategory/:month/:year", auth, ctrlWrapper(ReportController.getReportByMonthForYear));

router.get("/amountByDescription/:category/:month/:year", auth, ctrlWrapper(ReportController.getSumAllDescriptionByCategory));

router.get("/summaryByMonth/:year/:type", auth,  ctrlWrapper(ReportController.getReportByMonthsSum));

router.get("/currentDay/:date", auth, ctrlWrapper(ReportController.getReportByDay));

module.exports = router;



