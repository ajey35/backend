// donationHistoryRoutes.js

import express from 'express';
import { getDonationHistory } from '../controllers/donationHistoryController';
import { isAuthenticated } from '../middleware/authMiddleware';

const donationHist = express.Router();

// Get donation history for a user (GET) - Protected route
donationHist.get('/:userId', isAuthenticated, getDonationHistory);

export default donationHist;
