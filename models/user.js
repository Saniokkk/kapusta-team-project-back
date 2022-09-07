const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      minLength: 10,
      maxLength: 63,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,  
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,        
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
const regPass = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const register = Joi.object({
  email: Joi.string().pattern(regVerMeil).required(),
  password: Joi.string().pattern(regPass).min(6).required(),
});

const login = Joi.object({
    email: Joi.string().pattern(regVerMeil).required(),
    password: Joi.string().pattern(regPass).min(6).required()
});

const balance = Joi.object({
  totalBalance: Joi.number().required(),
});

const joiUserSchemas = {
  register,
  login,
  balance,
}

module.exports = {
  User,
  joiUserSchemas
};
