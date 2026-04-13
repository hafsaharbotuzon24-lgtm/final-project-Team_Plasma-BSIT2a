const Player = require('../models/player');

// Create player
exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get my player
exports.getMyPlayer = async (req, res) => {
  const player = await Player.findById(req.player.id);
  res.json(player);
};

// Get all players
exports.getPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

// Get player
exports.getPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.json(player);
};

// Update player (level, hearts, etc.)
exports.updatePlayer = async (req, res) => {
  const player = await Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(player);
};