const HINT_API_BASE = window.API_BASE_URL || 'http://localhost:5000';

async function syncHintSpend() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
        await fetch(`${HINT_API_BASE}/api/players/me/resources`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ hintsDelta: -1 })
        });
    } catch (err) {
        console.warn('Hint spend sync failed:', err.message);
    }
}

function triggerBattleHint() {
    // Hide save button while hint is shown
    if (typeof toggleSaveButton === "function") toggleSaveButton(false);

    if (gameState.hints > 0) {
        // Get current question data based on level
        let currentData;
        if (gameState.currentLevel === 1) {
            currentData = QUESTIONS[gameState.currentSite][battleQIndex];
        } else if (gameState.currentLevel === 2) {
            currentData = QUESTIONS_L2[gameState.currentSite][battleQIndex_L2];
        } else if (gameState.currentLevel === 3) {
            currentData = QUESTIONS_L3[gameState.currentSite][battleQIndex_L3];
        }
        
        if (!currentData) return;

        // Spend the hint
        gameState.hints--;
        syncHintSpend();
        
        // Sync UI
        updateUI(); 
        
        // Sync the counter inside the battle box
        const modalHintText = document.getElementById('modalHintCount');
        if (modalHintText) modalHintText.innerText = gameState.hints;

        // Show the standard Hint Modal
        const hintModalEl = document.getElementById('hintModal');
        if (hintModalEl) {
            const hModal = new bootstrap.Modal(hintModalEl);
            const hintTextField = document.getElementById('hintText');
            if (hintTextField) hintTextField.innerText = ""; 
            
            hModal.show();
            
            // Start typewriter after modal animation
            setTimeout(() => {
                runTypewriter(currentData.h, 'hintText');
            }, 400);
        }

    } else {
        // Trigger the "No More Hints" Modal
        const noHintsEl = document.getElementById('noHintsModal');
        if (noHintsEl) {
            const noHintsModal = new bootstrap.Modal(noHintsEl);
            noHintsModal.show();
        }
    }
}