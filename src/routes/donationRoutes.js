// src/routes/donationRoutes.js
import express from 'express';
import { createDonation, getAllDonations, getDonationById, updateDonation, deleteDonation } from '../controllers/donationController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
// import { isAdmin } from '../middlewares/roleMiddleware.js';
import{validateDonation} from "../middlewares/validationMiddleware.js"
import { isDonor , isRecipient , isAdmin} from '../middlewares/roleMiddleware.js';

const donationRoute = express.Router();

// Create donation (POST) - Protected route with validation and role check
donationRoute.post('/', isAuthenticated,isDonor, validateDonation, createDonation);

// Get all donations (GET)
donationRoute.get('/',getAllDonations);

// Get donation by ID (GET)
donationRoute.get('/:donationId', getDonationById);

// Update donation (PUT) - Admin only
donationRoute.put('/:donationId', isAuthenticated,isRecipient, updateDonation);

// Delete donation (DELETE) - Admin only
 donationRoute.delete('/:donationId', isAuthenticated, isAdmin, deleteDonation);

export default donationRoute;
