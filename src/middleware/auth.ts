import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    const authHeader = req.headers.authorization;
    console.log('Auth middleware - Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth middleware - No Bearer token found');
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const token = authHeader.split(' ')[1];
    console.log('Auth middleware - Token:', token);

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };
    console.log('Auth middleware - Decoded token:', decoded);

    // Get user
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password'] }
    });
    console.log('Auth middleware - User:', user);

    if (!user) {
      console.log('Auth middleware - User not found');
      res.status(401).json({ message: 'User not found' });
      return;
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware - Error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Admin access required' });
      return;
    }
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Error checking admin status' });
  }
}; 