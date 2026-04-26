const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  attempt_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Attempt', required: true },
  completed: { type: Boolean, default: false },
  earned_hearts: { type: Number, default: 0 },
  earned_hints: { type: Number, default: 1 }
});
progressSchema.index({ player_id: 1 });
progressSchema.index({ attempt_id: 1 });

module.exports = mongoose.model('Progress', progressSchema);