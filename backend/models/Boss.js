const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema({
  finalBattle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FinalBattle', required: true },
  boss_name: { type: String, required: true },
  boss_health: { type: Number, required: true }
});

module.exports = mongoose.model('Boss', bossSchema);