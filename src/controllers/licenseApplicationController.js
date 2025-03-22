import { LicenseApplication } from '../models/LicenseApplication.js';

export const licenseApplicationController = {
  // Create a new application
  create: async (req, res) => {
    try {
      console.log('Creating new application with data:', req.body);
      console.log('User from request:', req.user);

      if (!req.user || !req.user.id) {
        console.error('No user found in request');
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Create application instance
      const applicationData = {
        userId: req.user.id,
        licenseTypeId: req.body.licenseTypeId,
        status: 'draft',
        personalInfo: req.body.personalInfo || {},
        education: req.body.education || [],
        documents: req.body.documents || []
      };

      console.log('Creating application with data:', applicationData);
      
      const application = new LicenseApplication(applicationData);
      console.log('Created application instance:', application);

      // Save the application
      const savedApplication = await application.save();
      console.log('Application saved successfully:', savedApplication);
      
      res.status(201).json(savedApplication);
    } catch (error) {
      console.error('Detailed error creating application:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        errors: error.errors
      });
      res.status(500).json({ 
        message: 'Error creating application', 
        error: error.message,
        details: error.errors
      });
    }
  },

  // Get all applications (public endpoint)
  getAllApplications: async (req, res) => {
    try {
      const applications = await LicenseApplication.find()
        .populate('userId', 'email profile')
        .sort({ createdAt: -1 });
      
      res.json(applications);
    } catch (error) {
      console.error('Error fetching all applications:', error);
      res.status(500).json({ message: 'Error fetching applications' });
    }
  },

  // Get user's applications
  getUserApplications: async (req, res) => {
    try {
      console.log('Getting applications for user:', req.user);
      if (!req.user || !req.user.id) {
        console.error('No user found in request');
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const applications = await LicenseApplication.find({ userId: req.user.id })
        .sort({ createdAt: -1 });
      
      console.log('Found applications:', applications);
      res.json(applications);
    } catch (error) {
      console.error('Error fetching user applications:', error);
      res.status(500).json({ message: 'Error fetching applications' });
    }
  },

  // Get application by ID
  getById: async (req, res) => {
    try {
      const application = await LicenseApplication.findOne({
        _id: req.params.id,
        userId: req.user.id
      });
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error fetching application:', error);
      res.status(500).json({ message: 'Error fetching application' });
    }
  },

  // Update personal info
  updatePersonalInfo: async (req, res) => {
    try {
      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { $set: { personalInfo: req.body } },
        { new: true }
      );
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error updating personal info:', error);
      res.status(500).json({ message: 'Error updating personal info' });
    }
  },

  // Update education
  updateEducation: async (req, res) => {
    try {
      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { $set: { education: req.body } },
        { new: true }
      );
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error updating education:', error);
      res.status(500).json({ message: 'Error updating education' });
    }
  },

  // Add document
  addDocument: async (req, res) => {
    try {
      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { $push: { documents: req.body } },
        { new: true }
      );
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ message: 'Error adding document' });
    }
  },

  // Submit application
  submit: async (req, res) => {
    try {
      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        {
          $set: {
            status: 'submitted',
            submittedDate: new Date()
          }
        },
        { new: true }
      );
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ message: 'Error submitting application' });
    }
  },

  // Update application status (admin only)
  updateStatus: async (req, res) => {
    try {
      const application = await LicenseApplication.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { new: true }
      );
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Error updating status' });
    }
  },

  // Delete application
  delete: async (req, res) => {
    try {
      const application = await LicenseApplication.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
      });
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error('Error deleting application:', error);
      res.status(500).json({ message: 'Error deleting application' });
    }
  }
}; 