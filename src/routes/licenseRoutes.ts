import express from 'express';
import { License } from '../models/License.js';
import { Request } from 'express';

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
    
    // Build filter object
    let filter: any = {};
    
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }
    
    // Build sort object with proper handling of numeric fields
    const sortOptions: any = {};
    if (sortBy === 'fee') {
      // For numeric fields, use numeric sorting
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'processingTime') {
      // For processing time, first sort by the numeric value
      sortOptions['processingTime'] = sortOrder === 'asc' ? 1 : -1;
    } else {
      // For string fields, use case-insensitive sorting
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
    
    const licenses = await License.find(filter).collation({ locale: 'en' }).sort(sortOptions);
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