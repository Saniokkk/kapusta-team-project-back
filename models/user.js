const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("user", userSchema);

const regVerMeil = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const register = Joi.object({
  email: Joi.string().pattern(regVerMeil).required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
    email: Joi.string().pattern(regVerMeil).required(),
    password: Joi.string().min(6).required()
});

const balance = Joi.object({
  totalBalance: Joi.number().required(),
});

const joiSchemas = {
  register,
  login,
  balance,
}

module.exports = {
  User,
  joiSchemas
};
