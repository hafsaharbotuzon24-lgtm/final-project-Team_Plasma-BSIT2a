const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const board = await Leaderboard.find()
    .populate("player_id", "username email level")
    .sort({ time_seconds: 1, score: -1 })
    .limit(limit)
    .lean();

  res.json(board);
};

exports.submitLeaderboardEntry = async (req, res) => {
  try {
    const playerId = req.player?.id;
    const rawTime = Number(req.body?.time_seconds);
    const rawScore = Number(req.body?.score);

    if (!playerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!Number.isFinite(rawTime) || rawTime <= 0) {
      return res.status(400).json({ message: 'time_seconds must be a positive number' });
    }

    const score = Number.isFinite(rawScore) ? rawScore : rawTime;

    const entry = await Leaderboard.findOneAndUpdate(
      { player_id: playerId },
      { player_id: playerId, time_seconds: rawTime, score },
      { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }
    )
      .populate('player_id', 'username email level')
      .lean();

    return res.status(201).json({ message: 'Leaderboard entry saved', entry });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};