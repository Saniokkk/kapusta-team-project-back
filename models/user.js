const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    userPassword: {
      type: String,
      required: [true, "Password is required"],
    },
    userEmail: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    token: {
      type: String,
      default: null,
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

const joiRegisterSchema = Joi.object({
  userPassword: Joi.string().min(6).required(),
  userEmail: Joi.string().pattern(regVerMeil).required(),
});

const balanceSchema = Joi.object({
  totalBalance: Joi.number().required(),
});

module.exports = {
  User,
  joiRegisterSchema,
  balanceSchema,
};
