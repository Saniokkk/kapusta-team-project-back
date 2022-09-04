const { Schema, model } = require("mongoose");

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
        "salary",
        "extraSalary"
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

const Income = model("income", incomeSchema);

module.exports = {incomeSchema, Income};
