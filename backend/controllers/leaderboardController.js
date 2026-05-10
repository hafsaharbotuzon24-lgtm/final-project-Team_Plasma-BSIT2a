const Leaderboard = require('../models/Leaderboard');
const Player = require('../models/Player');

exports.getLeaderboard = async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 500, 500);
  const board = await Leaderboard.find()
    .populate("player_id", "username email level")
    .sort({ time_seconds: 1, score: -1 })
    .limit(limit)
    .lean();

  res.json(board);
};

exports.getQuestLeaderboard = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 500, 500);
    const players = await Player.find({})
      .select('username questCompletedLevels')
      .lean()
      .limit(limit);

    const questBoard = players
      .map(p => ({
        _id: p._id,
        username: p.username,
        completedLevels: Array.isArray(p.questCompletedLevels) ? p.questCompletedLevels.length : 0,
        questCompletedLevels: p.questCompletedLevels || []
      }))
      .filter(p => p.completedLevels > 0)
      .sort((a, b) => b.completedLevels - a.completedLevels);

    res.json(questBoard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
