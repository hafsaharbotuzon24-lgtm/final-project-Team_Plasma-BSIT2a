const express = require('express');
const router = express.Router();
const controller = require('../controllers/saveSlotController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, controller.getAllSaveSlots);
router.get('/:slotNumber', protect, controller.getSaveSlot);
router.put('/:slotNumber', protect, controller.upsertSaveSlot);
router.delete('/:slotNumber', protect, controller.deleteSaveSlot);

module.exports = router;
