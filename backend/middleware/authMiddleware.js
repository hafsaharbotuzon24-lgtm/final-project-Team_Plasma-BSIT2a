const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "No token provided, access denied" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.player = decoded; // attach player info
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Token has expired" 
      });
    }
    res.status(401).json({ 
      success: false,
      message: "Invalid token" 
    });
  }
};

// Optional authentication - doesn't require token but verifies if provided
const optionalProtect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.player = decoded;
    } catch (err) {
      console.warn('Invalid optional token:', err.message);
    }
  }
  next();
};

// Role-based authorization (for future use)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.player) {
      return res.status(401).json({ 
        success: false,
        message: "Not authenticated" 
      });
    }

    if (roles.length && !roles.includes(req.player.role)) {
      return res.status(403).json({ 
        success: false,
        message: "Insufficient permissions" 
      });
    }

    next();
  };
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = { protect, optionalProtect, authorize, handleValidationErrors };