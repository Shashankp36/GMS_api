const express = require('express');
const  { super_loginControllers, super_registerControllers} = require('../controller/Superadmincontroller.js');

const router = express.Router();

// performing the register routing 
router.route("/super-register").post(super_registerControllers);

// performing the login routing
router.route("/super-login").post(super_loginControllers);

module.exports = router;