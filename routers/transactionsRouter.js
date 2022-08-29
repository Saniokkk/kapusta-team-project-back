const express = require("express");

const { auth, cntrWrapper, validation } = require("../middlewares");
const { TransactionController } = require("../controlers");
const { transactionJoiSchema } = require("../models/transaction");

const router = express.Router();

// get all transactions
router.get("/", auth, cntrWrapper(TransactionController.getAllTransaction));

// create new transaction

router.post(
  "/",
  auth,
  validation(transactionJoiSchema),
  cntrWrapper(TransactionController.addTransaction)
);

// delete transaction by id
router.delete(
  "/:transactionId",
  auth,
  cntrWrapper(TransactionController.removeTransaction)
);

module.exports = router;
