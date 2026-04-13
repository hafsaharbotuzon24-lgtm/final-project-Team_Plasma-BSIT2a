const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  currentPath: { type: mongoose.Schema.Types.ObjectId, ref: 'Path' },

  hearts: { type: Number, default: 3 },
  hints: { type: Number, default: 1 },
  level: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);