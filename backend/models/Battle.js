const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
    player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true },
    description: { type: String },
    reward_hearts: { type: Number },
    reward_hints: { type: Number },
});

module.exports = mongoose.model('Battle', battleSchema);