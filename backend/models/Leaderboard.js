const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    score: { type: Number, default: 0 },
    rank_number: { type: Number }
});
leaderboardSchema.index({ score: -1 });
leaderboardSchema.index({ player_id: 1 });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);