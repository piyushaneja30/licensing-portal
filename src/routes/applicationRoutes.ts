import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { LicenseApplication } from '../models/LicenseApplication';

const router = express.Router();

// Get all applications (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view applications' });
    }

    const applications = await LicenseApplication.findAll();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Get user's applications
router.get('/my-applications', authenticateToken, async (req, res) => {
  try {
    const applications = await LicenseApplication.findAll({
      where: { userId: req.user?.id }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Create new application
router.post('/', authenticateToken, async (req, res) => {
  try {
    const application = await LicenseApplication.create({
      ...req.body,
      userId: req.user?.id
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error creating application' });
  }
});

// Update application
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const application = await LicenseApplication.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only allow users to update their own applications or admins to update any application
    if (application.userId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    await application.update(req.body);
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application' });
  }
});

// Delete application
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const application = await LicenseApplication.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only allow users to delete their own applications or admins to delete any application
    if (application.userId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this application' });
    }

    await application.destroy();
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application' });
  }
});

export default router; 