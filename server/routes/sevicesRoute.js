const router = require("express").Router();
const User = require("../models/userModel");
const Service = require("../models/serviceModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add-service", authMiddleware, async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(200).json({
      success: true,
      message: "User name updated successfully",
    });
  } catch (error) {
    console.error("Error In Adding Service:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/get-services", async (req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });

    res.send({
      success: true,
      message: "User name updated successfully",
      data: services,
    });
  } catch (error) {
    console.error("Error In Adding Service:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/edit", authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    const { title } = req.body;
    const { price } = req.body;
    const { duration } = req.body;
    const services = await Service.findByIdAndUpdate(id, {
      title,
      price,
      duration,
    });
    res.send({
      success: true,
      message: "Service edited successfully",
      data: services,
    });
  } catch (error) {
    console.error("Error In editing Service:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.send({
      success: true,
      message: "Service edited successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error In editing Service:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//delete a service
router.delete("/delete-service/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.send({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
