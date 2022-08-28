const { Transaction, User } = require("../models");
const { createError } = require("../helpers/createError");

class TransactionController {
  async addTransaction(req, res) {
    res.send("add transaction");
  }
  async getAllTransaction(req, res) {
    res.send("get transaction");
  }
  async removeTransaction(req, res) {
    res.send("remove transaction");
  }
}

module.exports = new TransactionController();
