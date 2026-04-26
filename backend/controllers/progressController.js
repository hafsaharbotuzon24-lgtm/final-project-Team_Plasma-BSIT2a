const Progress = require('../models/Progress');

exports.createProgress = async (req, res) => {
  const progress = await Progress.create(req.body);
  res.status(201).json(progress);
};

exports.getProgressByPlayer = async (req, res) => {
  const progress = await Progress.find({ player_id: req.params.playerId })
    .populate("player_id", "username email level")
    .populate("attempt_id", "battle_id input_answer is_correct hearts_lost")
    .lean();

  res.json(progress);
};