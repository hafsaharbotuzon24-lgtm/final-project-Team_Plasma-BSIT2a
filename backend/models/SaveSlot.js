const mongoose = require('mongoose');

const saveSlotSchema = new mongoose.Schema({
  player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  slot: { type: Number, required: true, min: 1, max: 3 },
  playerName: { type: String, default: '' },
  playerEmail: { type: String, default: '' },
  playerAvatar: { type: String, default: '' },
  character: { type: String, default: 'witch' },
  hearts: { type: Number, default: 3 },
  hints: { type: Number, default: 1 },
  currentLevel: { type: Number, default: 1 },
  currentSite: { type: Number, default: 1 },
  lastChoice: { type: String, default: null },
  gameTime: { type: Number, default: 0 },
  formattedTime: { type: String, default: '0:00' },
  savedAt: { type: Date, default: Date.now },
  timestamp: { type: Number, default: () => Date.now() }
}, { timestamps: true });

saveSlotSchema.index({ player_id: 1, slot: 1 }, { unique: true });

module.exports = mongoose.model('SaveSlot', saveSlotSchema);
