const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  const board = await Leaderboard.find()
    .populate("player_id")
    .sort({ score: -1 });

  res.json(board);
};