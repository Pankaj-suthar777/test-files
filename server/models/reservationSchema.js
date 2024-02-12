const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    serviceTitle: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    phone: {
      type: String,
      default: "",
    },
    availabilityData: {
      type: String,
      default: "",
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("apponitments", AppointmentSchema);

module.exports = Appointment;
