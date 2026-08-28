// backend/scripts/seedCategories.js
// This script populates the database with default categories.
// It checks for existing categories to avoid duplicate entries.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Category from '../models/category.js';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// List of default categories to seed
const defaultCategories = [
  {
    name: 'Web Development',
    description: 'Learn to build modern websites and web applications using HTML, CSS, JavaScript, and frameworks like React, Angular, and Node.js.',
  },
  {
    name: 'Data Science',
    description: 'Master data analysis, machine learning, AI, and visualization using Python, R, and tools like TensorFlow and Tableau.',
  },
  {
    name: 'Mobile Development',
    description: 'Build native and cross-platform mobile apps using Flutter, React Native, Kotlin, and Swift.',
  },
  {
    name: 'Cloud Computing',
    description: 'Explore cloud platforms like AWS, Azure, and Google Cloud, and learn about DevOps, containerization, and serverless architecture.',
  },
  {
    name: 'Cybersecurity',
    description: 'Understand network security, ethical hacking, cryptography, and security best practices to protect digital assets.',
  },
  {
    name: 'Business & Marketing',
    description: 'Learn digital marketing, business strategy, entrepreneurship, and brand management for career growth.',
  },
  {
    name: 'Design & UX',
    description: 'Master UI/UX design, graphic design, tools like Figma, Adobe XD, and create user-friendly experiences.',
  },
  {
    name: 'Personal Development',
    description: 'Enhance soft skills, leadership, communication, time management, and productivity.',
  },
];

const seedCategories = async () => {
  try {
    // Get MongoDB connection string from environment variables
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URL;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI or MONGODB_URL is not defined in .env');
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected Successfully');

    // Check if categories already exist to avoid duplicates
    const existingCount = await Category.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️ ${existingCount} categories already exist. Skipping seed.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Insert all default categories into the database
    const inserted = await Category.insertMany(defaultCategories);
    console.log(`✅ ${inserted.length} categories seeded successfully!`);
    inserted.forEach((cat) => {
      console.log(`   - ${cat.name}: ${cat.description?.slice(0, 50)}...`);
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedCategories();