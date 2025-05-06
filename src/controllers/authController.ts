import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authController = {
  signup: async (req: Request, res: Response): Promise<void> => {
    try {
      const { accountType } = req.body;
      
      if (!['individual', 'business'].includes(accountType)) {
        res.status(400).json({ message: 'Invalid account type' });
        return;
      }

      const { email, password, firstName, lastName, phoneNumber } = req.body;

      // Validate required fields
      if (!email || !password || !firstName || !lastName || !phoneNumber) {
        res.status(400).json({ 
          message: 'Missing required fields',
          errors: {
            email: !email ? 'Email is required' : null,
            password: !password ? 'Password is required' : null,
            firstName: !firstName ? 'First name is required' : null,
            lastName: !lastName ? 'Last name is required' : null,
            phoneNumber: !phoneNumber ? 'Phone number is required' : null
          }
        });
        return;
      }

      // Validate password strength
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        res.status(400).json({
          message: 'Password is not strong enough',
          errors: {
            password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          }
        });
        return;
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'Email already registered' });
        return;
      }

      // Create base user object
      const userData = {
        email,
        password,
        accountType,
        profile: {
          firstName,
          lastName,
          phone: phoneNumber,
        }
      };

      // Add type-specific fields
      if (accountType === 'individual') {
        const { profession, specialization, yearsOfExperience, licenseNumber } = req.body;
        
        // Validate individual-specific fields
        if (!profession || !specialization || !yearsOfExperience) {
          res.status(400).json({
            message: 'Missing required professional information',
            errors: {
              profession: !profession ? 'Profession is required' : null,
              specialization: !specialization ? 'Specialization is required' : null,
              yearsOfExperience: !yearsOfExperience ? 'Years of experience is required' : null
            }
          });
          return;
        }

        // Validate years of experience
        const years = parseInt(yearsOfExperience, 10);
        if (isNaN(years) || years < 0 || years > 100) {
          res.status(400).json({
            message: 'Invalid years of experience',
            errors: {
              yearsOfExperience: 'Years of experience must be a number between 0 and 100'
            }
          });
          return;
        }

        Object.assign(userData.profile, {
          profession,
          specialization,
          yearsOfExperience: years,
          licenseNumber
        });
      } else {
        // Business type
        const {
          companyName,
          industryType,
          companySize,
          businessType,
          registrationNumber,
          jobTitle,
          businessAddress
        } = req.body;

        // Validate business-specific fields
        if (!companyName || !industryType || !companySize || !businessType || !registrationNumber || !jobTitle) {
          res.status(400).json({
            message: 'Missing required business information',
            errors: {
              companyName: !companyName ? 'Company name is required' : null,
              industryType: !industryType ? 'Industry type is required' : null,
              companySize: !companySize ? 'Company size is required' : null,
              businessType: !businessType ? 'Business type is required' : null,
              registrationNumber: !registrationNumber ? 'Registration number is required' : null,
              jobTitle: !jobTitle ? 'Job title is required' : null
            }
          });
          return;
        }

        // Validate business address
        if (!businessAddress || !businessAddress.street || !businessAddress.city || 
            !businessAddress.state || !businessAddress.zipCode || !businessAddress.country) {
          res.status(400).json({
            message: 'Missing required business address information',
            errors: {
              'businessAddress.street': !businessAddress?.street ? 'Street address is required' : null,
              'businessAddress.city': !businessAddress?.city ? 'City is required' : null,
              'businessAddress.state': !businessAddress?.state ? 'State is required' : null,
              'businessAddress.zipCode': !businessAddress?.zipCode ? 'ZIP code is required' : null,
              'businessAddress.country': !businessAddress?.country ? 'Country is required' : null
            }
          });
          return;
        }

        Object.assign(userData.profile, {
          companyName,
          industryType,
          companySize,
          businessType,
          registrationNumber,
          jobTitle,
          businessAddress: {
            street: businessAddress.street,
            city: businessAddress.city,
            state: businessAddress.state,
            zipCode: businessAddress.zipCode,
            country: businessAddress.country
          }
        });
      }

      // Create user
      const user = await User.create(userData);
      
      // Generate token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          accountType: user.accountType,
          profile: user.profile,
          role: user.role,
        },
        token
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ 
        message: 'Error creating user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(users);
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      console.log('[LOGIN] Email:', email, '| Password:', password);

      // Validate input
      if (!email || !password) {
        console.log('[LOGIN] Missing email or password');
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log('[LOGIN] User not found for email:', email);
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      console.log('[LOGIN] Password valid:', isPasswordValid);
      if (!isPasswordValid) {
        console.log('[LOGIN] Invalid password for user:', email);
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Return user data and token
      console.log('[LOGIN] Login successful for user:', email);
      res.json({
        user: {
          id: user.id,
          email: user.email,
          accountType: user.accountType,
          profile: user.profile,
          role: user.role,
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  },

  getCurrentUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findByPk(req.user?.id, {
        attributes: { exclude: ['password'] }
      });
      
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
        profession,
        licenseNumber,
        specialization,
        yearsOfExperience
      } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Update user fields
      await user.update({
        profile: {
          ...user.profile,
          firstName: firstName || user.profile.firstName,
          lastName: lastName || user.profile.lastName,
          phone: phone || user.profile.phone,
          profession: profession || user.profile.profession,
          licenseNumber: licenseNumber || user.profile.licenseNumber,
          specialization: specialization || user.profile.specialization,
          yearsOfExperience: yearsOfExperience !== undefined ? yearsOfExperience : user.profile.yearsOfExperience
        }
      });

      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });

      res.json(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  },
}; 