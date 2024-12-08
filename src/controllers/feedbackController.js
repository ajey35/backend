// src/controllers/feedbackController.js
import prisma from "../config/PrismaCleint";
// Create feedback (POST)
export const createFeedback = async (req, res) => {
  const { donationId, message } = req.body;
  const userId = req.user._id; // Extract user ID from the authenticated user

  try {
    // Check if the donation exists
    const donation = await prisma.donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Create new feedback
    const newFeedback = new Feedback({
      user: userId,
      donation: donationId,
      message,
    });

    await newFeedback.save(); // Save feedback to the database
    res.status(201).json(newFeedback); // Return the created feedback
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error });
  }
};

// Get feedback for a donation (GET)
export const getFeedbackByDonation = async (req, res) => {
  const { donationId } = req.params;

  try {
    // Find feedback for a specific donation
    const feedback = await prisma.feedback.find({ donation: donationId }).populate('user', 'name email'); // Populate user details

    if (feedback.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this donation' });
    }

    res.status(200).json(feedback); // Return the feedback for the donation
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

// Update feedback (PUT)
export const updateFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { message } = req.body;

  try {
    // Find feedback by ID
    const feedback = await prisma.feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if the current user is the same user who created the feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this feedback' });
    }

    // Update feedback message
    feedback.message = message;
    await feedback.save(); // Save the updated feedback

    res.status(200).json(feedback); // Return the updated feedback
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error });
  }
};

// Delete feedback (DELETE)
export const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    // Find and delete the feedback
    const feedback = await prisma.feedback.findByIdAndDelete(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Ensure the current user is authorized to delete this feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this feedback' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' }); // Success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error });
  }
};
