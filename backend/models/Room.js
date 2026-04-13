const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true },
    storyline: { type: String, required: true }
});

module.exports = mongoose.model('Room', roomSchema);