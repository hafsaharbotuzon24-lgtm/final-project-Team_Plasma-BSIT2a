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

exports.updatePlayer = async (req, res) => {
  const player = await Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate("currentPath");

  res.json(player);
};