const express = require('express');
const router = express.Router();
const controller = require('../controllers/progressController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, controller.createProgress);
router.get('/player/:playerId', protect, controller.getProgressByPlayer);

module.exports = router;