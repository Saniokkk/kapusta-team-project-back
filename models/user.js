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
  },
  { timestamps: true, versionKey: false }
);

const User = model("user", userSchema);

const joiRegisterSchema = Joi.object({
  userPassword: Joi.string().required(),
  userEmail: Joi.string().required(),
  // subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiLoginSchema = Joi.object({
  userPassword: Joi.string().required(),
  userEmail: Joi.string().required(),
});

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
