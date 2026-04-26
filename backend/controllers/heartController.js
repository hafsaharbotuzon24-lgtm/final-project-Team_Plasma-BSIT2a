const Heart = require('../models/Heart');

exports.getHeartRewards = async (req, res) => {
  const hearts = await Heart.find({ enemy_id: req.params.enemyId })
    .populate("enemy_id", "enemy_name enemy_health")
    .lean();

  res.json(hearts);
};