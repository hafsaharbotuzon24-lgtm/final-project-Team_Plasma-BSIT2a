const express = require('express');
const router = express.Router();
const controller = require('../controllers/pathController');

router.post('/', controller.createPath);
router.get('/', controller.getPaths);

module.exports = router;