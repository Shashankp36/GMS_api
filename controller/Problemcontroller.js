// problemcontroller.js

const express = require('express');
const multer = require('multer');
const GrivenceSchema = require('../models/Grivence');
const User = require('../models/user');
const grivence = require('../models/Grivence');

const Problemplus = async (req, res) => {
  try {
    const { userId } = req.body;

    const data = await grivence.find({ user: userId });
    
    if (data) {
      return res.status(200).json({
        success: true,
        problem: data
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
}


const problemdata_admin = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    const department = admin.department;

    const complaints = await GrivenceSchema.find({ department });

    if (!complaints) {
      return res.status(400).json({
        success: false,
        message: "No complaints found for this department",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaints fetched successfully",
      data: complaints,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

const problemdata_super = async (req, res) => {
  try {
    const data = await grivence.find({}).populate('user', 'email');

    const problems = data.map(problem => ({
      ...problem.toJSON(),
      userId: problem.user._id
    }));

    return res.status(200).json({
      success: true,
      problem: problems
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
}

const updateStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    const grivenceElement = await GrivenceSchema.findById(id);

    if (!grivenceElement) {
      return res.status(400).json({
        success: false,
        message: "entry not found",
      });
    }
    if (status) {
      grivenceElement.status = status;
    }

    await grivenceElement.save();

    return res.status(200).json({
      success: true,
      message: `Status Updated Successfully`,
      data: grivenceElement,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
}

module.exports = { Problemplus, problemdata_admin, problemdata_super, updateStatus };
