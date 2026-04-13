const express = require('express');
const router = express.Router();
const controller = require('../controllers/heartController');
const protect = require('../middleware/authMiddleware');

router.get('/enemy/:enemyId', protect, controller.getHeartRewards);

module.exports = router;