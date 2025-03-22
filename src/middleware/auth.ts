import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

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
    // Log the full request headers for debugging
    console.log('Debug: Request headers:', req.headers);
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Debug: Token received:', token);
    
    if (!token) {
      console.log('Debug: No token provided');
      res.status(401).json({ message: 'No authentication token provided' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('Debug: Using secret:', secret.substring(0, 3) + '...');

    try {
      const decoded = jwt.verify(token, secret) as { userId: string };
      console.log('Debug: Decoded token:', decoded);

      const user = await User.findById(decoded.userId);
      console.log('Debug: Found user:', user ? 'Yes' : 'No');

      if (!user) {
        console.log('Debug: User not found');
        res.status(401).json({ message: 'User not found' });
        return;
      }

      req.user = {
        id: user._id.toString(),
        email: user.email,
        role: user.role
      };
      console.log('Debug: User set on request:', req.user);

      next();
    } catch (jwtError) {
      console.error('Debug: JWT verification failed:', jwtError);
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  } catch (error) {
    console.error('Debug: Auth middleware error:', error);
    res.status(500).json({ message: 'Internal server error in auth middleware' });
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    if (req.user.role !== 'admin') {
      res.status(403).json({ message: 'Admin access required' });
      return;
    }

    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    res.status(500).json({ message: 'Error checking admin status' });
  }
}; 