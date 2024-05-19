const User = require('../models/user');
const Admin = require('../models/admin');
const Grievances=require('../models/Grivence')
// Get count of users
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of admins
exports.getAdminCount = async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getGrievanceCount = async (req, res) => {
  try {
    const count = await Grievances.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
