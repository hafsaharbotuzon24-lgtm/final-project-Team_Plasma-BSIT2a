const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomController');

router.post('/', controller.createRoom);
router.get('/path/:pathId', controller.getRoomsByPath);

module.exports = router;