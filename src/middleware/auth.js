import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Session } from '../models/Session.js';

export const authenticateUser = async (req, res, next) => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    const authHeader = req.headers.authorization;
    console.log('Auth middleware - Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth middleware - No Bearer token found');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Auth middleware - Token:', token);

    // Verify token is valid
    const session = await Session.findOne({ token, isValid: true });
    console.log('Auth middleware - Session:', session);

    if (!session || session.expiresAt < new Date()) {
      console.log('Auth middleware - Invalid or expired session');
      return res.status(401).json({ message: 'Session expired or invalid' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Auth middleware - Decoded token:', decoded);

    // Get user
    const user = await User.findById(decoded.userId).select('-password');
    console.log('Auth middleware - User:', user);

    if (!user) {
      console.log('Auth middleware - User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    // Update session last activity
    session.lastActivity = new Date();
    await session.save();

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware - Error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Error checking admin status' });
  }
}; 