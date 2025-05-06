import License from '../src/models/License.js';
import sequelize from '../src/config/database.js';

async function seedLicenses() {
  await sequelize.sync();
  await License.bulkCreate([
    {
      licenseNumber: 'ACU491',
      licenseType: 'Acupuncturist',
      name: 'Acupuncturist',
      description: 'License to practice as a acupuncturist',
      fee: 250,
      category: 'Other',
      requirements: ['Degree in Acupuncture', 'State Exam'],
      processingTime: '3-4 weeks',
      validityPeriod: '12 months',
      issueDate: new Date(),
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      status: 'active',
      userId: 1,
    },
    {
      licenseNumber: 'ADV102',
      licenseType: 'Advanced Macro Social Worker',
      name: 'Advanced Macro Social Worker',
      description: 'License to practice as a advanced macro social worker',
      fee: 300,
      category: 'Social Services',
      requirements: ['MSW Degree', 'State Exam'],
      processingTime: '4-6 weeks',
      validityPeriod: '24 months',
      issueDate: new Date(),
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
      status: 'active',
      userId: 1,
    },
    {
      licenseNumber: 'AGE156',
      licenseType: 'Agency Fire Investigator Employee',
      name: 'Agency Fire Investigator Employee',
      description: 'License to practice as a agency fire investigator employee',
      fee: 350,
      category: 'Investigation & Security',
      requirements: ['Fire Investigation Training', 'Background Check'],
      processingTime: '4-6 weeks',
      validityPeriod: '12 months',
      issueDate: new Date(),
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      status: 'active',
      userId: 1,
    },
  ]);
  console.log('Sample licenses seeded!');
  process.exit(0);
}

seedLicenses(); 