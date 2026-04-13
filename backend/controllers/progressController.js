const Progress = require('../models/Progress');

exports.createProgress = async (req, res) => {
  const progress = await Progress.create(req.body);
  res.status(201).json(progress);
};

exports.getProgressByPlayer = async (req, res) => {
  const progress = await Progress.find({ player_id: req.params.playerId });
  res.json(progress);
};