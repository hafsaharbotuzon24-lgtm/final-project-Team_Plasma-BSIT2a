const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');

// Public admin login route
router.post('/login', controller.adminLogin);

// All routes below require admin JWT
router.get('/stats', adminProtect, controller.getStats);
router.get('/analytics', adminProtect, controller.getAnalytics);
router.get('/players', adminProtect, controller.getPlayers);
router.get('/players/:id', adminProtect, controller.getPlayerDetail);
router.patch('/players/:id', adminProtect, controller.updatePlayer);
router.delete('/players/:id', adminProtect, controller.deletePlayer);
router.get('/leaderboard', adminProtect, controller.getLeaderboard);
router.get('/recent-activity', adminProtect, controller.getRecentActivity);

module.exports = router;
