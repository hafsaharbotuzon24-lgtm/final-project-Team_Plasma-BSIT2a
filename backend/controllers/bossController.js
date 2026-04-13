const Boss = require('../models/Boss');

exports.createBoss = async (req, res) => {
  const boss = await Boss.create(req.body);
  res.status(201).json(boss);
};

exports.getBoss = async (req, res) => {
  const boss = await Boss.findById(req.params.id);
  res.json(boss);
};