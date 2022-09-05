const authRouter = require("./auth");
const reportRouter = require("./reportRouter");
const balanceRouter = require("./balanceRouter");
const transactionsRouter = require("./transactionsRouter");
const userRouter = require("./userRouter");

module.exports = {
  authRouter,
  reportRouter,
  balanceRouter,
  transactionsRouter,
  userRouter,
};
