import { Response } from 'express';
import { Request } from '../types/express.js';
import LicenseApplication from '../models/LicenseApplication.js';
import User from '../models/User.js';

export const licenseApplicationController = {
  // Get all applications (admin only)
  getAllApplications: async (req: Request, res: Response): Promise<void> => {
    try {
      const applications = await LicenseApplication.findAll({
        include: [{
          model: User,
          attributes: ['id', 'email', 'profile']
        }],
        order: [['createdAt', 'DESC']]
      });
      
      res.json(applications);
    } catch (error) {
      console.error('Error fetching all applications:', error);
      res.status(500).json({ message: 'Error fetching applications' });
    }
  },

  // Create a new application
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      console.log('Create Application - Request Body:', req.body);

      const { licenseType, licenseTypeId } = req.body;
      const finalLicenseType = licenseType || licenseTypeId;
      if (!finalLicenseType) {
        res.status(400).json({ message: 'licenseType is required' });
        return;
      }

      // Generate a unique application number
      const applicationNumber = `APP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const applicationData = {
        ...req.body,
        licenseType: finalLicenseType,
        userId: req.user.id,
        status: 'submitted',
        applicationDate: new Date(),
        applicationNumber,
      };

      const application = await LicenseApplication.create(applicationData);
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
      const application = await LicenseApplication.findByPk(req.params.id, {
        include: [{
          model: User,
          attributes: ['id', 'email', 'profile']
        }]
      });
      
      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }

      res.json(application);
    } catch (error) {
      console.error('Error fetching application:', error);
      res.status(500).json({ message: 'Error fetching application' });
    }
  },

  // Get user's applications
  getUserApplications: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const applications = await LicenseApplication.findAll({
        where: { userId: req.user.id },
        order: [['applicationDate', 'DESC']]
      });
      
      res.json(applications);
    } catch (error) {
      console.error('Error fetching user applications:', error);
      res.status(500).json({ 
        message: 'Error fetching user applications',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Update personal information
  updatePersonalInfo: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const application = await LicenseApplication.findOne({
        where: { id: req.params.id, userId: req.user.id }
      });

      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }

      await application.update({
        personalInfo: req.body,
        updatedAt: new Date()
      });

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

      const application = await LicenseApplication.findOne({
        where: { id: req.params.id, userId: req.user.id }
      });

      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }

      await application.update({
        education: req.body,
        updatedAt: new Date()
      });

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

      const application = await LicenseApplication.findOne({
        where: { id: req.params.id, userId: req.user.id }
      });

      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }

      const documents = application.documents || [];
      documents.push({
        ...req.body,
        uploadDate: new Date(),
        status: 'pending'
      });

      await application.update({
        documents,
        updatedAt: new Date()
      });

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

      const application = await LicenseApplication.findOne({
        where: { id: req.params.id, userId: req.user.id }
      });

      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }

      await application.update({
        status: 'submitted',
        updatedAt: new Date()
      });

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
      const application = await LicenseApplication.findByPk(req.params.id);

      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }

      const reviewNotes = application.reviewNotes || [];
      reviewNotes.push({
        date: new Date(),
        reviewer: req.user.id,
        note,
        status
      });

      await application.update({
        status,
        reviewNotes,
        updatedAt: new Date()
      });

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

      const application = await LicenseApplication.findOne({
        where: { id: req.params.id, userId: req.user.id }
      });

      if (!application) {
        res.status(404).json({ message: 'Application not found' });
        return;
      }

      if (application.status !== 'draft') {
        res.status(400).json({ message: 'Only draft applications can be deleted' });
        return;
      }

      await application.destroy();
      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting application', error });
    }
  }
}; 