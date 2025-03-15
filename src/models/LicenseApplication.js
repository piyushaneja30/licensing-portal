import mongoose from 'mongoose';

const licenseApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  licenseType: {
    type: String,
    required: true,
    enum: ['business', 'professional']
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
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    graduationYear: Number,
    gpa: Number
  }],
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  submittedDate: Date,
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastModified on every save
licenseApplicationSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

export const LicenseApplication = mongoose.model('LicenseApplication', licenseApplicationSchema); 