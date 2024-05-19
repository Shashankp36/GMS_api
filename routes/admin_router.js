const express = require('express');
const  { delete_admin,admindata,admin_loginControllers, admin_registerControllers,getAdminCount} = require('../controller/Admincontroller.js');


const router = express.Router();

// performing the register routing 
router.route("/admin-register").post(admin_registerControllers);

// performing the login routing
router.route("/admin-login").post(admin_loginControllers);

// getting the all admin
router.route("/getadmin").post(admindata);

router.route("/delete").post(delete_admin);
router.get('/admin-count', getAdminCount);
router.route("/getadmin").post(admindata);

router.route("/delete").post(delete_admin);

module.exports = router;