const Chest = require('../models/Chest');

exports.createChest = async (req, res) => {
  const chest = await Chest.create(req.body);
  res.status(201).json(chest);
};

exports.getChestsByPath = async (req, res) => {
  const chests = await Chest.find({ path_id: req.params.pathId })
    .populate("path_id", "path_name difficulty_level")
    .lean();

  res.json(chests);
};

exports.getChest = async (req, res) => {
  const chest = await Chest.findById(req.params.id)
    .populate("path_id", "path_name difficulty_level")
    .lean();

  res.json(chest);
};