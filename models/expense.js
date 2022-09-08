const { Schema, model } = require("mongoose");
const Joi = require("joi");

const expenseSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Транспорт",
        "Продукти",
        "Здоровя",
        "Алкоголь",
        "Розваги",
        "Дім",
        "Техніка",
        "Комуналка",
        "Спорт, хобі",
        "Освіта",
        "Інше"
      ],
    },
    sum: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Expense = model("expense", expenseSchema);

const expenseJoiSchema = Joi.object({
  description: Joi.string().required(),
  category: Joi.string().required(),
  sum: Joi.number().required(),
  date: Joi.date().required(),
  owner: Joi.string(),
});

module.exports = { Expense, expenseJoiSchema };

// const transactionJoiSchema = Joi.object({
//   description: Joi.string().required(),
//   category: Joi.string().required(),
//   sum: Joi.number().required(),
//   type: Joi.string().required(),
//   date: Joi.date().required(),
//   owner: Joi.string(),
// });