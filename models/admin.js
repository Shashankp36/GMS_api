const mongoose = require('mongoose');

// Define admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

// Create admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
