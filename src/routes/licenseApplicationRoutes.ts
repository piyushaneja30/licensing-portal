import express from 'express';
import { licenseApplicationController } from '../controllers/licenseApplicationController.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - require authentication
router.use(authenticateUser);

// Get all applications (admin only)
router.get('/all', isAdmin, licenseApplicationController.getAllApplications);

// Create new application
router.post('/', licenseApplicationController.create);

// Get user's applications
router.get('/user', licenseApplicationController.getUserApplications);

// Get application by ID
router.get('/:id', licenseApplicationController.getById);

// Update personal info
router.put('/:id/personal-info', licenseApplicationController.updatePersonalInfo);

// Update education
router.put('/:id/education', licenseApplicationController.updateEducation);

// Add document
router.post('/:id/documents', licenseApplicationController.addDocument);

// Submit application
router.post('/:id/submit', licenseApplicationController.submit);

// Update application status (admin only)
router.put('/:id/status', isAdmin, licenseApplicationController.updateStatus);

export default router; 