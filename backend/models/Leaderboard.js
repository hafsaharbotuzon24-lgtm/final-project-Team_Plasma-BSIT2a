const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    score: { type: Number, default: 0 },
    rank_number: { type: Number }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);