const express = require('express');
const router = express.Router();
const controller = require('../controllers/hintController');
const { protect } = require('../middleware/authMiddleware');

router.get('/chest/:chestId', protect, controller.getHintsByChest);

module.exports = router;