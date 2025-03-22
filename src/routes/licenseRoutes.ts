import express from 'express';
import { License } from '../models/License.js';

const router = express.Router();

// Get all licenses
router.get('/', async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (error) {
    console.error('Error fetching licenses:', error);
    res.status(500).json({ message: 'Error fetching licenses' });
  }
});

// Get license by ID
router.get('/:id', async (req, res) => {
  try {
    const license = await License.findById(req.params.id);
    if (!license) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json(license);
  } catch (error) {
    console.error('Error fetching license:', error);
    res.status(500).json({ message: 'Error fetching license' });
  }
});

export default router; 