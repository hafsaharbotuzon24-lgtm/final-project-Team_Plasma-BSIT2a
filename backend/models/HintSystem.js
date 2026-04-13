const mongoose = require('mongoose');

const hintSchema = new mongoose.Schema({
  chest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chest', required: true },
  hint_text: { type: String, required: true },
  cost: { type: Number, required: true }
});

module.exports = mongoose.model('Hint', hintSchema);