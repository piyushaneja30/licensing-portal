import mongoose from 'mongoose';

const licenseApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String
  },
  education: [{
    institution: String,
    degree: String,
    graduationYear: Number,
    field: String
  }],
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: Date,
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
});

export const LicenseApplication = mongoose.model('LicenseApplication', licenseApplicationSchema); 