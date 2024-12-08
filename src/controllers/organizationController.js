// src/controllers/organizationController.js
import prisma from "../config/PrismaCleint.js";

// Get all organizations (GET)
export const getAllOrganizations = async (req, res) => {
  try {
  const organizations = await prisma.organization.findMany(); // Fetch all organizations from the database
    res.status(200).json(organizations); // Return the list of organizations
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organizations', error });
  }
};

// Get organization by ID (GET)
export const getOrganizationById = async (req, res) => {
  const { organizationId } = req.params;

  try {
    const organization = await prisma.organization.findUnique({
      where: { id: parseInt(organizationId) }, // Ensure ID is parsed
    }); // Find organization by ID
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json(organization); // Return the organization details
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organization', error });
  }
};

// Create organization (POST) - Admin only
export const createOrganization = async (req, res) => {
  const { name, address,email,website , description, location,phone  } = req.body;
  try {
    // Create a new organization
    const newOrganization = new prisma.organization({
      name,
      address,
      email,
      description,
      location,
      OrganizationType,
      phone
    });

    await newOrganization.save(); // Save organization to the database
    res.status(201).json(newOrganization); // Return the created organization
  } catch (error) {
    res.status(500).json({ message: 'Error creating organization', error });
  }
};

// Update organization (PUT) - Admin only
export const updateOrganization = async (req, res) => {
  const { organizationId } = req.params;
  const { name, address,email,description, location, phone } = req.body;

  try {
    // Find and update the organization by ID
    const updatedOrganization = await prisma.organization.findByIdAndUpdate(
      organizationId,
      { name,address,email, description, location, phone },
      { new: true } // Return the updated organization
    );

    if (!updatedOrganization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json(updatedOrganization); // Return the updated organization details
  } catch (error) {
    res.status(500).json({ message: 'Error updating organization', error });
  }
};

// Delete organization (DELETE) - Admin only
export const deleteOrganization = async (req, res) => {
  const { organizationId } = req.params;

  try {
    const deletedOrganization = await prisma.organization.findByIdAndDelete(organizationId);

    if (!deletedOrganization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json({ message: 'Organization deleted successfully' }); // Success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting organization', error });
  }
};
