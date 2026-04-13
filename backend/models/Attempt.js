const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  battle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle', required: true },
  player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  input_answer: { type: String, required: true },
  is_correct: { type: Boolean },
  hearts_lost: { type: Number }
});

module.exports = mongoose.model('Attempt', attemptSchema);