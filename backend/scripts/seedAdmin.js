// backend/scripts/seedAdmin.js
// This script creates the first Super Admin user in the database.
// It reads admin credentials from the .env file for security.

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
import User from '../models/user.js';
import Profile from '../models/profile.js';

const seedAdmin = async () => {
  try {
    // Get MongoDB connection string from environment variables
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URL;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI or MONGODB_URL is not defined in .env');
      process.exit(1);
    }

    // Read admin credentials from .env (fallback to defaults with warning)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@studyorbit.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.warn('⚠️ Warning: ADMIN_EMAIL or ADMIN_PASSWORD not set in .env. Using default values.');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected Successfully');

    // Check if the admin already exists to prevent duplicates
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('   Skipping seed operation.');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Step 1: Create a Profile document for the admin (required by the User model)
    const profileData = {
      gender: 'Male',
      dateOfBirth: '01-01-1990',
      about: 'Super Admin of StudyOrbit Platform',
      contactNumber: '9999999999',
    };
    const newProfile = new Profile(profileData);
    const savedProfile = await newProfile.save();
    console.log('✅ Profile created for Admin');

    // Step 2: Create the Admin User
    const adminData = {
      firstName: 'Super',
      lastName: 'Admin',
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 10),
      role: 'Admin',
      isVerified: true,
      accountType: 'Admin',
      image: 'https://api.dicebear.com/5.x/initials/svg?seed=Admin', // Default placeholder
      additionalDetails: savedProfile._id, // Link to the profile we just created
    };

    const newAdmin = new User(adminData);
    await newAdmin.save();

    console.log('✅ Admin created successfully!');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword} (Please change this after first login)`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();