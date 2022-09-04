const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const {v4: uuid } = require('uuid');
const { User, joiSchemas } = require("../models/user");
const sendEmail = require('../helpers/sendEmail');
const createError = require("../helpers/createError");

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    const { NODE_ENV, BASE_URL_DEV, BASE_URL_PROD } = process.env;
    console.log(NODE_ENV);

    const baseUrl = NODE_ENV === "development" ? BASE_URL_DEV : BASE_URL_PROD;
    
    const { error } = joiSchemas.register.validate(req.body);

    if (error) {
        throw createError(400, error.message);
    }    
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, ` Email ${email} in use`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const verificationToken = uuid();

    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken
    });

    console.log(baseUrl);
    const mail = {
      to: email,
      subject: "Підтвердження реєстрації на сайті",
      html: `<a target="_blank" href="${baseUrl}/api/users/verify/${verificationToken}">Натисніть для підтвердження реїстрації</a>`
    }
    
    await sendEmail(mail);
    console.log(email);
    
    res.status(201).json({
      user: {
        email: result.email,
      },
    });
  }

  async verifyEmail(req, res){
    const verificationToken = req.params;
    console.log(verificationToken);
    const user = await User.findOne( verificationToken );
    console.log(user);
    if (!user) {
      throw createError(404);
    }
    const result = await User.findByIdAndUpdate(user._id, { verificationToken: "", verify: true });
    console.log(result);
    res.json({
        message: "Verification successful"
    })
}

  async login(req, res) {
    const { SECRET_KEY } = process.env;
    const { email, password } = req.body;
    const { error } = joiSchemas.login.validate(req.body);

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
        throw createError(401)
    }

    res.status(200).send(`Logout success with id: ${_id}`);
  }

  current(req, res) {
    const { email, avatarURL, totalBalance } = req.user;
    console.log(req.user);
    res.json({
        email,
        avatarURL,
        totalBalance
    })
  }
}

module.exports = new AuthController();
