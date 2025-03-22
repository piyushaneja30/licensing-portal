import mongoose from 'mongoose';

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
    required: true
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

export const License = mongoose.model('License', licenseSchema); 