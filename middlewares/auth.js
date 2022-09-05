const { User } = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("../helpers/createError");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log('auth');
  try {
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    console.log('beforeNext');
    console.log(error);
    next(error);
  }
};

module.exports = auth;
