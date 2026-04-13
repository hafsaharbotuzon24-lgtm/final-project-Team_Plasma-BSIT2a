const mongoose = require('mongoose');

const chestSchema = new mongoose.Schema({
    path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true },
});

module.exports = mongoose.model('Chest', chestSchema);