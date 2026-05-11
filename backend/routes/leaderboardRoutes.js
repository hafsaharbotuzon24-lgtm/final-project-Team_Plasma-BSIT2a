const express = require('express');
const router = express.Router();
const controller = require('../controllers/leaderboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, controller.getLeaderboard);
router.get('/adventure', protect, controller.getAdventureLeaderboard);
router.get('/quest', protect, controller.getQuestLeaderboard);
router.post('/submit', protect, controller.submitLeaderboardEntry);

module.exports = router;
