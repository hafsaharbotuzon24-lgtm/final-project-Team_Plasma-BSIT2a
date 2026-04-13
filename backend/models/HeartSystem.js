const mongoose = require('mongoose');

const heartSchema = new mongoose.Schema({
  enemy_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Enemy', required: true },
  cost: { type: Number, required: true }
});

module.exports = mongoose.model('Heart', heartSchema);