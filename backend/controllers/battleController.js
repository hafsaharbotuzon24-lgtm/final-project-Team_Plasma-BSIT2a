const Battle = require('../models/Battle');

// Create battle
exports.createBattle = async (req, res) => {
  const battle = await Battle.create(req.body);
  res.status(201).json(battle);
};

// Get battles by player
exports.getBattlesByPlayer = async (req, res) => {
  const battles = await Battle.find({ player_id: req.params.playerId });
  res.json(battles);
};