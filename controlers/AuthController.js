const { Conflict, Unauthorized } = require("http-errors");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          userEmail,
        },
      },
    });
  }

  async login(req, res) {
    const { SECRET_KEY } = process.env;
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    const passCompare = bcrypt.compareSync(userPassword, user.userPassword);
    if (!passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          userEmail,
        },
      },
    });
  }

  async logout(req, res) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(200).json({
      status: `Logout success with id${_id}`,
      code: 200,
    });
  }
}

module.exports = new AuthController();
