const Hint = require('../models/Hint');

exports.getHintsByChest = async (req, res) => {
  const hints = await Hint.find({ chest_id: req.params.chestId });
  res.json(hints);
};