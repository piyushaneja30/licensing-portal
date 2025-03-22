import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IProfile {
  firstName: string;
  lastName: string;
  phone: string;
  profession?: string;
  licenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  accountType: 'individual' | 'business';
  profile: IProfile;
}

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

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
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  accountType: {
    type: String,
    enum: ['individual', 'business'],
    default: 'individual',
  },
  profile: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    specialization: {
      type: String,
    },
    yearsOfExperience: {
      type: Number,
    }
  }
}, {
  timestamps: true,
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema); 