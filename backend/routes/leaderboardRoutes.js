const express = require('express');
const router = express.Router();
const controller = require('../controllers/leaderboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, controller.getLeaderboard);
router.post('/submit', protect, controller.submitLeaderboardEntry);

module.exports = router;