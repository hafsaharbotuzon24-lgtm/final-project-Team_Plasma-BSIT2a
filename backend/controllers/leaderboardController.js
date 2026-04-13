const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  const board = await Leaderboard.find().sort({ score: -1 });
  res.json(board);
};