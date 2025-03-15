const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, company, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      company,
      phoneNumber,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
    });
  }
});

module.exports = router; 