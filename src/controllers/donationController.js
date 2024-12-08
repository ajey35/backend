import prisma from "../config/PrismaCleint.js";
import sendEmailNotification from "../communication/notificationService.js";
import { donationNotificationController } from "../sockets/socketController.js";

// Create a new donation
export const createDonation = async (req, res) => {
  const { foodType, quality, location, recipientId, contactNumber , desc } = req.body; // Include contactNumber in request body
  const donorId = req.user.id; // Get the donorId from the authenticated user
  
  console.log(foodType, quality, location, recipientId, contactNumber, donorId);

  try {
    const newDonation = await prisma.donation.create({
      data: {
        foodType,
        quality,
        location,
        status: 'PENDING', // Default status
        recipientId,  // Optional: Can be null
        donorId,      // Relating the donation to the logged-in user
        contactNumber, // Include contactNumber
        desc // description from Donar
      },
    });
    console.log("Email Sending started");
    await sendEmailNotification();
    await donationNotificationController(recipientId, newDonation);
    console.log("Email Sending Ended");
    // Respond to client
    res.status(201).json({ message: "Donation created successfully", donation: newDonation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation', error: error.message });
  }
};


// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error: error.message });
  }
};

// Get donation by ID
export const getDonationById = async (req, res) => {
  const { donationId } = req.params;

  try {
    const donation = await prisma.donation.findUnique({
      where: {
        id: parseInt(donationId), // Ensure the ID is an integer
      },
    });

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error: error.message });
  }
};

// Update donation
export const updateDonation = async (req, res) => {
  const { donationId } = req.params;
  const { foodType, location,contactNumber,status } = req.body;

  try {
    const donation = await prisma.donation.findUnique({
      where: {
        id: parseInt(donationId),
      },
    });

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    const updatedDonation = await prisma.donation.update({
      where: {
        id: parseInt(donationId),
      },
      data: {
        foodType: foodType || donation.foodType,
        location: location || donation.location,
        contactNumber:contactNumber||donation.contactNumber,
        status:status||donation.status
      },
    });

    res.status(200).json({msg:"Donation Updated Succcessfully 💐",donation:updatedDonation});
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation', error: error.message });
  }
};

// Delete donation
export const deleteDonation = async (req, res) => {
  const { donationId } = req.params;

  try {
    const donation = await prisma.donation.findUnique({
      where: {
        id: parseInt(donationId),
      },
    });

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    } 
    await prisma.donation.delete({
      where: {
        id: parseInt(donationId),
      },
    });

    res.status(200).json({ message: 'Donation deleted successfully 💐' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation', error: error.message });
  }
};


