// Event definitions
export const SOCKET_EVENTS = {
  JOIN_RECIPIENT: "join-recipient",   // Recipient joins their specific room
  LEAVE_RECIPIENT: "leave-recipient",  // Recipient leaves their room
  NEW_DONATION: "new-donation",        // New donation event
  DISCONNECT: "disconnect",            // Disconnection event
};

// Generate unique room names based on recipient ID
export const generateRoomName = (recipientId) => {
  return `recipient_${recipientId}`;  // Unique room for each recipient
};
