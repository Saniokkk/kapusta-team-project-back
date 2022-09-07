const express = require("express");

const { auth, ctrlWrapper } = require("../middlewares");
const { ReportController } = require("../controllers");

const router = express.Router();

router.get("/currentYear/:type", auth, ctrlWrapper(ReportController.getReportByMonthsSum));

router.get("/byCategory/:month/:year", auth, ctrlWrapper(ReportController.getTransaction));

module.exports = router;