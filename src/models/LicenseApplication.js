import mongoose from 'mongoose';
import { LICENSE_TYPES } from '../constants/licenseTypes.js';

const licenseApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicationNumber: {
    type: String,
    unique: true,
    default: function() {
      const licenseTypeCode = this.licenseTypeId === 'PE001' ? 'PE' : 'EI';
      return `APP${new Date().getFullYear()}-${licenseTypeCode}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    }
  },
  licenseTypeId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
    default: 'draft'
  },
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    dateOfBirth: Date,
    ssn: String,
    gender: String,
    citizenship: String,
    immigrationStatus: String,
    immigrationNumber: String
  },
  education: [{
    institution: String,
    degree: String,
    graduationYear: Number,
    field: String,
    gpa: Number,
    credits: Number,
    major: String,
    minor: String,
    honors: String,
    thesis: String
  }],
  workExperience: [{
    employer: String,
    position: String,
    startDate: Date,
    endDate: Date,
    responsibilities: String,
    supervisor: String,
    supervisorEmail: String,
    supervisorPhone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  }],
  references: [{
    name: String,
    email: String,
    phone: String,
    relationship: String,
    position: String,
    institution: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    yearsKnown: Number
  }],
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  legal: {
    criminalRecord: Boolean,
    criminalDetails: String,
    disciplinaryAction: Boolean,
    disciplinaryDetails: String,
    legalDeclaration: Boolean,
    backgroundCheckConsent: Boolean,
    fingerprintConsent: Boolean
  },
  additionalInfo: {
    specialAccommodations: String,
    languages: [String],
    certifications: [{
      name: String,
      issuer: String,
      dateIssued: Date,
      expirationDate: Date
    }],
    publications: [{
      title: String,
      publisher: String,
      date: Date,
      url: String
    }],
    professionalMemberships: [{
      organization: String,
      membershipNumber: String,
      startDate: Date,
      endDate: Date
    }]
  },
  submissionDate: Date,
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  reviewNotes: [{
    date: Date,
    reviewer: String,
    note: String,
    status: String
  }]
}, {
  timestamps: true
});

// Update lastUpdated on every save
licenseApplicationSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

export const LicenseApplication = mongoose.model('LicenseApplication', licenseApplicationSchema); 