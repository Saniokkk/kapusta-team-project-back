const authRouter = require("./auth");
const googleRouter = require("./googleAuth");
const balanceRouter = require("./balanceRouter");

module.exports = {
  authRouter,
  googleRouter,
  balanceRouter,
};
