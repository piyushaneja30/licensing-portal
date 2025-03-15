import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/users/all', authController.getAllUsers);

// Protected routes
router.get('/me', authenticateUser, authController.getCurrentUser);
router.post('/logout', authenticateUser, authController.logout);

export default router; 