const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', controller.createPlayer);
router.get('/', protect, controller.getPlayers);
router.get('/me', protect, controller.getMyPlayer);
router.patch('/me/resources', protect, controller.updateMyResources);
router.patch('/me/password', protect, controller.changePassword);
router.delete('/me', protect, controller.deleteMyAccount);
router.get('/:id', protect, controller.getPlayer);
router.put('/:id', protect, controller.updatePlayer);
router.delete('/:id', protect, controller.deletePlayer);

module.exports = router;