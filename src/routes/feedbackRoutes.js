// src/routes/feedbackRoutes.js
import express from 'express';
import { 
  createFeedback, 
  getFeedbackByDonation, 
  updateFeedback, 
  deleteFeedback 
} from '../controllers/feedbackController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const feedbackRoute = express.Router();

// Create feedback (POST) - Protected route
feedbackRoute.post('/', isAuthenticated, createFeedback);

// Get feedback for a donation (GET)
feedbackRoute.get('/:donationId', getFeedbackByDonation);

// Update feedback (PUT) - Protected route
feedbackRoute.put('/:feedbackId', isAuthenticated, updateFeedback);

// Delete feedback (DELETE) - Protected route
feedbackRoute.delete('/:feedbackId', isAuthenticated, deleteFeedback);

export default feedbackRoute;
