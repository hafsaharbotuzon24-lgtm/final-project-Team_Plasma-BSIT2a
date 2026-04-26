const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  battle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle', required: true },
  player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  input_answer: { type: String, required: true },
  is_correct: { type: Boolean },
  hearts_lost: { type: Number }
});
attemptSchema.index({ player_id: 1 });
attemptSchema.index({ battle_id: 1 });

module.exports = mongoose.model('Attempt', attemptSchema);