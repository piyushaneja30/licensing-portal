import { Response } from 'express';
import { Request } from '../types/express.js';
import { LicenseApplication } from '../models/LicenseApplication.js';

export const licenseApplicationController = {
  // Create a new application
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const applicationData = {
        ...req.body,
        userId: req.user.id,
        lastUpdated: new Date(),
        submissionDate: req.body.status === 'submitted' ? new Date() : undefined
      };

      // Create and save the application
      const application = new LicenseApplication(applicationData);
      await application.save();

      res.status(201).json(application);
    } catch (error) {
      console.error('Error creating application:', error);
      res.status(500).json({ 
        message: 'Error creating application', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  },

  // Get application by ID
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const application = await LicenseApplication.findById(req.params.id);
      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching application', error });
    }
  },

  // Get user's applications
  getUserApplications: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const applications = await LicenseApplication.find({ userId: req.user.id })
        .sort({ lastUpdated: -1 });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching applications', error });
    }
  },

  // Update personal information
  updatePersonalInfo: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { 
          $set: { 
            personalInfo: req.body,
            lastUpdated: new Date()
          }
        },
        { new: true }
      );
      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Error updating personal information', error });
    }
  },

  // Update education
  updateEducation: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { 
          $set: { 
            education: req.body,
            lastUpdated: new Date()
          }
        },
        { new: true }
      );
      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Error updating education', error });
    }
  },

  // Add document
  addDocument: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { 
          $push: { 
            documents: {
              ...req.body,
              uploadDate: new Date(),
              status: 'pending'
            }
          },
          $set: { lastUpdated: new Date() }
        },
        { new: true }
      );
      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Error adding document', error });
    }
  },

  // Submit application
  submit: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const application = await LicenseApplication.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { 
          $set: { 
            status: 'submitted',
            submissionDate: new Date(),
            lastUpdated: new Date()
          }
        },
        { new: true }
      );
      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Error submitting application', error });
    }
  },

  // Update application status (admin only)
  updateStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const { status, note } = req.body;
      const application = await LicenseApplication.findByIdAndUpdate(
        req.params.id,
        { 
          $set: { status },
          $push: { 
            reviewNotes: {
              date: new Date(),
              reviewer: req.user.id,
              note,
              status
            }
          },
          lastUpdated: new Date()
        },
        { new: true }
      );
      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Error updating application status', error });
    }
  },

  // Delete application (only if in draft status)
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const application = await LicenseApplication.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
        status: 'draft'
      });
      if (!application) {
        res.status(404).json({ message: 'Application not found or cannot be deleted' });
        return;
      }
      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting application', error });
    }
  }
}; 