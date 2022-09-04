const express = require("express");

const { auth, ctrlWrapper } = require("../middlewares");
const { TransactionController } = require("../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(TransactionController.getAllTransactions));

router.post("/income", auth, ctrlWrapper(TransactionController.addTransactionIncome));

router.post("/expense", auth, ctrlWrapper(TransactionController.addTransactionExpense));

router.delete("/:type/:transactionId", auth, ctrlWrapper(TransactionController.removeTransaction));

module.exports = router;

// get all transactions

// router.get("/", auth, ctrlWrapper(TransactionController.getAllTransactions));

// create new transaction

// router.post("/",
//   auth,
//   validation(transactionJoiSchema),
//   ctrlWrapper(TransactionController.addTransaction)
// );

// delete transaction by id

// router.delete("/:transactionId",
//   auth,
//   ctrlWrapper(TransactionController.removeTransaction)
// );

// by period(month/year)

// router.get("/total/:month/:year", auth, ctrlWrapper(TransactionController.perPeriod));