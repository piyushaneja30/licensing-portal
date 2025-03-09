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

export type LicenseApplication = {
  id: string;
  licenseTypeId: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submissionDate?: string;
  lastUpdated: string;
  expiryDate?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    ssn: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  education: {
    institution: string;
    degree: string;
    major: string;
    graduationDate: string;
    gpa?: number;
  }[];
  experience: {
    employer: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    responsibilities: string;
    supervisor: {
      name: string;
      phone: string;
      email: string;
    };
  }[];
  certifications: {
    name: string;
    issuingBody: string;
    issueDate: string;
    expiryDate?: string;
    certificateNumber: string;
  }[];
  references: {
    name: string;
    relationship: string;
    company: string;
    phone: string;
    email: string;
    yearsKnown: number;
  }[];
  documents: {
    type: string;
    name: string;
    url: string;
    uploadDate: string;
    status: 'pending' | 'approved' | 'rejected';
    comments?: string;
  }[];
  payment: {
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
    paymentDate?: string;
    paymentMethod?: string;
  };
  reviewNotes?: {
    date: string;
    reviewer: string;
    note: string;
    status: string;
  }[];
};

export type License = {
  id: string;
  licenseNumber: string;
  licenseTypeId: string;
  userId: string;
  status: LicenseStatus;
  issueDate: string;
  expiryDate: string;
  lastRenewalDate?: string;
  applicationId: string;
  documents: {
    type: string;
    url: string;
    uploadDate: string;
  }[];
  verificationUrl: string;
  qrCode: string;
  history: {
    date: string;
    action: string;
    performedBy: string;
    notes?: string;
  }[];
};

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