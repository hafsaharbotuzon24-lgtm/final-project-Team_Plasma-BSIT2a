const mongoose = require('mongoose');

const enemySchema = new mongoose.Schema({
  battle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle', required: true },
  enemy_name: { type: String, required: true },
  enemy_health: { type: Number, required: true }
});
enemySchema.index({ battle_id: 1 });

module.exports = mongoose.model('Enemy', enemySchema);