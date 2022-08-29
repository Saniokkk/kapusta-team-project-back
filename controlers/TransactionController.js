const { Transaction, User } = require("../models");

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
    res.send("get transaction");
  }
  async removeTransaction(req, res) {
    res.send("remove transaction");
  }
}

module.exports = new TransactionController();
