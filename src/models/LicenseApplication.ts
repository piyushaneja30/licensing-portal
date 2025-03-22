import mongoose from 'mongoose';
import { LICENSE_TYPES } from '../constants/licenseTypes.js';

const licenseApplicationSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      return `APP-${year}-${random}`;
    }
  },
  userId: {
    type: String,
    required: true
  },
  licenseTypeId: {
    type: String,
    required: true
  },
  personalInfo: {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipCode: { type: String, default: null }
  },
  education: [{
    institution: { type: String, default: null },
    degree: { type: String, default: null },
    graduationYear: { type: Number, default: null },
    field: { type: String, default: null }
  }],
  documents: [{
    name: { type: String, default: null },
    type: { type: String, default: null },
    url: { type: String, default: null },
    uploadDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
    default: 'draft'
  },
  submissionDate: { type: Date, default: null },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  reviewNotes: [{
    date: { type: Date, default: null },
    reviewer: { type: String, default: null },
    note: { type: String, default: null },
    status: { type: String, default: null }
  }]
});

// Create the model
export const LicenseApplication = mongoose.model('LicenseApplication', licenseApplicationSchema); 