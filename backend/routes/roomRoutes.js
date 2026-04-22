const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, controller.createRoom);
router.get('/path/:pathId', protect, controller.getRoomsByPath);

module.exports = router;