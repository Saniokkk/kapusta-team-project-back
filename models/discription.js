const { Schema, model } = require("mongoose");

const discriptionSchema = Schema(
  {
    name: {
      type: String,
      requred: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Discription = model("discription", discriptionSchema);

module.exports = Discription;
