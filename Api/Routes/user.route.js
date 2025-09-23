import express from 'express';
import { test, updateUser, deleteUser, signout, getUsers } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { errorHandler } from '../utils/error.js';

// User routes - Base URL: /api/users
const router = express.Router();

// Test endpoint
router.get('/test', test)

// Update user profile (protected)
router.put('/update/:userId', verifyToken, updateUser)

// Delete user account (protected)
router.delete('/delete/:userId', verifyToken, deleteUser)

// Sign out user
router.post('/signout', signout)

//get users
router.get('/getusers', verifyToken, getUsers)






export default router;

