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
      { new: true, runValidators: true }
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
    { new: true }
  ).populate("currentPath");

  res.json(player);
};