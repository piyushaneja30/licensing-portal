import mongoose from 'mongoose';
import sequelize from '../src/config/database.js';
import User from '../src/models/User.js';
import License from '../src/models/License.js';
import LicenseApplication from '../src/models/LicenseApplication.js';
import dotenv from 'dotenv';

dotenv.config();

async function migrateData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/licensing-portal');
    console.log('Connected to MongoDB');

    // Connect to MySQL
    await sequelize.authenticate();
    console.log('Connected to MySQL');

    // Migrate users
    console.log('Migrating users...');
    const mongoUsers = await mongoose.model('User').find();
    for (const user of mongoUsers) {
      await User.create({
        email: user.email,
        password: user.password,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        phone: user.profile.phone,
        role: user.role,
        isActive: true,
        profession: user.profile.profession,
        licenseNumber: user.profile.licenseNumber,
        specialization: user.profile.specialization,
        yearsOfExperience: user.profile.yearsOfExperience
      });
    }
    console.log(`Migrated ${mongoUsers.length} users`);

    // Migrate licenses
    console.log('Migrating licenses...');
    const mongoLicenses = await mongoose.model('License').find();
    for (const license of mongoLicenses) {
      await License.create({
        userId: license.userId,
        licenseNumber: license.licenseNumber,
        licenseType: license.licenseType,
        issueDate: license.issueDate,
        expiryDate: license.expiryDate,
        status: license.status
      });
    }
    console.log(`Migrated ${mongoLicenses.length} licenses`);

    // Migrate applications
    console.log('Migrating applications...');
    const mongoApplications = await mongoose.model('LicenseApplication').find();
    for (const app of mongoApplications) {
      await LicenseApplication.create({
        userId: app.userId,
        licenseType: app.licenseType,
        status: app.status,
        applicationDate: app.submissionDate,
        reviewDate: app.reviewDate,
        documents: app.documents,
        notes: app.notes,
        personalInfo: app.personalInfo,
        education: app.education,
        reviewNotes: app.reviewNotes
      });
    }
    console.log(`Migrated ${mongoApplications.length} applications`);

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrateData(); 