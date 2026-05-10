const GameSettings = require('../models/GameSettings');

async function getSettings() {
  let settings = await GameSettings.findOne();
  if (!settings) {
    settings = await GameSettings.create({});
  }
  return settings;
}

// GET /api/game-settings 
exports.getSettings = async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/game-settings/quest 
exports.getQuestQuestions = async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings.questLevels || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/game-settings/modules 
exports.getModuleQuizzes = async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings.moduleQuizzes || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/game-settings/music 
exports.getMusicConfig = async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings.musicConfig || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/game-settings/quest 
exports.updateQuestQuestions = async (req, res) => {
  try {
    const settings = await getSettings();
    settings.questLevels = req.body.questLevels || [];
    settings.lastUpdated = new Date();
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/game-settings/modules 
exports.updateModuleQuizzes = async (req, res) => {
  try {
    const settings = await getSettings();
    settings.moduleQuizzes = req.body.moduleQuizzes || [];
    settings.lastUpdated = new Date();
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/game-settings/music 
exports.updateMusicConfig = async (req, res) => {
  try {
    const settings = await getSettings();
    settings.musicConfig = req.body.musicConfig || [];
    settings.lastUpdated = new Date();
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/game-settings/general 
exports.updateGeneralSettings = async (req, res) => {
  try {
    const settings = await getSettings();
    const { siteTitle, maxUsers, passingScore, maxAttempts } = req.body;
    if (siteTitle !== undefined) settings.siteTitle = siteTitle;
    if (maxUsers !== undefined) settings.maxUsers = maxUsers;
    if (passingScore !== undefined) settings.passingScore = passingScore;
    if (maxAttempts !== undefined) settings.maxAttempts = maxAttempts;
    settings.lastUpdated = new Date();
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
