import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Debug middleware for auth routes
router.use((req, res, next) => {
  console.log('Auth Route:', req.method, req.url);
  console.log('Auth Route Headers:', req.headers);
  next();
});

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/users/all', authController.getAllUsers);

// Protected routes
router.get('/me', authenticateUser, authController.getCurrentUser);
router.post('/logout', authenticateUser, authController.logout);
router.put('/profile', authenticateUser, authController.updateProfile);

export default router; 