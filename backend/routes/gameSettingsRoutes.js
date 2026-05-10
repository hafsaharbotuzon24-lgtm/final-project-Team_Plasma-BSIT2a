const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameSettingsController');
const { adminProtect } = require('../middleware/adminMiddleware');

// Public routes 
router.get('/', controller.getSettings);
router.get('/quest', controller.getQuestQuestions);
router.get('/modules', controller.getModuleQuizzes);
router.get('/music', controller.getMusicConfig);

// Admin-only routes
router.put('/quest', adminProtect, controller.updateQuestQuestions);
router.put('/modules', adminProtect, controller.updateModuleQuizzes);
router.put('/music', adminProtect, controller.updateMusicConfig);
router.put('/general', adminProtect, controller.updateGeneralSettings);

module.exports = router;
