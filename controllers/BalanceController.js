const { User } = require("../models");

const { createError } = require("../helpers/createError");

class BalanceController {
  async getBalance(req, res) {
    console.log(req.user);
    const { _id } = req.user;
    const user = await User.findById(_id);
    console.log(user);
    if (!user) {
      throw createError();
    }
    res.status(200).json({totalBalance: user.totalBalance});
  }

  async updateBalance(req, res) {
    const { _id } = req.user;
    console.log(req.body);
    const result = await User.findByIdAndUpdate(_id, req.body);
    if (!result) {
      throw createError(404, "User not found");
    }
    const newBalance = await User.findById(_id);
    res.status(201).json({
        message: `Balance updated, new balance is: ${newBalance.totalBalance}`,
      });
  }
}

module.exports = new BalanceController();
