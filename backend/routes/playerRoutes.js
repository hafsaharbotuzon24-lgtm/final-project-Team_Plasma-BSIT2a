const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');
const protect = require('../middleware/authMiddleware');

router.post('/', controller.createPlayer);
router.get('/', protect, controller.getPlayers);
router.get('/me', protect, controller.getMyPlayer);
router.get('/:id', protect, controller.getPlayer);
router.put('/:id', protect, controller.updatePlayer);

module.exports = router;