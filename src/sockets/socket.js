import { Server } from "socket.io";
import { SOCKET_EVENTS, generateRoomName } from "./events.js";

let io; // Socket.IO instance

// Initialize Socket.IO server
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" }, // Allow all origins for testing; update as needed
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle join recipient room
    socket.on(SOCKET_EVENTS.JOIN_RECIPIENT, (recipientId) => {
      const roomName = generateRoomName(recipientId);  // Create unique room name for recipient
      socket.join(roomName);  // Join the room for the specific recipient
      console.log(`Socket ${socket.id} joined room: ${roomName}`);
    });

    // Handle leave recipient room
    socket.on(SOCKET_EVENTS.LEAVE_RECIPIENT, (recipientId) => {
      const roomName = generateRoomName(recipientId);
      socket.leave(roomName);  // Leave the room for the specific recipient
      console.log(`Socket ${socket.id} left room: ${roomName}`);
    });

    // Handle disconnection
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

// Emit real-time donation notification (send to all connected clients in the recipient's room)
export const emitDonationNotification = async (recipientId, donation) => {
  const roomName = generateRoomName(recipientId); // Get room for the specific recipient
  if (io) {
    io.to(roomName).emit(SOCKET_EVENTS.NEW_DONATION, donation); // Emit to that room
    console.log(`Notification sent to room: ${roomName}`);
  } else {
    console.error("Socket.IO is not initialized");
  }
};
