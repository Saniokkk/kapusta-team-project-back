const { Transaction, User } = require("../models");
const createError = require("../helpers/createError");

class TransactionController {
  async addTransaction(req, res) {
    const { _id, totalBalance } = req.user;
    const { type, sum } = req.body;
    console.log(req.body);

    const transaction = await Transaction.create({ ...req.body, owner: _id });

    const newBalance =
      type === "income" ? totalBalance + sum : totalBalance - sum;
    
    if (newBalance < 0) {
      throw createError(400, "Not enough money, impossible to make a transaction");
    }

    await User.findByIdAndUpdate(_id, { totalBalance: newBalance });

    res.status(201).json({
        transaction,
        totalBalance: newBalance,
      });
  }

  async getAllTransactions(req, res) {
    const { _id: owner } = req.user;
    const result = await Transaction.find({ owner }).populate(
      "owner",
      "_id, email"
    );
    res.status(200).json(result);
  }

  async removeTransaction(req, res) {
    const { transactionId } = req.params;
    const { _id, totalBalance } = req.user;

    const { type, sum } = await Transaction.findByIdAndRemove(transactionId);

    if (!sum) {
      throw createError();
    }

    const newBalance =
      type === "income" ? totalBalance - sum : totalBalance + sum;
    
    if (newBalance < 0) {
      throw createError(400, "Not enough money, impossible to make a transaction");
    }

    await User.findByIdAndUpdate({ _id }, { totalBalance: newBalance });

    res.status(200).json({
        message: `Transaction with ID: ${transactionId} deleted`,
        newBalance,
      });
  }

  async perPeriod(req, res) {
    const { _id } = req.user;
    const { month, year } = req.params;
    console.log(month)
    console.log(year)
    const result = await User.findById(
      _id,
      "-createdAt -updatedAt -password -token"
    );

    if (!result) {
      throw createError(404, "User not found");
    }

    const transactions = await Transaction.find({ owner: _id });

    const transactionsByMonthAndYear = transactions.filter(({ date }) => {
      const operationYear = date.getFullYear().toString();
      const operationMonth = (date.getMonth() + 1).toString();

      return operationYear === year && operationMonth === month;
    });

    console.log(transactionsByMonthAndYear);

    const incomeTransactions = transactionsByMonthAndYear.filter(
      ({ type }) => type === "income"
    );
    const expenseTransactions = transactionsByMonthAndYear.filter(
      ({ type }) => type === "expense"
    );

    const totalExpense = expenseTransactions.reduce(
      (prevValue, { sum }) => prevValue + sum,
      0
    );
    const totalIncome = incomeTransactions.reduce(
      (prevValue, { sum }) => prevValue + sum,
      0
    );

    res.status(200).json({
        incomeTransactions,
        expenseTransactions,
        totalExpense,
        totalIncome,
      });
  }
}

module.exports = new TransactionController();
