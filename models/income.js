const { Schema, model } = require("mongoose");
const Joi = require("joi");

const incomeSchema = Schema(
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
        "Дохід",
        "Доп.дохід"
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

const incomeJoiSchema = Joi.object({
  description: Joi.string().required(),
  category: Joi.string().required(),
  sum: Joi.number().required(),
  date: Joi.date().required(),
  owner: Joi.string(),
});

const Income = model("income", incomeSchema);

module.exports = {incomeJoiSchema, Income};
