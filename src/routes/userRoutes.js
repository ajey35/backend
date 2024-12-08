// src/routes/userRoutes.js
import express from 'express';
import { 
  registerUser, 
  loginUser, 
  // googleLogin, 
  getUserProfile, 
  refreshToken 
} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
const userRoute = express.Router();

// Register user (POST)
userRoute.post('/register', registerUser);

// Login user (POST)
userRoute.post('/login', loginUser);

// Google login (POST)
// userRoute.post('/google-login', googleLogin);

// Refresh JWT token (POST)
userRoute.post('/refresh-token', refreshToken);

// Get user profile (GET) - Protected route
userRoute.get('/profile', isAuthenticated, getUserProfile);

export default userRoute;
