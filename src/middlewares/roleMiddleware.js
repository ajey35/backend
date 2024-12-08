// src/middleware/roleMiddleware.js

// Middleware to check if the user has an admin role
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};

// Middleware to check if the user is a donor (you can create more roles if needed)
export const isDonor = (req, res, next) => {
  if (req.user && req.user.role === 'DONOR') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Donor access required (Please login As Donar To Donate!!😊)' });
  }
};

export const isRecipient = (req, res, next) => {
  if (req.user && req.user.role === 'RECIPIENT') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: RECIPIENT access required' });
  }
};

// Middleware to check if the user is an organization (you can create more roles if needed)
export const isOrganization = (req, res, next) => {
  if (req.user && req.user.role === 'ORGANIZATION') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Organization access required' });
  }
};
