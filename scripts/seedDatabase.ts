import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface LicenseData {
  id: string;
  name: string;
  description: string;
  fee: number;
  category: string;
  requirements: string[];
  processingTime: string;
  validityPeriod: string;
}

// Define the license schema
const licenseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Healthcare',
      'Engineering',
      'Construction',
      'Real Estate',
      'Personal Services',
      'Business',
      'Sports & Entertainment',
      'Social Services',
      'Investigation & Security',
      'Other'
    ]
  },
  requirements: [{
    type: String
  }],
  processingTime: {
    type: String
  },
  validityPeriod: {
    type: String
  }
});

// Create the License model
const License = mongoose.models.License || mongoose.model('License', licenseSchema);

const generateLicenseId = (name: string): string => {
  // Create a hash of the name to ensure uniqueness
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Get the first 3 characters of the name (converted to uppercase)
  const prefix = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
  
  // Get the absolute value of the hash and convert to string, padded to 3 digits
  const suffix = Math.abs(hash).toString().padStart(3, '0').substring(0, 3);
  
  return `${prefix}${suffix}`;
};

const getLicenseCategory = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('doctor') || lowerName.includes('physician') || 
      lowerName.includes('medical') || lowerName.includes('nurse') || 
      lowerName.includes('dental') || lowerName.includes('dentist') ||
      lowerName.includes('audiologist') || lowerName.includes('pharmacist') ||
      lowerName.includes('therapist') || lowerName.includes('psychologist') ||
      lowerName.includes('hygienist') || lowerName.includes('healthcare')) {
    return 'Healthcare';
  }
  
  if (lowerName.includes('engineer') || lowerName.includes('surveyor') ||
      lowerName.includes('architect') || lowerName.includes('electrical')) {
    return 'Engineering';
  }
  
  if (lowerName.includes('contractor') || lowerName.includes('builder') ||
      lowerName.includes('construction')) {
    return 'Construction';
  }
  
  if (lowerName.includes('broker') || lowerName.includes('realtor') || 
      lowerName.includes('estate') || lowerName.includes('appraiser') ||
      lowerName.includes('salesperson')) {
    return 'Real Estate';
  }
  
  if (lowerName.includes('barber') || lowerName.includes('cosmetology') || 
      lowerName.includes('salon') || lowerName.includes('beauty') ||
      lowerName.includes('hair') || lowerName.includes('massage') ||
      lowerName.includes('piercing') || lowerName.includes('tattoo')) {
    return 'Personal Services';
  }
  
  if (lowerName.includes('business') || lowerName.includes('corporation') || 
      lowerName.includes('llc') || lowerName.includes('partnership') ||
      lowerName.includes('company') || lowerName.includes('provider')) {
    return 'Business';
  }
  
  if (lowerName.includes('sports') || lowerName.includes('athlete') || 
      lowerName.includes('boxing') || lowerName.includes('martial') ||
      lowerName.includes('wrestling') || lowerName.includes('trainer')) {
    return 'Sports & Entertainment';
  }
  
  if (lowerName.includes('social') || lowerName.includes('counselor') ||
      lowerName.includes('therapist')) {
    return 'Social Services';
  }
  
  if (lowerName.includes('security') || lowerName.includes('investigator') ||
      lowerName.includes('agency')) {
    return 'Investigation & Security';
  }
  
  return 'Other';
};

const getBasicRequirements = (category: string): string[] => {
  const commonRequirements = ['Background check', 'Application fee payment'];
  
  switch (category) {
    case 'Healthcare':
      return [
        ...commonRequirements,
        'Professional degree',
        'Board certification',
        'Clinical experience',
        'Professional liability insurance'
      ];
    case 'Engineering':
      return [
        ...commonRequirements,
        'Engineering degree',
        'Professional experience',
        'PE exam completion',
        'References'
      ];
    case 'Personal Services':
      return [
        ...commonRequirements,
        'Training program completion',
        'State board examination',
        'Health and safety certification',
        'Liability insurance'
      ];
    case 'Real Estate':
      return [
        ...commonRequirements,
        'Pre-licensing education',
        'State exam completion',
        'Sponsoring broker',
        'Continuing education'
      ];
    default:
      return commonRequirements;
  }
};

const getFee = (category: string): number => {
  const baseFees: { [key: string]: number } = {
    'Healthcare': 500,
    'Engineering': 400,
    'Construction': 350,
    'Real Estate': 300,
    'Personal Services': 200,
    'Business': 400,
    'Sports & Entertainment': 250,
    'Social Services': 300,
    'Investigation & Security': 350,
    'Other': 250
  };
  
  return baseFees[category] || 250;
};

const getProcessingTime = (category: string): string => {
  const times: { [key: string]: string } = {
    'Healthcare': '6-8 weeks',
    'Engineering': '4-6 weeks',
    'Construction': '3-4 weeks',
    'Real Estate': '2-3 weeks',
    'Personal Services': '2-3 weeks',
    'Business': '3-4 weeks',
    'Sports & Entertainment': '2-3 weeks',
    'Social Services': '4-6 weeks',
    'Investigation & Security': '4-6 weeks',
    'Other': '3-4 weeks'
  };
  
  return times[category] || '3-4 weeks';
};

