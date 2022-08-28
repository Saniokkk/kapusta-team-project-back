const authRouter = require("./auth");
const googleRouter = require("./googleAuth");
const balanceRouter = require("./balanceRouter");
const transactionsRouter = require("./transactionsRouter");

module.exports = {
  authRouter,
  googleRouter,
  balanceRouter,
  transactionsRouter,
};
