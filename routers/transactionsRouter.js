const express = require("express");

const { auth, ctrlWrapper, validation } = require("../middlewares");
const { TransactionController } = require("../controlers");
const { transactionJoiSchema } = require("../models/transaction");

const router = express.Router();

// get all transactions
router.get("/", auth, ctrlWrapper(TransactionController.getAllTransaction));

// create new transaction

router.post(
  "/",
  auth,
  validation(transactionJoiSchema),
  ctrlWrapper(TransactionController.addTransaction)
);

// delete transaction by id
router.delete(
  "/:transactionId",
  auth,
  ctrlWrapper(TransactionController.removeTransaction)
);

// by period(month/year)
router.get("/total/:month/:year", auth, TransactionController.perPeriod);

module.exports = router;
