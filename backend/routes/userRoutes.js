// userRouter.js
import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserProfile,
  getDeliveryAgents
} from '../controllers/userController.js';
import { protect, verifyRole } from '../middleware/authMiddleware.js';

const router = Router();

// Get all users
router.get('/getUsers', protect, getUsers);

// Get user by ID
router.get('/getUser/:id', protect, getUserById);

// Update user profile
router.put('/updateProfile/:id', protect, updateUserProfile);

// Get all delivery agents
router.get('/getAgents', protect, verifyRole(['client']), getDeliveryAgents);

export default router;
