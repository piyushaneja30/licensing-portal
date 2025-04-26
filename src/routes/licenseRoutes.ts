import express from 'express';
import { authenticateToken } from '../middleware/auth';
import License from '../models/License';

const router = express.Router();

// Get all licenses (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view licenses' });
    }

    const licenses = await License.findAll();
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching licenses' });
  }
});

// Get user's licenses
router.get('/my-licenses', authenticateToken, async (req, res) => {
  try {
    const licenses = await License.findAll({
      where: { userId: req.user?.id }
    });
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching licenses' });
  }
});

// Get license by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const license = await License.findByPk(req.params.id);
    if (!license) {
      return res.status(404).json({ message: 'License not found' });
    }

    // Only allow users to view their own licenses or admins to view any license
    if (license.userId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this license' });
    }

    res.json(license);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching license' });
  }
});

// Create new license (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to create licenses' });
    }

    const license = await License.create(req.body);
    res.status(201).json(license);
  } catch (error) {
    res.status(500).json({ message: 'Error creating license' });
  }
});

// Update license (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update licenses' });
    }

    const license = await License.findByPk(req.params.id);
    if (!license) {
      return res.status(404).json({ message: 'License not found' });
    }

    await license.update(req.body);
    res.json(license);
  } catch (error) {
    res.status(500).json({ message: 'Error updating license' });
  }
});

// Delete license (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete licenses' });
    }

    const license = await License.findByPk(req.params.id);
    if (!license) {
      return res.status(404).json({ message: 'License not found' });
    }

    await license.destroy();
    res.json({ message: 'License deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting license' });
  }
});

export default router; 