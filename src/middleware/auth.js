import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Session } from '../models/Session.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token and check session validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ token, isValid: true });

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Session expired' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Update session last activity
    session.lastActivity = new Date();
    await session.save();

    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    res.status(500).json({ message: 'Error checking admin status' });
  }
}; 