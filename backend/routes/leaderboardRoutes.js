const express = require('express');
const router = express.Router();
const controller = require('../controllers/leaderboardController');

router.get('/', controller.getLeaderboard);

module.exports = router;