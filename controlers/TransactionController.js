const { Transaction, User } = require("../models");
const createError = require("../helpers/createError");

class TransactionController {
  async addTransaction(req, res) {
    const { _id, totalBalance } = req.user;
    const { type, sum } = req.body;
    console.log(req.body);

    const result = await Transaction.create({ ...req.body, owner: _id });

    const newBalance =
      type === "income" ? totalBalance + sum : totalBalance - sum;

    await User.findByIdAndUpdate(_id, { totalBalance: newBalance });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
        totalBalance: newBalance,
      },
    });
  }
  async getAllTransaction(req, res) {
    const { _id: owner } = req.user;
    const result = await Transaction.find({ owner }).populate(
      "owner",
      "_id, email"
    );
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
  async removeTransaction(req, res) {
    const { transactionId } = req.params;
    const { _id, totalBalance } = req.user;

    const { type, sum } = await Transaction.findByIdAndRemove(transactionId);

    if (!sum) {
      throw createError(404, "Not Found");
    }

    const newBalance =
      type === "income" ? totalBalance - sum : totalBalance + sum;

    await User.findByIdAndUpdate({ _id }, { totalBalance: newBalance });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        message: `Transaaction with ID${transactionId} deleted`,
        newBalance,
      },
    });
  }

  async perPeriod(req, res) {
    const { _id } = req.user;
    const { month, year } = req.params;

    const result = await User.findById(
      _id,
      "-createdAt -updatedAt -userPassword -token"
    );

    if (!result) {
      throw createError(404, "User not found");
    }

    const transactions = await Transaction.find({ owner: _id });

    const transactionsByMonthAndYear = transactions.filter(({ date }) => {
      const operationYear = date.getFullYear().toString();
      const operationMonth = 0 + (date.getMonth() + 1).toString();

      return operationYear === year && operationMonth === month;
    });

    const incomeTransactions = transactionsByMonthAndYear.filter(
      ({ type }) => type === "income"
    );
    const expenseTransactions = transactionsByMonthAndYear.filter(
      ({ type }) => type === "expense"
    );

    // console.log(incomeTransactions);
    // console.log(expenseTransactions);
    const totalExpense = expenseTransactions.reduce(
      (prevValue, { sum }) => prevValue + sum,
      0
    );
    const totalIncome = incomeTransactions.reduce(
      (prevValue, { sum }) => prevValue + sum,
      0
    );

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        incomeTransactions,
        expenseTransactions,
        totalExpense,
        totalIncome,
      },
    });
  }
}

module.exports = new TransactionController();
