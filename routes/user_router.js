const express = require('express');
const { loginControllers, registerControllers, getUserCount,userdata, delete_user,getUserProfile } = require('../controller/Usercontroller.js');

const router = express.Router();

// performing the register routing 
router.post("/register", registerControllers);

// performing the login routing
router.post("/login", loginControllers);

// getting the user count
router.get('/user-count', getUserCount);

router.post("/getuser", userdata);
router.post("/deleteuser", delete_user);
router.get('/profile', getUserProfile);
module.exports=router;