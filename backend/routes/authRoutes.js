const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { handleValidationErrors, protect } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

const validateRegister = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .isLength({ max: 30 }).withMessage('Username must not exceed 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .isLength({ max: 128 }).withMessage('Password must not exceed 128 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)')
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

router.post('/register', validateRegister, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);

// Protected route - requires valid JWT token
router.get('/secure-data', protect, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Access granted to secure data',
      player: {
        id: req.player.id,
        email: req.player.email
      },
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving secure data'
    });
  }
});

module.exports = router;