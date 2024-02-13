const router = require("express").Router();
const Appointment = require("../models/reservationSchema");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  try {
    // Create a new appointment instance using the request body
    const appointments = await Appointment.find({ isBooked: true }).sort({
      updatedAt: -1,
    });

    // Send a success response
    res.status(201).send({
      success: true,
      data: appointments,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding appointment:", error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      clientId: req.body.userId,
      isPaid: true,
    }).sort({
      createdAt: -1,
    });

    // Send a success response
    res.status(201).send({
      success: true,
      data: appointments,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding appointment:", error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  try {
    // Create a new appointment instance using the request body
    const appointment = new Appointment(req.body);

    // Save the appointment to the database
    await appointment.save();

    // Send a success response
    res.status(201).send({
      success: true,
      message: "Availability added successfully",
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding appointment:", error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/current/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.find({
      service: id,
      isBooked: false,
    }).populate("service");

    res.status(201).send({
      success: true,
      data: appointment,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding appointment:", error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/current/process/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    res.status(201).send({
      success: true,
      data: appointment,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding appointment:", error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
