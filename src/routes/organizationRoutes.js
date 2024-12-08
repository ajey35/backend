// src/routes/organizationRoutes.js
import express from 'express';
import { 
  createOrganization, 
  getAllOrganizations, 
  getOrganizationById, 
  // updateOrganization, 
  deleteOrganization 
} from '../controllers/organizationController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin} from '../middlewares/roleMiddleware.js';

const orgRoute = express.Router();

// Create organization (POST) - Admin only
orgRoute.post('/', isAuthenticated, isAdmin, createOrganization);

// Get all organizations (GET)
orgRoute.get('/', getAllOrganizations);

// Get organization by ID (GET)
orgRoute.get('/:organizationId', getOrganizationById);

// Update organization (PUT) - Admin only
// orgRoute.put('/:organizationId', isAuthenticated, isAdmin, updateOrganization);

// Delete organization (DELETE) - Admin only
orgRoute.delete('/:organizationId', isAuthenticated, isAdmin, deleteOrganization);

export default orgRoute;
