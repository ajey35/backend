import { body, validationResult } from 'express-validator';

// Validation for creating a donation
export const validateDonation = [
  // Validate foodType (required and must be a non-empty string)
  body('foodType')
    .notEmpty()
    .withMessage('Food type is required')
    .isString()
    .withMessage('Food type must be a valid string'),

  // Validate quantity (required and must be a positive integer)
  // Validate quality (required and must be between 3 to 50 characters)
  body('quality')
    .isInt({ min: 3, max: 5 })
    .withMessage('Quality description must be between 3 and 50 characters'),

  // Validate location (required and must be a non-empty string)
  body('location')
    .notEmpty()
    .withMessage('Location is required')
    .isString()
    .withMessage('Location must be a valid string'),

  // Validate recipientId (optional but must be a positive integer if provided)
  body('recipientId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Recipient ID must be a positive integer'),

  // Validate organizationId (optional but must be a positive integer if provided)
  body('organizationId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Organization ID must be a positive integer'),
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("From Validator");
    
    next();
  },
];

// Validation for user registration
export const validateUserRegistration = [
  // Validate username (must be between 3 to 20 characters)
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),

  // Validate email (must be a valid email format)
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),

  // Validate password (must be at least 6 characters)
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
