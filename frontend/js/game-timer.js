// ============================================================
// GAME TIMER - Simple and Reliable
// ============================================================

let gameStartTime = null;
let timerInterval = null;
let isGameActive = false;
let finalStoredTime = 0; 

const TIMER_DEBUG = true;

function getScopedLoadSaveSlot() {
    const playerId = localStorage.getItem('playerId');
    if (playerId) {
        const scoped = localStorage.getItem(`loadSaveSlot:${playerId}`);
        if (scoped) return scoped;
    }
    return localStorage.getItem('loadSaveSlot');
}

function logTimer(message) {
    if (TIMER_DEBUG) {
        console.log(`[TIMER] ${message}`);
    }
}

// Display the current time on screen
function updateTimerDisplay() {
    const timerElement = document.getElementById('gameTimer');
    if (!timerElement) return;
    
    if (!isGameActive || gameStartTime === null) {
        
        if (finalStoredTime > 0) {
            const mins = Math.floor(finalStoredTime / 60);
            const secs = finalStoredTime % 60;
            timerElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        } else {
            timerElement.textContent = '0:00';
        }
        return;
    }
    
    const seconds = Math.floor((Date.now() - gameStartTime) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Start the timer (called once when game begins)
function startGameTimer() {
    if (gameStartTime !== null && isGameActive) {
        logTimer('Timer already running');
        return;
    }
    
    gameStartTime = Date.now();
    isGameActive = true;
    finalStoredTime = 0;
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(updateTimerDisplay, 1000);
    updateTimerDisplay();
    logTimer('Timer STARTED at 0:00');
}

// Stop the timer and return final duration (for game completion)
function stopGameTimer() {
    
    const duration = getGameDuration();
    finalStoredTime = duration;
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isGameActive = false;
    
    
    updateTimerDisplay();
    logTimer(`Timer STOPPED - Final duration: ${duration}s (${getFormattedDuration()})`);
    
    return duration; 
}

// Pause timer (when leaving page - keeps time for return)
function pauseGameTimer() {
    if (isGameActive && gameStartTime !== null) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        const elapsed = getGameDuration();
        isGameActive = false;
        logTimer(`Timer PAUSED at ${getFormattedDuration()}`);
        return elapsed;
    }
    return 0;
}

// Resume timer (when returning to page)
function resumeGameTimer() {
    if (!isGameActive && gameStartTime !== null) {
        isGameActive = true;
        timerInterval = setInterval(updateTimerDisplay, 1000);
        updateTimerDisplay();
        logTimer(`Timer RESUMED at ${getFormattedDuration()}`);
    }
}

function getGameDuration() {
    if (gameStartTime === null) return finalStoredTime || 0;
    return Math.floor((Date.now() - gameStartTime) / 1000);
}

function getFormattedDuration() {
    const seconds = getGameDuration();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function isTimerRunning() {
    return isGameActive && gameStartTime !== null;
}

function getCurrentGameTimeForSave() {
    return getGameDuration();
}

// Set timer from saved data (when loading a save)
function setSavedGameTime(seconds) {
    logTimer(`Setting timer to ${seconds} seconds`);
    gameStartTime = Date.now() - (seconds * 1000);
    isGameActive = true;
    finalStoredTime = 0;
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimerDisplay, 1000);
    updateTimerDisplay();
    logTimer(`Timer set to ${getFormattedDuration()}`);
}

// Reset timer for new game
function resetGameTimer() {
    logTimer('Resetting timer for new game');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    gameStartTime = null;
    isGameActive = false;
    finalStoredTime = 0;
    updateTimerDisplay();
}

// Initialize timer on page load
function initGameTimer() {
    logTimer('Page loaded - checking play.html');
    
    const isOnPlayPage = window.location.pathname.includes('play.html') || 
                         window.location.pathname.endsWith('play');
    
    if (!isOnPlayPage) {
        logTimer('Not on play page - timer inactive');
        return;
    }
    
    
    const savedData = getScopedLoadSaveSlot();
    if (savedData) {
        try {
            const saveData = JSON.parse(savedData);
            if (saveData.gameTime && saveData.gameTime > 0) {
                logTimer(`Found saved game with time: ${saveData.gameTime} seconds`);
                setSavedGameTime(saveData.gameTime);
                return;
            }
        } catch(e) {}
    }
    
    // No saved game, start fresh timer
    startGameTimer();
}

// Handle page visibility (tab switch)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        logTimer('Tab hidden - pausing timer display');
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    } else {
        logTimer('Tab visible - resuming timer display');
        if (isGameActive && gameStartTime !== null) {
            timerInterval = setInterval(updateTimerDisplay, 1000);
            updateTimerDisplay();
        }
    }
});

// Handle page unload (closing tab, navigating away)
window.addEventListener('beforeunload', function() {
    logTimer('Page unloading - stopping timer completely');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isGameActive = false;
    gameStartTime = null;
});

// Handle navigation away from play.html
function checkAndStopTimerOnNavigate() {
    const isOnPlayPage = window.location.pathname.includes('play.html') || 
                         window.location.pathname.endsWith('play');
    
    if (!isOnPlayPage && (isGameActive || gameStartTime !== null)) {
        logTimer('Navigating away from play.html - stopping timer');
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        isGameActive = false;
        gameStartTime = null;
    }
}

// Monitor navigation
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
    originalPushState.apply(this, arguments);
    setTimeout(checkAndStopTimerOnNavigate, 50);
};

history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    setTimeout(checkAndStopTimerOnNavigate, 50);
};

window.addEventListener('popstate', function() {
    setTimeout(checkAndStopTimerOnNavigate, 50);
});

// Check when clicking navigation buttons
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.home-btn, .play-btn, .leaderboard-btn, .learn-btn, .settings-btn');
    if (btn) {
        setTimeout(checkAndStopTimerOnNavigate, 50);
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGameTimer);
} else {
    initGameTimer();
}

// Make functions global
window.startGameTimer = startGameTimer;
window.stopGameTimer = stopGameTimer;
window.pauseGameTimer = pauseGameTimer;
window.resumeGameTimer = resumeGameTimer;
window.resetGameTimer = resetGameTimer;
window.getGameDuration = getGameDuration;
window.getFormattedDuration = getFormattedDuration;
window.isTimerRunning = isTimerRunning;
window.getCurrentGameTimeForSave = getCurrentGameTimeForSave;
window.setSavedGameTime = setSavedGameTime;

logTimer('Game timer script loaded');