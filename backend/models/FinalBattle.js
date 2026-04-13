const mongoose = require('mongoose');

const finalBattleSchema = new mongoose.Schema({
    battle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle', required: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    chest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chest', required: true },
    score: { type: Number, default: 0 }
});

module.exports = mongoose.model('FinalBattle', finalBattleSchema);