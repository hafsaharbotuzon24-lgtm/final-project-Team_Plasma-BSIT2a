// ============================================================
// LOAD SLOT - Timer functions for loading saved games
// ============================================================

// Function to set game time from saved data (for loading saves)
function setSavedGameTime(seconds) {
    console.log(`setSavedGameTime called with ${seconds} seconds`);
    
    // Stop current timer
    if (typeof timerInterval !== 'undefined' && timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Set start time based on desired duration
    if (typeof gameStartTime !== 'undefined') {
        window.gameStartTime = Date.now() - (seconds * 1000);
    }
    if (typeof isGameActive !== 'undefined') {
        window.isGameActive = true;
    }
    if (typeof gameEndTime !== 'undefined') {
        window.gameEndTime = null;
    }
    
    // Restart timer display
    if (typeof startTimerDisplay === 'function') {
        startTimerDisplay();
    }
    
    // Save timer state
    if (typeof saveTimerState === 'function') {
        saveTimerState();
    }
    
    console.log(`Game time set to ${seconds} seconds`);
}

// Make sure functions are globally available
window.setSavedGameTime = setSavedGameTime;