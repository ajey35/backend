import { emitDonationNotification } from "./socket.js";

// Emit donation notification when a new donation is made
export const donationNotificationController = async (recipientId, donation) => {
  try {
    // Trigger the real-time donation notification
    await emitDonationNotification(recipientId, donation);
  } catch (error) {
    console.error("Error emitting donation notification:", error.message);
  }
};
