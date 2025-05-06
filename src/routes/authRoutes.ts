import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', authController.signup);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes
router.use(authenticateUser);
router.get('/me', authController.getCurrentUser);
router.post('/logout', authController.logout);
router.put('/profile', authController.updateProfile);
router.get('/users', authController.getAllUsers);

export default router; 