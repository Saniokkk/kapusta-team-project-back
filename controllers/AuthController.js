const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const { User, joiUserSchemas } = require("../models/user");
const createError = require("../helpers/createError");

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    const { SECRET_KEY } = process.env;
    
    const { error } = joiUserSchemas.register.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }    
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, ` Email ${email} in use`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });


    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      token
    });
    
    res.status(201).json({
      user: {
        email: result.email,
        avatarURL,
        token
      },
    });
  }

  async login(req, res) {
    const { SECRET_KEY } = process.env;
    const { email, password } = req.body;
    const { error } = joiUserSchemas.login.validate(req.body);

    if (error) {
        throw createError(400, error.message);
    }    

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw createError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        token,
        user: {
          email,
      },
    });
  }

  async logout(req, res) {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: null });

    if (!user) {
      throw createError(401);
    }

    res.status(204).send(`Logout success with id: ${_id}`);
  }
}

module.exports = new AuthController();
