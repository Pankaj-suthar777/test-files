const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("services", serviceSchema);

module.exports = Service;
