const express = require('express');
const router = express.Router();
const { getUserCount, getAdminCount } = require('../controller/countController');

router.get('/user-count', getUserCount);
router.get('/admin-count', getAdminCount);

module.exports = router;
// Routes/count_router.js:
// const express = require('express');
// const router = express.Router();
// const { getUserCount, getAdminCount, getProblemCount } = require('../controller/countController');

// router.get('/user-count', getUserCount);
// router.get('/admin-count', getAdminCount);
// router.get('/problem-count', getProblemCount);

// module.exports = router;