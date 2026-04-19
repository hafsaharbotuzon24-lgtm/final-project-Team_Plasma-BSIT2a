const Boss = require('../models/Boss');

// Create boss
exports.createBoss = async (req, res) => {
  try {
    const boss = await Boss.create(req.body);
    res.status(201).json(boss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get boss with FULL relationship chain
exports.getBoss = async (req, res) => {
  try {
    const boss = await Boss.findById(req.params.id)
      .populate({
        path: "finalBattle_id",
        populate: [
          { path: "battle_id" },
          { path: "room_id" },
          { path: "chest_id" }
        ]
      });

    res.json(boss);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};