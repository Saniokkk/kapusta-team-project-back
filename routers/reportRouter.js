const express = require("express");

const { auth, ctrlWrapper } = require("../middlewares");
const { ReportController } = require("../controllers");

const router = express.Router();

router.get("/categories/:month/:year", auth, ctrlWrapper(ReportController.getReportByMonthForYear));

router.get("/currentYear/:type", auth,  ctrlWrapper(ReportController.getReportByMonthsSum));

router.get("/currentDay/:data", auth, ctrlWrapper(ReportController.getReportByDay));

module.exports = router;