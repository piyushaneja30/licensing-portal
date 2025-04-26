import sequelize from './database.js';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import BusinessProfile from '../models/BusinessProfile.js';
import LicenseApplication from '../models/LicenseApplication.js';
import ApplicationEducation from '../models/ApplicationEducation.js';
import ApplicationDocument from '../models/ApplicationDocument.js';
import ApplicationReviewNote from '../models/ApplicationReviewNote.js';

async function initDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to initialize database:', error);
    throw error;
  }
}

export default initDatabase; 