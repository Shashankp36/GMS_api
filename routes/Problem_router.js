// // problem_router.js

// const express = require('express');
// const multer = require('multer');
// const GrivenceSchema = require('../models/Grivence');
// const User = require('../models/user')
// const { Problemplus, problemdata_admin, problemdata_super, updateStatus } = require('../controller/Problemcontroller')
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../frontend/src/images/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// // uploading the image 
// let imageName;
// const upload = multer({ storage: storage });

// router.post("/upload", upload.single("image"), async (req, res) => {
//   console.log("hello");
//   imageName = req.file.filename;
//   return res.status(200).json({
//     success: true,
//     message: "Image Uploaded Successfully",
//   });

// });

// router.post('/add-problem', async (req, res) => {
//   console.log("add-problem");
//   try {
//     const {
//       email,
//       subdepartment,
//       problem,
//       department,
//       location,
//       token,
//     } = req.body;

//     if (
//       !department ||
//       !problem ||
//       !email ||
//       !subdepartment ||
//       !location
//     ) {
//       return res.status(408).json({
//         success: false,
//         messages: "Please Fill all fields",
//       });
//     }

//     const users = await User.findOne({ email });

//     if (!users) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     let Newgrievance = await GrivenceSchema.create({
//       subdepartment: subdepartment,
//       problem: problem,
//       Image: imageName,
//       department: department,
//       token: token,
//       user: users._id,
//       location: location,
//     });

//     users.post.push(Newgrievance);
//     await users.save();

//     return res.status(200).json({
//       success: true,
//       message: "Transaction Added Successfully",
//     });
//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       messages: err.message,
//     });
//   }

// });
// router.route("/getproblem").post(Problemplus);
// router.route("/getproblem-admin").post(problemdata_admin);

// router.route("/getproblem-super").post(problemdata_super);
// router.route("/updatestatus").post(updateStatus);
// module.exports = router;

const express = require('express');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const GrivenceSchema = require('../models/Grivence');
const User = require('../models/user');
const { Problemplus, problemdata_admin, problemdata_super, updateStatus } = require('../controller/Problemcontroller');
const router = express.Router();

// Create Multer GridFS storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://shashankpatidar1:shashank@cluster0.yziocbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Update with your MongoDB connection string
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads' // Use your desired bucket name
    };
  }
});
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }
    const imageUrl = `/uploads/${req.file.filename}`; // Assuming you're serving images from a route like /uploads
    return res.status(200).json({
      success: true,
      message: "Image Uploaded Successfully",
      imageUrl: imageUrl
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error uploading image"
    });
  }
});

router.post('/add-problem', async (req, res) => {
  try {
    const {
      email,
      subdepartment,
      problem,
      department,
      location,
      token,
      imageUrl // Assuming you'll receive the image URL from the frontend
    } = req.body;

    if (!department || !problem || !email || !subdepartment || !location || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const newGrievance = await GrivenceSchema.create({
      subdepartment: subdepartment,
      problem: problem,
      image: imageUrl, // Save the image URL
      department: department,
      token: token,
      user: user._id,
      location: location
    });

    user.post.push(newGrievance);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Grievance added successfully",
      data: newGrievance
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

router.route("/getproblem").post(Problemplus);
router.route("/getproblem-admin").post(problemdata_admin);
router.route("/getproblem-super").post(problemdata_super);
router.route("/updatestatus").post(updateStatus);

module.exports = router;
