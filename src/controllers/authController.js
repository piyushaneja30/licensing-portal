import { User } from '../models/User.js';
import { Session } from '../models/Session.js';

export const authController = {
  // Register a new user
  signup: async (req, res) => {
    try {
      const { accountType } = req.body;
      
      if (!['individual', 'business'].includes(accountType)) {
        return res.status(400).json({ message: 'Invalid account type' });
      }

      const { email, password, firstName, lastName, phoneNumber } = req.body;

      // Validate required fields
      if (!email || !password || !firstName || !lastName || !phoneNumber) {
        return res.status(400).json({ 
          message: 'Missing required fields',
          errors: {
            email: !email ? 'Email is required' : null,
            password: !password ? 'Password is required' : null,
            firstName: !firstName ? 'First name is required' : null,
            lastName: !lastName ? 'Last name is required' : null,
            phoneNumber: !phoneNumber ? 'Phone number is required' : null
          }
        });
      }

      // Validate password strength
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'Password is not strong enough',
          errors: {
            password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          }
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
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
          return res.status(400).json({
            message: 'Missing required professional information',
            errors: {
              profession: !profession ? 'Profession is required' : null,
              specialization: !specialization ? 'Specialization is required' : null,
              yearsOfExperience: !yearsOfExperience ? 'Years of experience is required' : null
            }
          });
        }

        // Validate years of experience
        const years = parseInt(yearsOfExperience, 10);
        if (isNaN(years) || years < 0 || years > 100) {
          return res.status(400).json({
            message: 'Invalid years of experience',
            errors: {
              yearsOfExperience: 'Years of experience must be a number between 0 and 100'
            }
          });
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
          return res.status(400).json({
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
        }

        // Validate business address
        if (!businessAddress || !businessAddress.street || !businessAddress.city || 
            !businessAddress.state || !businessAddress.zipCode || !businessAddress.country) {
          return res.status(400).json({
            message: 'Missing required business address information',
            errors: {
              'businessAddress.street': !businessAddress?.street ? 'Street address is required' : null,
              'businessAddress.city': !businessAddress?.city ? 'City is required' : null,
              'businessAddress.state': !businessAddress?.state ? 'State is required' : null,
              'businessAddress.zipCode': !businessAddress?.zipCode ? 'ZIP code is required' : null,
              'businessAddress.country': !businessAddress?.country ? 'Country is required' : null
            }
          });
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

      // Create and save user
      const user = new User(userData);
      await user.save();
      
      // Generate token
      const token = user.generateAuthToken();

      // Create session
      const session = new Session({
        userId: user._id,
        token,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      });
      await session.save();

      res.status(201).json({
        user: user.toJSON(),
        token
      });
    } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation error',
          errors: Object.keys(error.errors).reduce((acc, key) => {
            acc[key] = error.errors[key].message;
            return acc;
          }, {})
        });
      }
      res.status(500).json({ 
        message: 'Error creating user',
        error: error.message 
      });
    }
  },

  // Get all users (admin only)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).select('-password');
      res.json(users);
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate token
      const token = user.generateAuthToken();

      // Create session
      const session = new Session({
        userId: user._id,
        token,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      });
      await session.save();

      // Return user data and token
      res.json({
        user: user.toJSON(),
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  },

  // Get current user
  getCurrentUser: async (req, res) => {
    try {
      // Update last activity
      await Session.findOneAndUpdate(
        { token: req.headers.authorization?.replace('Bearer ', '') },
        { lastActivity: new Date() }
      );
      
      res.json(req.user);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Error fetching user data' });
    }
  },

  // Logout user
  logout: async (req, res) => {
    try {
      // Invalidate the current session
      await Session.findOneAndUpdate(
        { token: req.headers.authorization?.replace('Bearer ', '') },
        { isValid: false }
      );
      
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Error logging out' });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const {
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        company,
        title,
        bio,
        profession,
        licenseNumber,
        specialization,
        yearsOfExperience
      } = req.body;

      // Build profile update object
      const profileUpdate = {};
      if (firstName) profileUpdate.firstName = firstName;
      if (lastName) profileUpdate.lastName = lastName;
      if (phone) profileUpdate.phone = phone;
      if (address) profileUpdate.address = address;
      if (city) profileUpdate.city = city;
      if (state) profileUpdate.state = state;
      if (zipCode) profileUpdate.zipCode = zipCode;
      if (company) profileUpdate.company = company;
      if (title) profileUpdate.title = title;
      if (bio) profileUpdate.bio = bio;
      if (profession) profileUpdate.profession = profession;
      if (licenseNumber) profileUpdate.licenseNumber = licenseNumber;
      if (specialization) profileUpdate.specialization = specialization;
      if (yearsOfExperience !== undefined) profileUpdate.yearsOfExperience = yearsOfExperience;

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { profile: profileUpdate } },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  }
}; 