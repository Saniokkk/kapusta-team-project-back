const AuthController = require("./AuthController");
<<<<<<< HEAD:controllers/index.js
const GoogleAuthController = require("./GoogleAuthController");
const BalanceController = require("./BalanceController");
=======
const BalanceControler = require("./BalanceControler");
>>>>>>> main:controlers/index.js
const TransactionController = require("./TransactionController");
const { googleAuth } = require("./GoogleAuthController");
const { googleRedirect } = require("./GoogleAuthController");

module.exports = {
  AuthController,
<<<<<<< HEAD:controllers/index.js
  GoogleAuthController,
  BalanceController,
=======
  BalanceControler,
>>>>>>> main:controlers/index.js
  TransactionController,
  googleAuth,
  googleRedirect,
};
