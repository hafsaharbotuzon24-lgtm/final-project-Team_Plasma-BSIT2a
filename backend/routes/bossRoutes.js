const express = require('express');
const router = express.Router();
const controller = require('../controllers/bossController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, controller.createBoss);
router.get('/:id', controller.getBoss);

module.exports = router;