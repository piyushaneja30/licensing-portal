import express from 'express';
import { licenseApplicationController } from '../controllers/licenseApplicationController.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log('License Application Route:', req.method, req.url);
  console.log('User:', req.user);
  next();
});

// Public route - no authentication required
router.get('/all', licenseApplicationController.getAllApplications);

// Protected routes - require authentication
router.use(authenticateUser);

// User routes
router.post('/create', licenseApplicationController.create);
router.get('/user', licenseApplicationController.getUserApplications);

// Dynamic routes
router.get('/:id', licenseApplicationController.getById);
router.patch('/:id/personal-info', licenseApplicationController.updatePersonalInfo);
router.patch('/:id/education', licenseApplicationController.updateEducation);
router.post('/:id/documents', licenseApplicationController.addDocument);
router.post('/:id/submit', licenseApplicationController.submit);
router.delete('/:id', licenseApplicationController.delete);
router.patch('/:id/status', isAdmin, licenseApplicationController.updateStatus);

export default router; 