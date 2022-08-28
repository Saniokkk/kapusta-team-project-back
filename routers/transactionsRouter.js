const express = require("express");

const { auth } = require("../middlewares");
const { cntrWrapper } = require("../middlewares");
const { TransactionController } = require("../controlers");

const router = express.Router();

// get all transactions
router.get("/", auth, cntrWrapper(TransactionController.getAllTransaction));

// create new transaction
router.post("/", auth, cntrWrapper(TransactionController.addTransaction));

// delete transaction by id
router.delete(
  "/:transactionId",

  cntrWrapper(TransactionController.removeTransaction)
);
module.exports = router;
