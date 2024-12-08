import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { initializeSocket } from './src/sockets/socket.js';
import donationRoute from './src/routes/donationRoutes.js';
import userRoute from './src/routes/userRoutes.js';
// import organizationRoutes from './routes/organizationRoutes';
// import feedbackRoutes from './routes/feedbackRoutes';
import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, { cors: { origin: "*" } }); // Allow any origin for testing

// WebSocket initialization
initializeSocket(io); // Initialize WebSocket and handle socket connections

// Setup CORS (Allow cross-origin requests)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Fresh UP Route Just For Reference!!
app.get("/", (req, res) => {
  res.json({ msg: "Welcome To Hunger🔗Chain Website 💐" });
});

// API Routes
app.use('/api/users', userRoute);
app.use('/api/donations', donationRoute);
// app.use('/api/organizations', organizationRoutes);
// app.use('/api/feedback', feedbackRoutes);

// Error handling middleware (404 and general errors)
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
