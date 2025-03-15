import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  accountType: {
    type: String,
    enum: ['individual', 'business'],
    required: true
  },
  profile: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    // Individual specific fields
    profession: {
      type: String,
      required: function() {
        return this.accountType === 'individual';
      },
      trim: true,
    },
    licenseNumber: {
      type: String,
      trim: true,
      sparse: true, // Allows null/undefined values
    },
    specialization: {
      type: String,
      required: function() {
        return this.accountType === 'individual';
      },
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: function() {
        return this.accountType === 'individual';
      },
      min: 0,
    },
    // Business specific fields
    companyName: {
      type: String,
      required: function() {
        return this.accountType === 'business';
      },
      trim: true,
    },
    industryType: {
      type: String,
      required: function() {
        return this.accountType === 'business';
      },
      enum: [
        'Healthcare',
        'Manufacturing',
        'Technology',
        'Finance',
        'Education',
        'Construction',
        'Retail',
        'Transportation',
        'Energy',
        'Other'
      ],
    },
    companySize: {
      type: String,
      required: function() {
        return this.accountType === 'business';
      },
      enum: [
        '1-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '501-1000 employees',
        '1000+ employees'
      ],
    },
    businessType: {
      type: String,
      required: function() {
        return this.accountType === 'business';
      },
      enum: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship', 'Other'],
    },
    registrationNumber: {
      type: String,
      trim: true,
      required: function() {
        return this.accountType === 'business';
      },
    },
    jobTitle: {
      type: String,
      required: function() {
        return this.accountType === 'business';
      },
      trim: true,
    },
    businessAddress: {
      street: {
        type: String,
        required: function() {
          return this.accountType === 'business';
        },
        trim: true,
      },
      city: {
        type: String,
        required: function() {
          return this.accountType === 'business';
        },
        trim: true,
      },
      state: {
        type: String,
        required: function() {
          return this.accountType === 'business';
        },
        trim: true,
      },
      zipCode: {
        type: String,
        required: function() {
          return this.accountType === 'business';
        },
        trim: true,
      },
      country: {
        type: String,
        required: function() {
          return this.accountType === 'business';
        },
        trim: true,
      }
    }
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Generate auth token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { userId: this._id.toString() },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = mongoose.model('User', userSchema); 