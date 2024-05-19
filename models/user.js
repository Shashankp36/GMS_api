const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  aadharNumber: {
    type:String
  },
  phoneNumber: {
    type:Number
  },
  post:{
     type:[],
  }
});

// Create user model
const User = mongoose.model('User', userSchema);

module.exports=User;