const { Conflict } = require("http-errors");
const { User } = require("../models");
const bcrypt = require("bcrypt");

class AuthController {
  async register(req, res) {
    console.log(req.body);
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });
    if (user) {
      throw new Conflict(` Email ${userEmail} in use`);
    }
    const hashPassword = bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10));
    const result = await User.create({
      userEmail,
      userPassword: hashPassword,
    });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          userEmail,
        },
      },
    });
  }
}

module.exports = new AuthController();
