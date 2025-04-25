export type LicenseStatus = 'active' | 'pending' | 'expired' | 'revoked';

export type LicenseType = {
  id: string;
  code: string;
  name: string;
  description: string;
  requirements: string[];
  fee: number;
  processingTime: string;
  validityPeriod: number; // in months
  renewalPeriod: number; // in months before expiry
};

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: Date;
  ssn: string;
  gender: string;
  citizenship: string;
  immigrationStatus: string;
  immigrationNumber: string;
}

export interface Education {
  institution: string;
  degree: string;
  graduationYear: number;
  field: string;
  gpa: number;
  credits: number;
  major: string;
  minor: string;
  honors: string;
  thesis: string;
}

export interface WorkExperience {
  employer: string;
  position: string;
  startDate: Date;
  endDate: Date;
  responsibilities: string;
  supervisor: string;
  supervisorEmail: string;
  supervisorPhone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export interface LicenseApplication {
  id?: string;      // For client-side ID
  _id?: string;     // For MongoDB ID
  applicationNumber: string;
  userId: string;
  licenseTypeId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedDate: string;
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  documents: Document[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface License {
  id: string;
  licenseNumber: string;
  userId: string;
  type: string;
  status: 'active' | 'expired' | 'suspended' | 'revoked';
  issuedDate: string;
  expiryDate: string;
  applicationId: string;
  createdAt: string;
  updatedAt: string;
}

// Predefined license types
export const LICENSE_TYPES: Record<string, LicenseType> = {
  ENGINEER_INTERN: {
    id: 'EI001',
    code: 'EI',
    name: 'Engineer Intern',
    description: 'Entry-level engineering certification for recent graduates',
    requirements: [
      'Bachelor\'s degree in Engineering from an ABET-accredited program',
      'Passing score on the Fundamentals of Engineering (FE) exam',
      'Clean criminal record',
      'Three professional references',
    ],
    fee: 150.00,
    processingTime: '4-6 weeks',
    validityPeriod: 48, // 4 years
    renewalPeriod: 6,
  },
  PROFESSIONAL_ENGINEER: {
    id: 'PE001',
    code: 'PE',
    name: 'Professional Engineer',
    description: 'Full professional engineering license',
    requirements: [
      'Valid Engineer Intern certification',
      '4 years of progressive engineering experience',
      'Passing score on the Professional Engineering (PE) exam',
      'Five professional references',
    ],
    fee: 350.00,
    processingTime: '6-8 weeks',
    validityPeriod: 24, // 2 years
    renewalPeriod: 3,
  },
  // Add more license types as needed
}; 