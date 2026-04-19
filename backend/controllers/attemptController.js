const Attempt = require('../models/Attempt');
const Player = require('../models/Player');
const Battle = require('../models/Battle');

// Submit attempt
exports.submitAttempt = async (req, res) => {
  try {
    const { player_id, battle_id, input_answer } = req.body;

    const player = await Player.findById(player_id);
    const battle = await Battle.findById(battle_id);

    if (!player || !battle) {
      return res.status(404).json({ message: "Player or Battle not found" });
    }

    const isCorrect =
      input_answer?.toLowerCase() === battle.description?.toLowerCase();

    let heartsLost = 0;

    if (!isCorrect) {
      player.hearts = Math.max(0, player.hearts - 1);
      heartsLost = 1;
    } else {
      player.level += 1;
    }

    await player.save();

    const attempt = await Attempt.create({
      player_id,
      battle_id,
      input_answer,
      is_correct: isCorrect,
      hearts_lost: heartsLost
    });

    const fullAttempt = await Attempt.findById(attempt._id)
      .populate("player_id")
      .populate("battle_id");

    res.json(fullAttempt);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};