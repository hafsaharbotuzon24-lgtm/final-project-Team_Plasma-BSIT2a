const express = require('express');
const router = express.Router();
const controller = require('../controllers/chestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, controller.createChest);

router.get('/path/:pathId', protect, controller.getChestsByPath);
router.get('/:id', protect, controller.getChest);

module.exports = router;