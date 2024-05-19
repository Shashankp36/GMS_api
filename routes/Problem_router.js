// problem_router.js

const express = require('express');
const multer = require('multer');
const GrivenceSchema = require('../models/Grivence');
const User = require('../models/user')
const { Problemplus, problemdata_admin, problemdata_super, updateStatus } = require('../controller/Problemcontroller')
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// uploading the image 
let imageName;
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  console.log("hello");
  imageName = req.file.filename;
  return res.status(200).json({
    success: true,
    message: "Image Uploaded Successfully",
  });

});

router.post('/add-problem', async (req, res) => {
  console.log("add-problem");
  try {
    const {
      email,
      subdepartment,
      problem,
      department,
      location,
      token,
    } = req.body;

    if (
      !department ||
      !problem ||
      !email ||
      !subdepartment ||
      !location
    ) {
      return res.status(408).json({
        success: false,
        messages: "Please Fill all fields",
      });
    }

    const users = await User.findOne({ email });

    if (!users) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let Newgrievance = await GrivenceSchema.create({
      subdepartment: subdepartment,
      problem: problem,
      Image: imageName,
      department: department,
      token: token,
      user: users._id,
      location: location,
    });

    users.post.push(Newgrievance);
    await users.save();

    return res.status(200).json({
      success: true,
      message: "Transaction Added Successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }

});
router.route("/getproblem").post(Problemplus);
router.route("/getproblem-admin").post(problemdata_admin);

router.route("/getproblem-super").post(problemdata_super);
router.route("/updatestatus").post(updateStatus);
module.exports = router;
