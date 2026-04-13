const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
  path_name: { type: String, required: true },
  difficulty_level: { type: Number, required: true },
  player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
});

module.exports = mongoose.model('Path', pathSchema);