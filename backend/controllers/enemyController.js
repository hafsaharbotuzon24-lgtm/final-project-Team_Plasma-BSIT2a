const Enemy = require('../models/Enemy');

exports.createEnemy = async (req, res) => {
  const enemy = await Enemy.create(req.body);
  res.status(201).json(enemy);
};

exports.getEnemiesByBattle = async (req, res) => {
  const enemies = await Enemy.find({ battle_id: req.params.battleId });
  res.json(enemies);
};