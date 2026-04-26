const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true },
    storyline: { type: String, required: true }
});
roomSchema.index({ path_id: 1 });

module.exports = mongoose.model('Room', roomSchema);