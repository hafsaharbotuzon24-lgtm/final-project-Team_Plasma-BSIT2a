const Heart = require('../models/Heart');

exports.getHeartRewards = async (req, res) => {
  const hearts = await Heart.find({ enemy_id: req.params.enemyId })
    .populate("enemy_id");

  res.json(hearts);
};