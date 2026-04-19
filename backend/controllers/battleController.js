const Battle = require('../models/Battle');

exports.createBattle = async (req, res) => {
  const battle = await Battle.create(req.body);
  res.status(201).json(battle);
};

exports.getBattlesByPlayer = async (req, res) => {
  try {
    const battles = await Battle.find({ player_id: req.params.playerId })
      .populate("player_id")
      .populate("path_id");

    res.json(battles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};