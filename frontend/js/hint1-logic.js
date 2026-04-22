function triggerBattleHint() {
    if (gameState.hints > 0) {
        // 1. Get current question data
        const currentData = QUESTIONS[gameState.currentSite][battleQIndex];
        if (!currentData) return;

        // 2. Spend the hint
        gameState.hints--;
        updateUI(); // Update main screen counter
        
        // 3. Sync the counter inside the battle box
        const modalHintText = document.getElementById('modalHintCount');
        if (modalHintText) modalHintText.innerText = gameState.hints;

        // 4. Show the standard Hint Modal
        const hintModalEl = document.getElementById('hintModal');
        const hModal = new bootstrap.Modal(hintModalEl);
        
        document.getElementById('hintText').innerText = ""; 
        hModal.show();
        
        // Start typewriter after a small delay for modal animation
        setTimeout(() => {
            runTypewriter(currentData.h, 'hintText');
        }, 400);

    } else {
        // 5. NEW: Trigger the "No More Hints" Modal
        const noHintsEl = document.getElementById('noHintsModal');
        const noHintsModal = new bootstrap.Modal(noHintsEl);
        noHintsModal.show();
    }
}