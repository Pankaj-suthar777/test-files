const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");

// new user
router.post("/signup", async (req, res) => {
  try {
    //check if user exist already
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    //save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//user login

router.post("/login", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret);

    //send response
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get user
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all user
router.get("/get-all-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.find({}).sort({ createdAt: -1 });

    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//handle image from pc
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/upload-image-to-user",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      //upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Folders",
      });

      // const user = await User.findByIdAndUpdate(req.body.userId, {
      //   profilePicture: result.secure_url,
      // });

      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

router.put("/edit-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { email } = req.body;
    let { password } = req.body;
    const { profilePicture } = req.body;
    console.log(profilePicture);

    if (profilePicture) {
      const updatedUser = await User.findByIdAndUpdate(id, {
        profilePicture: profilePicture,
      });
    }

    if (password) {
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      password = hashPassword;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, password, name, password },
        { new: true }
      );
    }
    if (name || email) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "User name updated successfully",
    });
  } catch (error) {
    console.error("Error updating user name:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//get appoinment user
router.get("/get/user-appointment/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = useParams();
    const user = await User.findById(id);

    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
