import express from 'express';
import License from '../models/License.js';
import { Request } from 'express';
import { Op } from 'sequelize';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

interface LicenseQueryParams {
  query?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const router = express.Router();

// Get all licenses with filtering and sorting
router.get('/', async (req: Request<{}, {}, {}, LicenseQueryParams>, res) => {
  try {
    const { 
      query = '', 
      category = '', 
      sortBy = 'name', 
      sortOrder = 'asc' 
    } = req.query;
    
    // Build where clause
    const where: any = {};
    
    if (query) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } }
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    // Build order clause
    const order: any[] = [];
    if (sortBy === 'fee' || sortBy === 'processingTime') {
      // For numeric fields, use numeric sorting
      order.push([sortBy, sortOrder]);
    } else {
      // For string fields, use case-insensitive sorting
      order.push([sortBy, sortOrder]);
    }
    
    const licenses = await License.findAll({
      where,
      order
    });
    
    res.json(licenses);
  } catch (error) {
    console.error('Error fetching licenses:', error);
    res.status(500).json({ message: 'Error fetching licenses' });
  }
});

// Get license by ID
router.get('/:id', async (req, res) => {
  try {
    const license = await License.findByPk(req.params.id);
    if (!license) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json(license);
  } catch (error) {
    console.error('Error fetching license:', error);
    res.status(500).json({ message: 'Error fetching license' });
  }
});

// Create a new license (admin only)
router.post('/', authenticateUser, isAdmin, async (req, res) => {
  try {
    // Generate a unique license number (simple example)
    const licenseNumber = 'LIC-' + Date.now();
    const license = await License.create({
      ...req.body,
      licenseNumber,
      userId: req.user.id, // track which admin created it
      issueDate: new Date(),
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      status: 'active',
    });
    res.status(201).json(license);
  } catch (error) {
    console.error('Error creating license:', error);
    res.status(500).json({ message: 'Error creating license', error: error.message });
  }
});

export default router; 