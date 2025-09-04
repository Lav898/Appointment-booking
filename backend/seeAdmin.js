const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const seeAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@example.com';
    const adminPassword = 'password123';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Default admin user created successfully.');
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

seeAdmin();