const getValidityPeriod = (category: string): string => {
  const periods: { [key: string]: string } = {
    'Healthcare': '24 months',
    'Engineering': '24 months',
    'Construction': '24 months',
    'Real Estate': '24 months',
    'Personal Services': '12 months',
    'Business': '12 months',
    'Sports & Entertainment': '12 months',
    'Social Services': '24 months',
    'Investigation & Security': '12 months',
    'Other': '12 months'
  };
  
  return periods[category] || '12 months';
};

const createLicenseData = (name: string): LicenseData => {
  const category = getLicenseCategory(name);
  const id = generateLicenseId(name);
  
  return {
    id,
    name,
    description: `License to practice as a ${name.toLowerCase()}`,
    fee: getFee(category),
    category,
    requirements: getBasicRequirements(category),
    processingTime: getProcessingTime(category),
    validityPeriod: getValidityPeriod(category)
  };
};

const ALL_LICENSES = [
  "Acupuncturist",
  "Advanced Macro Social Worker",
  "Agency Fire Investigator Employee",
  "Agency Investigator Employee",
  "Anesthesiologist Assistant",
  "Anesthesiologist Assistant Temp",
  "Appraisal Management Company",
  "Apprenticeship",
  "Architect",
  "Architectural Corporation",
  "Assistant Behavior Analyst",
  "Assistant Physician",
  "Athlete Agent",
  "Athletic Trainer",
  "Athletic-Physician",
  "Athletic-Timekeeper",
  "Audiologist",
  "Audiologist Aide",
  "Audiologist Provisional",
  "Auricular Detox Technician",
  "Baccalaureate Social Worker",
  "Barber",
  "Barber Apprentice",
  "Barber Establishment",
  "Barber Instructor",
  "Barber Student",
  "Beauty/Barber Establishment",
  "Behavior Analyst",
  "Body Piercer",
  "Body Piercing Establishment",
  "Boxer's Federal Identification Card",
  "Boxing Contestant",
  "Boxing Judge",
  "Boxing Matchmaker",
  "Boxing Promoter",
  "Boxing Referee",
  "Boxing Second",
  "Brander",
  "Brander and Body Piercer",
  "Branding & Body Piercing Establishment",
  "Branding Establishment",
  "Broker",
  "Broker Associate",
  "Broker Officer",
  "Broker Partner",
  "Broker Salesperson",
  "Certified Public Accountant(CPA)",
  "Chiropractic Physician",
  "Chiropractic Physician Temp",
  "Class CA - Hairdressing and Manicuring",
  "Class CH - Hairdresser",
  "Class E - Estheticians",
  "Class MO - Manicurist",
  "Clinical Social Worker",
  "COSBAR Apprentice Supervisor",
  "Cosmetologist/All-Barber",
  "Cosmetologist/Hair-Barber",
  "Cosmetology Apprentice",
  "Cosmetology Establishment",
  "Cosmetology Instructor",
  "Cosmetology Instructor Trainee",
  "Cosmetology Student",
  "Cosmetology/Barber Instructor",
  "CPA Partnership",
  "CPA Prof. Corporation",
  "CPA Sole Proprietorship",
  "CPA-Certificate Holder",
  "Dental Assistant Nitrous Permit",
  "Dental Faculty Permit",
  "Dental Hygienist",
  "Dental Specialist",
  "Dentist",
  "Dietitian",
  "Drug Distributor",
  "Drug Distributor Registrant",
  "Drug Outsourcer",
  "DSGA Permit",
  "DSGA Site Certificate",
  "EF-Fixed Prosthodontics",
  "EF-Orthodontics",
  "EF-Removable Prosthodontics",
  "EF-Restorative I",
  "EF-Restorative II",
  "Electrical Contractor",
  "Electrical Employer",
  "Embalmer",
  "Embalmer Apprentice",
  "Embalmer Practicum",
  "EMS Permit",
  "EMS Site Certificate",
  "Endowed Care Cemetery",
  "Engineer Intern",
  "Engineering Corporation",
  "Exempt",
  "FQHC Registration",
  "Funeral Director",
  "Funeral Director Apprentice",
  "Funeral Director Limited",
  "Funeral Establishment",
  "Geologist",
  "Geologist - Temporary",
  "Geologist Registrant in Training",
  "Geology Exam Applicant",
  "Hair Braiding",
  "Hearing Instrument Specialist",
  "Inactive Veterinarian",
  "Inactive Veterinary Technician",
  "Interior Designer",
  "Intern Pharmacist",
  "Interpreter",
  "Interpreter - Temporary",
  "Land Surveying Corp",
  "Land Surveyor-Intern",
  "Landscape Architect Corp",
  "Limited Liability Company",
  "Limited Liability Partner",
  "Marital & Family Therapist",
  "Martial Arts Amateur Contestant",
  "Martial Arts Amateur Promoter",
  "Martial Arts Contestant",
  "Martial Arts Judge",
  "Martial Arts Matchmaker",
  "Martial Arts Promoter",
  "Martial Arts Referee",
  "Martial Arts Second",
  "Massage Therapist",
  "Massage Therapy Business",
  "Massage Therapy Student",
  "Master Social Worker",
  "Medical Physician/Surgeon (M.D.)",
  "Medical Physician/Surgeon (M.D.) Conditional",
  "Medical Physician/Surgeon (M.D.) Contiguous",
  "Medical Physician/Surgeon (M.D.) Limited",
  "Medical Physician/Surgeon (M.D.) Temp",
  "MMA National Identification Card",
  "NFP Corporation Permit",
  "Non Endowed Care Cemetery",
  "Nursing",
  "Occupational Therapist",
  "Occupational Therapist Limited Permit",
  "Occupational Therapy Assistant",
  "Occupational Therapy Assistant Limited Permit",
  "Optometrist",
  "Osteo Physician/Surgeon (D.O.)",
  "Osteo Physician/Surgeon (D.O.) Conditional",
  "Osteo Physician/Surgeon (D.O.) Contiguous",
  "Osteo Physician/Surgeon (D.O.) Limited",
  "Osteo Physician/Surgeon (D.O.) Temp",
  "PED Site Certificate",
  "PED-MS Permit",
  "Perfusionist",
  "Perfusionist Provisional",
  "Pharmacist",
  "Pharmacy",
  "Pharmacy Technician",
  "Physical Therapist",
  "Physical Therapist Assistant",
  "Physical Therapist Assistant Temp",
  "Physical Therapist One Year Temp",
  "Physical Therapist Temp",
  "Physician Assistant",
  "Physician Assistant Temp",
  "PMS Permit",
  "PMS Site Certificate",
  "Podiatrist",
  "Podiatrist/Ankle",
  "Pre-licensure Petition",
  "Preneed Agent",
  "Preneed Agent Funeral Director",
  "Preneed Provider",
  "Preneed Seller",
  "Private Fire Investigator",
  "Private Fire Investigator Agency Branch",
  "Private Fire Investigator Agency Primary",
  "Private Investigator",
  "Private Investigator Agency Branch",
  "Private Investigator Agency Primary",
  "Prof. Corp. Broker Salesperson",
  "Prof. Corp. Salesperson",
  "Professional Counselor",
  "Professional Engineer",
  "Professional Land Surveyor",
  "Professional Landscape Architect",
  "Provisional Assistant Behavior Analyst",
  "Provisional Behavior Analyst",
  "Provisional License Professional Counselor",
  "Provisional License Psychologist",
  "Provisional Marital and Family Therapist",
  "Provisional Massage Therapist",
  "Provisional Veterinarian",
  "Psychologist",
  "Psychologist - Temporary",
  "Real Estate Association",
  "Real Estate Corporation",
  "Real Estate Partnership",
  "Real Estate School",
  "Respiratory Care Practitioner",
  "Respiratory Temporary Educational Permit",
  "Respiratory Temporary Permit",
  "Salesperson",
  "Satellite Classroom",
  "School of Barbering",
  "School of Cosmetology",
  "School of Cosmetology & Barbering",
  "Speech Language Pathologist",
  "Speech Language Pathologist Aide",
  "Speech Language Pathologist Assistant",
  "Speech Language Pathologist Provisional",
  "Speech Language Pathologist-Audiologist Combined",
  "State Certified General Appraiser Trainee",
  "State Certified General Real Estate Appraiser",
  "State Certified Residential Appraiser Trainee",
  "State Certified Residential Real Estate Appraiser",
  "State Licensed Appraiser Trainee",
  "State Licensed Real Estate Appraiser",
  "Tattooing & Body Piercing Establishment",
  "Tattooing & Branding Establishment",
  "Tattooing Establishment",
  "Tattooing, Branding & Body Piercing Establishment",
  "Tattooist",
  "Tattooist and Body Piercer",
  "Tattooist and Brander",
  "Tattooist, Body Piercer and Brander",
  "Teaching License Dentist",
  "Temp Funeral Director",
  "Temp Permit - BEHIS",
  "Temp. Drug Outsourcer",
  "Temp. Pharmacist",
  "Temporary Drug Distributor",
  "Temporary Podiatrist",
  "Temporary Student Permit",
  "Third-Party Logistics Provider",
  "Veterinarian",
  "Veterinary Facility",
  "Veterinary Technician",
  "Visiting Professor (D.O.)",
  "Visiting Professor (M.D.)",
  "Volunteer Dental Hygienist",
  "Volunteer Dentist",
  "Wrestling Contestant",
  "Wrestling Matchmaker",
  "Wrestling Promoter",
  "Wrestling Referee",
  "Wrestling Second"
];

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing licenses
    await License.deleteMany({});
    console.log('Cleared existing licenses');

    // Create license data
    const licensesData = ALL_LICENSES.map(createLicenseData);

    // Insert licenses
    await License.insertMany(licensesData);
    console.log('Successfully seeded database with licenses');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 