const { User } = require("../models");

const { createError } = require("../helpers/createError");

class BalanceControler {
  async getBalance(req, res) {
    console.log(req.user);
    const { _id } = req.user;
    const result = await User.findById(_id);
    console.log(result);
    if (!result) {
      createError(404, "User not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        totalBalance: result.totalBalance,
      },
    });
  }
  async updateBalance(req, res) {
    const { _id } = req.user;
    console.log(req.body);
    const result = await User.findByIdAndUpdate(_id, req.body);
    if (!result) {
      createError(404, "User not found");
    }
    const newBalance = await User.findById(_id);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: `Balance updated, new balance is: ${newBalance.totalBalance}`,
      },
    });
  }
}

module.exports = new BalanceControler();
