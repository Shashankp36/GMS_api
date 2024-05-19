const mongoose = require('mongoose');
const moment = require('moment');

// Define user schema
const GrivenceSchema = new mongoose.Schema({
  subdepartment:{
    type:String,
  },
  problem:{
      type:String,
  },
  Image:{
    type:String,
  },
  department:{
     type:String,
  },
  token:{
   type:String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
    type:String,
    default:'pending',
  },
  location: { // Add this new field
    type: String,
  },
});

// Define a virtual field for formatted date and time
GrivenceSchema.virtual('formattedDateTime').get(function() {
  return moment(this.createdAt).format('DD-MM-YYYY hh:mm');
});

// Create user model
const grivence = mongoose.model('grivence', GrivenceSchema);

module.exports = grivence;
