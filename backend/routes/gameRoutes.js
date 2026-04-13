const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/:userId/challenge', gameController.getChallenge);

router.post('/:userId/answer', gameController.submitAnswer);

router.post('/:userId/hint', gameController.useHint);

module.exports = router;