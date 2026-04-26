// Function to show/hide save button based on game state
function toggleSaveButton(isVisible) {
    const btn = document.getElementById('saveActionContainer');
    if (btn) btn.style.display = isVisible ? 'block' : 'none';
}

function triggerSaveFlow() {
    const confirmModal = new bootstrap.Modal(document.getElementById('saveConfirmModal'));
    confirmModal.show();
}

function executeGameSave() {
    // Hide confirmation
    const confirmEl = document.getElementById('saveConfirmModal');
    const modal = bootstrap.Modal.getInstance(confirmEl);
    if(modal) modal.hide();

    // SAVE DATA: 'gameState' is global in level1-logic.js
    localStorage.setItem('combatCoders_saveData', JSON.stringify(gameState));

    // Show Success Modal
    const successModal = new bootstrap.Modal(document.getElementById('saveSuccessModal'));
    successModal.show();

    // Auto-close success modal after 1.5s
    setTimeout(() => {
        successModal.hide();
    }, 1500);
}