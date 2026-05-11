const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  currentPath: { type: mongoose.Schema.Types.ObjectId, ref: 'Path' },

  hearts: { type: Number, default: 3 },
  hints: { type: Number, default: 1 },
  level: { type: Number, default: 0 },

  /** Profile avatar — preset path or base64 data URI */
  avatar: { type: String, default: '' },

  /** Quest Mode (HTML levels 1–25): completed level ids */
  questCompletedLevels: { type: [Number], default: [] },
  /** Learn → HTML Modules quiz attempts (best score per module kept server-side) */
  moduleQuizzes: [{
    moduleId: { type: Number, required: true },
    correct: { type: Number, required: true },
    total: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);