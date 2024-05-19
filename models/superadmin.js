const mongoose = require('mongoose');

// Define superadmin schema
const superadminSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,
    
  }
});

// Create superadmin model
const SuperAdmin = mongoose.model('SuperAdmin', superadminSchema);

module.exports = SuperAdmin;
