import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUserDocument } from '../models/User.js';

export const authController = {
  signup: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, firstName, lastName, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Email already registered' });
        return;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user: IUserDocument = new User({
        email,
        password: hashedPassword,
        profile: {
          firstName,
          lastName,
          phone,
        }
      });

      await user.save();

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        user: {
          id: user._id,
          email: user.email,
          profile: {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
          }
        },
        token,
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email }) as IUserDocument | null;
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      // Check password
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        user: {
          id: user._id,
          email: user.email,
          profile: {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
          }
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  },

  getCurrentUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.user?.id).select('-password') as IUserDocument | null;
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Error fetching user data' });
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      // In a real application, you might want to invalidate the token
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Error logging out' });
    }
  },

  updateProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const {
        firstName,
        lastName,
        phone,
        accountType,
        profession,
        licenseNumber,
        specialization,
        yearsOfExperience
      } = req.body;

      const updateData: any = {};

      // Update profile fields
      const profileUpdate: any = {};
      if (firstName) profileUpdate.firstName = firstName;
      if (lastName) profileUpdate.lastName = lastName;
      if (phone) profileUpdate.phone = phone;
      if (profession) profileUpdate.profession = profession;
      if (licenseNumber) profileUpdate.licenseNumber = licenseNumber;
      if (specialization) profileUpdate.specialization = specialization;
      if (yearsOfExperience !== undefined) profileUpdate.yearsOfExperience = yearsOfExperience;

      // Only add profile update if there are changes
      if (Object.keys(profileUpdate).length > 0) {
        updateData['profile'] = profileUpdate;
      }

      // Update account type if provided
      if (accountType) {
        updateData.accountType = accountType;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  },
}; 