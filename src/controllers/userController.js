import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '../config/PrismaCleint.js'; // Ensure the file name matches
dotenv.config();

// Utility function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role }, // Use `user.id` since Prisma uses `id` as the primary key
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Register user (POST)
export const registerUser = async (req, res) => {
  const { username, email, password, role ,organizationId } = req.body;
  console.log(username, email, password, role,organizationId);

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log('existing ->', existingUser);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user using Prisma
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'USER', // Default role is 'USER'
        organizationId:organizationId
      },
    });

    // Generate token
    res.status(201).json({user,msg:"SuccessFully 💐 Registered In"});
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user (POST)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get user profile (GET)
export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

// Refresh JWT token (POST)
export const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newToken = generateToken(decoded);

    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};
