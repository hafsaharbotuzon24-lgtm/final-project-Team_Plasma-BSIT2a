const SaveSlot = require('../models/SaveSlot');

function normalizeSlot(slotRaw) {
  const slot = Number(slotRaw);
  if (!Number.isInteger(slot) || slot < 1 || slot > 3) return null;
  return slot;
}

exports.upsertSaveSlot = async (req, res) => {
  try {
    const playerId = req.player?.id;
    const slot = normalizeSlot(req.params.slotNumber);

    if (!playerId) return res.status(401).json({ message: 'Unauthorized' });
    if (!slot) return res.status(400).json({ message: 'slotNumber must be 1-3' });

    const payload = {
      player_id: playerId,
      slot,
      playerName: req.body?.playerName || '',
      playerEmail: req.body?.playerEmail || '',
      playerAvatar: req.body?.playerAvatar || '',
      character: req.body?.character || 'witch',
      hearts: Number(req.body?.hearts) || 3,
      hints: Number(req.body?.hints) || 1,
      currentLevel: Number(req.body?.currentLevel) || 1,
      currentSite: Number(req.body?.currentSite) || 1,
      lastChoice: req.body?.lastChoice ?? null,
      gameTime: Number(req.body?.gameTime) || 0,
      formattedTime: req.body?.formattedTime || '0:00',
      savedAt: req.body?.savedAt ? new Date(req.body.savedAt) : new Date(),
      timestamp: Number(req.body?.timestamp) || Date.now()
    };

    const saveSlot = await SaveSlot.findOneAndUpdate(
      { player_id: playerId, slot },
      payload,
      { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return res.status(200).json({ message: 'Save slot synced', saveSlot });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSaveSlot = async (req, res) => {
  try {
    const playerId = req.player?.id;
    const slot = normalizeSlot(req.params.slotNumber);

    if (!playerId) return res.status(401).json({ message: 'Unauthorized' });
    if (!slot) return res.status(400).json({ message: 'slotNumber must be 1-3' });

    const saveSlot = await SaveSlot.findOne({ player_id: playerId, slot }).lean();
    if (!saveSlot) return res.status(404).json({ message: 'Save slot not found' });

    return res.json(saveSlot);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllSaveSlots = async (req, res) => {
  try {
    const playerId = req.player?.id;
    if (!playerId) return res.status(401).json({ message: 'Unauthorized' });

    const saveSlots = await SaveSlot.find({ player_id: playerId })
      .sort({ slot: 1 })
      .lean();

    return res.json(saveSlots);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteSaveSlot = async (req, res) => {
  try {
    const playerId = req.player?.id;
    const slot = normalizeSlot(req.params.slotNumber);

    if (!playerId) return res.status(401).json({ message: 'Unauthorized' });
    if (!slot) return res.status(400).json({ message: 'slotNumber must be 1-3' });

    await SaveSlot.findOneAndDelete({ player_id: playerId, slot });
    return res.json({ message: 'Save slot deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
