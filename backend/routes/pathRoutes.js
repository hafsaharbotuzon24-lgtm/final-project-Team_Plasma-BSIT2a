const express = require('express');
const router = express.Router();
const controller = require('../controllers/pathController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, controller.createPath);
router.get('/', protect, controller.getPaths);

module.exports = router;