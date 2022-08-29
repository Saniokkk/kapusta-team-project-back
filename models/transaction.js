const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
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
        "transport",
        "products",
        "health",
        "alcohol",
        "entertainment",
        "housing",
        "technique",
        "communal, communications",
        "sports, hobbies",
        "education",
        "other",
        "wages",
        "income",
      ],
    },
    sum: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = model("transaction", transactionSchema);

const transactionJoiSchema = Joi.object({
  description: Joi.string().required(),
  category: Joi.string().required(),
  sum: Joi.number().required(),
  type: Joi.string().required(),
  date: Joi.date().required(),
  owner: Joi.string(),
});

module.exports = { Transaction, transactionJoiSchema };
