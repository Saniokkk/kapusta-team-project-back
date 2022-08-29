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
}

module.exports = new TransactionController();
