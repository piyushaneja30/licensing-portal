import express from 'express';
import { licenseApplicationController } from '../controllers/licenseApplicationController.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';
import { LicenseApplication } from '../models/LicenseApplication.js';

const router = express.Router();

// Get all applications (public route for testing)
router.get('/all', async (req, res) => {
  try {
    const applications = await LicenseApplication.find();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Public routes (require authentication)
router.use(authenticateUser);
router.post('/', licenseApplicationController.create);
router.get('/', licenseApplicationController.getUserApplications);
router.get('/:id', licenseApplicationController.getById);
router.put('/:id/personal-info', licenseApplicationController.updatePersonalInfo);
router.put('/:id/education', licenseApplicationController.updateEducation);
router.post('/:id/documents', licenseApplicationController.addDocument);
router.post('/:id/submit', licenseApplicationController.submit);
router.delete('/:id', licenseApplicationController.delete);

// Admin only routes
router.use(isAdmin);
router.put('/:id/status', licenseApplicationController.updateStatus);

// Get user's applications
router.get('/user', async (req, res) => {
  try {
    const applications = await LicenseApplication.find({ userId: req.user.id });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Create new application
router.post('/', async (req, res) => {
  try {
    const application = new LicenseApplication({
      userId: req.user.id,
      ...req.body
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Error creating application' });
  }
});

export default router; 