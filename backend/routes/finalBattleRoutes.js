const express = require('express');
const router = express.Router();
const controller = require('../controllers/finalBattleController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, controller.createFinalBattle);

router.get('/battle/:battleId', protect, controller.getFinalBattle);

module.exports = router;