const Heart = require('../models/Heart');

exports.getHeartRewards = async (req, res) => {
  const hearts = await Heart.find({ enemy_id: req.params.enemyId });
  res.json(hearts);
};