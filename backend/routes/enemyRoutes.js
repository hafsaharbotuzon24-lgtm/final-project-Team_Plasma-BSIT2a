const express = require('express');
const router = express.Router();
const controller = require('../controllers/enemyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, controller.createEnemy);
router.get('/battle/:battleId', controller.getEnemiesByBattle);

module.exports = router;