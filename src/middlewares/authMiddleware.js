// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import User from '../models/User.js';  // Adjust the import path based on your file structure
import prisma from '../config/PrismaCleint.js';
dotenv.config();

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the header

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id, // Assuming decoded.id contains the user ID
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }
    console.log("Suucessfully Authenticated");
    req.user = user; // Attach the authenticated user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error });
  }
};