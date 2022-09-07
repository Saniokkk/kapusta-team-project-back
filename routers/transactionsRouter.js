const express = require("express");

const { auth, ctrlWrapper } = require("../middlewares");
const { TransactionController } = require("../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(TransactionController.getAllTransactions));

router.post("/income", auth, ctrlWrapper(TransactionController.addTransactionIncome));

router.post("/expense", auth, ctrlWrapper(TransactionController.addTransactionExpense));

router.delete("/:type/:transactionId", auth, ctrlWrapper(TransactionController.removeTransaction));

module.exports = router;
