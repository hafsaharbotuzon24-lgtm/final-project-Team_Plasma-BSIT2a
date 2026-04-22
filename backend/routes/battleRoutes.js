const express = require('express');
const router = express.Router();
const controller = require('../controllers/battleController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, controller.createBattle);
router.get('/player/:playerId', protect, controller.getBattlesByPlayer);

module.exports = router;