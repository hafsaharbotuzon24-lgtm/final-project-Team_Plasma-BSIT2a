const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const board = await Leaderboard.find()
    .populate("player_id", "username email level")
    .sort({ score: -1 })
    .limit(limit)
    .lean();

  res.json(board);
};