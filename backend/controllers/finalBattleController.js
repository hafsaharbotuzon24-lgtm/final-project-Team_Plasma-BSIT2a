const FinalBattle = require('../models/FinalBattle');

exports.createFinalBattle = async (req, res) => {
  const fb = await FinalBattle.create(req.body);
  res.status(201).json(fb);
};

exports.getFinalBattle = async (req, res) => {
  const fb = await FinalBattle.findOne({
    battle_id: req.params.battleId
  })
    .populate("battle_id")
    .populate("room_id")
    .populate("chest_id");

  res.json(fb);
};