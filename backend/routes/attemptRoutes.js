const express = require('express');
const router = express.Router();
const controller = require('../controllers/attemptController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, controller.submitAttempt);

module.exports = router;