const Player = require('../models/Player');
const Progress = require('../models/Progress');
const Leaderboard = require('../models/Leaderboard');
const Attempt = require('../models/Attempt');
const SaveSlot = require('../models/SaveSlot');

// GET /api/admin/stats - Dashboard overview statistics
exports.getStats = async (req, res) => {
  try {
    const totalPlayers = await Player.countDocuments();
    const totalProgress = await Progress.countDocuments();
    const completedProgress = await Progress.countDocuments({ completed: true });
    const avgLevelAgg = await Player.aggregate([
      { $group: { _id: null, avgLevel: { $avg: '$level' } } }
    ]);
    const avgLevel = avgLevelAgg.length ? Math.round(avgLevelAgg[0].avgLevel * 10) / 10 : 0;

    // Recent players (last 10)
    const recentPlayers = await Player.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Players per level distribution
    const levelDist = await Player.aggregate([
      { $group: { _id: '$level', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const [learnAgg] = await Player.aggregate([
      {
        $project: {
          qn: { $size: { $ifNull: ['$questCompletedLevels', []] } },
          mn: { $size: { $ifNull: ['$moduleQuizzes', []] } }
        }
      },
      {
        $group: {
          _id: null,
          playersWithQuest: {
            $sum: { $cond: [{ $gt: ['$qn', 0] }, 1, 0] }
          },
          playersWithModules: {
            $sum: { $cond: [{ $gt: ['$mn', 0] }, 1, 0] }
          },
          totalQuestLevelsDone: { $sum: '$qn' },
          totalModuleQuizRows: { $sum: '$mn' }
        }
      }
    ]);

    res.json({
      totalPlayers,
      totalProgress,
      completedProgress,
      avgLevel,
      recentPlayers,
      levelDistribution: levelDist,
      learning: learnAgg || {
        playersWithQuest: 0,
        playersWithModules: 0,
        totalQuestLevelsDone: 0,
        totalModuleQuizRows: 0
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/players - List all players with pagination & search
exports.getPlayers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const search = String(req.query.search || '').trim();
    const sort = String(req.query.sort || 'createdAt');
    const order = req.query.order === 'asc' ? 1 : -1;

    const filter = {};
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Player.countDocuments(filter);
    const players = await Player.find(filter)
      .select('-password')
      .populate('currentPath', 'path_name difficulty_level')
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      players,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/players/:id - Get single player detail with progress
exports.getPlayerDetail = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .select('-password')
      .populate('currentPath', 'path_name difficulty_level')
      .lean();

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Get player progress
    const progress = await Progress.find({ player_id: player._id })
      .populate('attempt_id', 'battle_id input_answer is_correct hearts_lost')
      .lean();

    // Get leaderboard entry
    const leaderboardEntry = await Leaderboard.findOne({ player_id: player._id })
      .lean();

    // Progress stats
    const totalAttempts = progress.length;
    const completedAttempts = progress.filter(p => p.completed).length;
    const totalEarnedHearts = progress.reduce((sum, p) => sum + (p.earned_hearts || 0), 0);
    const totalEarnedHints = progress.reduce((sum, p) => sum + (p.earned_hints || 0), 0);

    res.json({
      player,
      progress,
      leaderboardEntry,
      progressStats: {
        totalAttempts,
        completedAttempts,
        totalEarnedHearts,
        totalEarnedHints,
        completionRate: totalAttempts > 0 ? Math.round((completedAttempts / totalAttempts) * 100) : 0
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/players/:id - Update a player (level, hearts, hints, email)
exports.updatePlayer = async (req, res) => {
  try {
    const allowedFields = [
      'level',
      'hearts',
      'hints',
      'email',
      'username',
      'questCompletedLevels',
      'moduleQuizzes'
    ];
    const update = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        update[field] = req.body[field];
      }
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { returnDocument: 'after', runValidators: true }
    ).select('-password').lean();

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/players/:id - Delete a player and their related data
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Clean up related data
    await Progress.deleteMany({ player_id: req.params.id });
    await Leaderboard.deleteMany({ player_id: req.params.id });
    await Attempt.deleteMany({ player_id: req.params.id });
    await SaveSlot.deleteMany({ player_id: req.params.id });

    res.json({ message: 'Player and related data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/leaderboard - Full leaderboard for admin
exports.getLeaderboard = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const board = await Leaderboard.find()
      .populate('player_id', 'username email level')
      .sort({ score: -1, time_seconds: 1 })
      .limit(limit)
      .lean();

    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/recent-activity - Recent player registrations and progress
exports.getRecentActivity = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    // Recent registrations
    const recentPlayers = await Player.find()
      .select('username email createdAt')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Recent progress completions
    const recentProgress = await Progress.find({ completed: true })
      .populate('player_id', 'username email')
      .sort({ _id: -1 })
      .limit(limit)
      .lean();

    const activities = [];

    recentPlayers.forEach(p => {
      activities.push({
        type: 'registration',
        username: p.username,
        email: p.email,
        timestamp: p.createdAt
      });
    });

    recentProgress.forEach(p => {
      if (p.player_id) {
        activities.push({
          type: 'completion',
          username: p.player_id.username,
          earned_hearts: p.earned_hearts,
          earned_hints: p.earned_hints,
          timestamp: p._id.getTimestamp()
        });
      }
    });

    // Sort by timestamp descending
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(activities.slice(0, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/login - Admin login (issues admin JWT)
// GET /api/admin/analytics — charts data (quest mode + HTML modules)
exports.getAnalytics = async (req, res) => {
  try {
    const moduleQuizByModule = await Player.aggregate([
      { $match: { moduleQuizzes: { $exists: true, $ne: [] } } },
      { $unwind: '$moduleQuizzes' },
      {
        $group: {
          _id: '$moduleQuizzes.moduleId',
          players: { $sum: 1 },
          avgPct: {
            $avg: {
              $multiply: [
                { $divide: ['$moduleQuizzes.correct', '$moduleQuizzes.total'] },
                100
              ]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const questLevels = await Player.aggregate([
      { $match: { questCompletedLevels: { $exists: true, $ne: [] } } },
      { $unwind: '$questCompletedLevels' },
      { $group: { _id: '$questCompletedLevels', completions: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const last7d = new Date();
    last7d.setDate(last7d.getDate() - 7);
    const registrationsByDay = await Player.aggregate([
      { $match: { createdAt: { $gte: last7d } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      moduleQuizByModule,
      questLevelsCompleted: questLevels,
      registrationsByDay
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: 'admin', username: ADMIN_USERNAME, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      admin: { username: ADMIN_USERNAME, role: 'admin' }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
