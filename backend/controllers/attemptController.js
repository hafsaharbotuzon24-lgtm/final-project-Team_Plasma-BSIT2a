const Attempt = require('../models/Attempt');
const Player = require('../models/player');
const Battle = require('../models/Battle');

// Submit answer
exports.submitAttempt = async (req, res) => {
  try {
    const { player_id, battle_id, input_answer } = req.body;

    const player = await Player.findById(player_id);
    const battle = await Battle.findById(battle_id);

    const isCorrect =
      input_answer.toLowerCase() === battle.description.toLowerCase();

    let heartsLost = 0;

    if (!isCorrect) {
      player.hearts -= 1;
      heartsLost = 1;
    } else {
      player.level += 1;
      player.score += 10;
    }

    await player.save();

    const attempt = await Attempt.create({
      player_id,
      battle_id,
      input_answer,
      is_correct: isCorrect,
      hearts_lost: heartsLost
    });

    res.json({ attempt, player });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};