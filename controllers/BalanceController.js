const { User } = require("../models");

const { createError } = require("../helpers/createError");

class BalanceController {
  async getBalance(req, res) {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      throw createError();
    }
    res.status(200).json({totalBalance: user.totalBalance});
  }

  async updateBalance(req, res) {
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, req.body);
    if (!result) {
      throw createError(404, "User not found");
    }
    const newBalance = await User.findById(_id);

    res.status(201).json({newBalance: newBalance.totalBalance});
  }
}

module.exports = new BalanceController();
