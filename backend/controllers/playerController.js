const Player = require('../models/Player');

exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyPlayer = async (req, res) => {
  const player = await Player.findById(req.player.id)
    .select("-password")
    .populate("currentPath", "path_name difficulty_level")
    .lean();

  res.json(player);
};

exports.getPlayers = async (req, res) => {
  const players = await Player.find()
    .select("-password")
    .populate("currentPath", "path_name difficulty_level")
    .lean();

  res.json(players);
};

exports.getPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id)
    .select("-password")
    .populate("currentPath", "path_name difficulty_level")
    .lean();

  res.json(player);
};

/**
 * PATCH body: { questCompletedLevels?: number[], moduleQuiz?: { moduleId, correct, total } }
 * Merges quest levels; keeps best percentage per module quiz.
 */
exports.syncLearningProgress = async (req, res) => {
  try {
    const playerId = req.player?.id;
    if (!playerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { questCompletedLevels, moduleQuiz } = req.body || {};
    const hasQuestUpdate = Array.isArray(questCompletedLevels);
    const hasModuleUpdate = moduleQuiz && typeof moduleQuiz === 'object';
    if (!hasQuestUpdate && !hasModuleUpdate) {
      return res.status(400).json({ message: 'Provide questCompletedLevels and/or moduleQuiz' });
    }

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    if (hasQuestUpdate) {
      const nums = questCompletedLevels
        .map(Number)
        .filter((n) => Number.isFinite(n) && n >= 1 && n <= 500);
      const merged = [...new Set([...(player.questCompletedLevels || []), ...nums])].sort((a, b) => a - b);
      player.questCompletedLevels = merged;
    }

    if (hasModuleUpdate) {
      const mid = Number(moduleQuiz.moduleId);
      const correct = Number(moduleQuiz.correct);
      const total = Number(moduleQuiz.total);
      if (!Number.isFinite(mid) || !Number.isFinite(correct) || !Number.isFinite(total) || total < 1) {
        return res.status(400).json({ message: 'Invalid moduleQuiz (need moduleId, correct, total)' });
      }
      if (correct < 0 || correct > total) {
        return res.status(400).json({ message: 'Invalid moduleQuiz scores' });
      }

      const pct = correct / total;
      const arr = player.moduleQuizzes || [];
      const idx = arr.findIndex((m) => m.moduleId === mid);
      const entry = {
        moduleId: mid,
        correct,
        total,
        completedAt: new Date()
      };
      if (idx === -1) {
        arr.push(entry);
      } else {
        const oldPct = arr[idx].correct / arr[idx].total;
        if (pct >= oldPct) {
          arr[idx] = entry;
        }
      }
      player.moduleQuizzes = arr;
    }

    await player.save();
    const safe = player.toObject();
    delete safe.password;
    return res.json(safe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateMyResources = async (req, res) => {
  try {
    const playerId = req.player?.id;
    if (!playerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const heartsDelta = Number(req.body?.heartsDelta) || 0;
    const hintsDelta = Number(req.body?.hintsDelta) || 0;

    const update = {};
    if (heartsDelta || hintsDelta) {
      update.$inc = {};
      if (heartsDelta) update.$inc.hearts = heartsDelta;
      if (hintsDelta) update.$inc.hints = hintsDelta;
    }

    if (Number.isFinite(Number(req.body?.hearts))) {
      update.$set = update.$set || {};
      update.$set.hearts = Number(req.body.hearts);
    }
    if (Number.isFinite(Number(req.body?.hints))) {
      update.$set = update.$set || {};
      update.$set.hints = Number(req.body.hints);
    }
    if (Number.isFinite(Number(req.body?.level))) {
      update.$set = update.$set || {};
      update.$set.level = Number(req.body.level);
    }

    if (!update.$inc && !update.$set) {
      return res.status(400).json({ message: 'No valid resource fields provided' });
    }

    const player = await Player.findByIdAndUpdate(
    playerId,
    update,
    { returnDocument: 'after', runValidators: true } 
    )
    .select('-password')
    .lean();

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    return res.json(player);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updatePlayer = async (req, res) => {
  const player = await Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }  
  ).populate("currentPath");

  res.json(player);
};

exports.changePassword = async (req, res) => {
  try {
    const playerId = req.player?.id;
    if (!playerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old password and new password are required' });
    }

    const bcrypt = require('bcryptjs');

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, player.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    player.password = hashedPassword;
    await player.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMyAccount = async (req, res) => {
  try {
    const playerId = req.player?.id;
    if (!playerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const player = await Player.findByIdAndDelete(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ message: 'Player deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMyAvatar = async (req, res) => {
  try {
    const playerId = req.player?.id;
    if (!playerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { avatar } = req.body || {};
    if (typeof avatar !== 'string' || avatar.length === 0) {
      return res.status(400).json({ message: 'avatar string is required' });
    }

    // Limit avatar size to ~2 MB when base64-encoded
    if (avatar.length > 2.7e6) {
      return res.status(400).json({ message: 'Avatar image too large (max ~2 MB)' });
    }

    const player = await Player.findByIdAndUpdate(
      playerId,
      { avatar },
      { returnDocument: 'after', runValidators: true }
    ).select('-password').lean();

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    return res.json({ avatar: player.avatar });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};