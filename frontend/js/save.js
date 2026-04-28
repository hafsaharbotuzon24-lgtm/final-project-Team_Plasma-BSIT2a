// save.js - Updated with visibility control
let saveIconTimeout = null;

function toggleSaveButton(isVisible) {
    const btn = document.getElementById('saveActionContainer');
    if (btn) {
        btn.style.display = isVisible ? 'block' : 'none';
        
        // Add pulse animation when visible
        if (isVisible) {
            btn.classList.add('save-pulse');
            if (saveIconTimeout) clearTimeout(saveIconTimeout);
            saveIconTimeout = setTimeout(() => {
                btn.classList.remove('save-pulse');
            }, 2000);
        }
    }
}

// Show save button only during card selection (not in battles/chests/rooms)
function updateSaveButtonVisibility() {
    const modalEl = document.getElementById('gameModal');
    const isModalOpen = modalEl && modalEl.classList.contains('show');
    const isInBattle = document.querySelector('.battle-container') !== null;
    const isInChest = document.querySelector('.chest-container') !== null;
    const isInRoom = document.querySelector('.room-container') !== null;
    
    // Show save button only when on main game screen (cards visible) and no modals open
    const shouldShow = !isModalOpen && !isInBattle && !isInChest && !isInRoom;
    toggleSaveButton(shouldShow);
}

function triggerSaveFlow() {
    // Show slot selection modal
    const slotsHtml = `
        <div class="modal fade" id="saveSlotModal" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border border-4 border-warning bg-black rounded-0">
                    <div class="modal-header border-bottom border-warning">
                        <h3 class="pixel-font text-warning m-0">SELECT SAVE SLOT</h3>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="d-flex flex-column gap-3">
                            <button class="btn btn-outline-warning pixel-font p-3" onclick="saveToSlot(1)">
                                📀 SLOT 01
                            </button>
                            <button class="btn btn-outline-warning pixel-font p-3" onclick="saveToSlot(2)">
                                📀 SLOT 02
                            </button>
                            <button class="btn btn-outline-warning pixel-font p-3" onclick="saveToSlot(3)">
                                📀 SLOT 03
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('saveSlotModal');
    if (existingModal) existingModal.remove();
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', slotsHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('saveSlotModal'));
    modal.show();
    
    // Clean up when hidden
    document.getElementById('saveSlotModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

function saveToSlot(slotNumber) {
    // Hide the modal
    const modalEl = document.getElementById('saveSlotModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    
    // Execute save
    if (typeof saveGameToSlot === 'function') {
        saveGameToSlot(slotNumber);
        
        // Show success message
        const successHtml = `
            <div class="modal fade" id="saveSuccessModalTemp" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border border-4 border-success bg-black rounded-0">
                        <div class="modal-body text-center p-4">
                            <h2 class="pixel-font text-success">✓ SAVED TO SLOT ${slotNumber}!</h2>
                            <p class="text-white mt-2">Your progress has been saved.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHtml);
        const successModal = new bootstrap.Modal(document.getElementById('saveSuccessModalTemp'));
        successModal.show();
        
        setTimeout(() => {
            successModal.hide();
            setTimeout(() => {
                document.getElementById('saveSuccessModalTemp')?.remove();
            }, 300);
        }, 1500);
    }
}

function executeGameSave() {
    const confirmEl = document.getElementById('saveConfirmModal');
    const modal = bootstrap.Modal.getInstance(confirmEl);
    if(modal) modal.hide();
    
    // Show slot selection instead of direct save
    triggerSaveFlow();
}

// Monitor for save button visibility
setInterval(updateSaveButtonVisibility, 500);

// Also check when modals open/close
document.addEventListener('shown.bs.modal', () => {
    setTimeout(updateSaveButtonVisibility, 100);
});

document.addEventListener('hidden.bs.modal', () => {
    setTimeout(updateSaveButtonVisibility, 100);
});

// Add pulse animation CSS
const style = document.createElement('style');
style.textContent = `
    .save-pulse {
        animation: savePulse 0.5s ease-in-out 3;
    }
    
    @keyframes savePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); filter: drop-shadow(0 0 10px gold); }
    }
`;
document.head.appendChild(style);