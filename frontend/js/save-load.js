// ============================================================
// SAVE/LOAD SYSTEM
// ============================================================

const SAVE_SLOTS_KEY = 'combatCoders_saveSlots';
const API_BASE = window.API_BASE_URL || 'http://localhost:5000';

function getAuthToken() {
    return localStorage.getItem('authToken');
}

async function syncSaveToBackend(slotNumber, saveData) {
    const token = getAuthToken();
    if (!token) return false;

    try {
        const response = await fetch(`${API_BASE}/api/save-slots/${slotNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(saveData)
        });
        return response.ok;
    } catch (err) {
        console.warn('Save slot backend sync failed:', err.message);
        return false;
    }
}

async function fetchBackendSaveSlot(slotNumber) {
    const token = getAuthToken();
    if (!token) return null;

    try {
        const response = await fetch(`${API_BASE}/api/save-slots/${slotNumber}`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include'
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (err) {
        console.warn('Load slot from backend failed:', err.message);
        return null;
    }
}

async function fetchAllBackendSaveSlots() {
    const token = getAuthToken();
    if (!token) return [];

    try {
        const response = await fetch(`${API_BASE}/api/save-slots`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include'
        });
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.warn('Failed to fetch backend save slots:', err.message);
        return [];
    }
}

// Save data structure
// Save data structure
function createSaveData(slotNumber) {
    // Get current game time from timer
    let currentTime = 0;
    let formattedTime = '0:00';
    
    if (typeof getCurrentGameTimeForSave === 'function') {
        currentTime = getCurrentGameTimeForSave();
        formattedTime = getFormattedDuration();
    } else if (typeof getGameDuration === 'function') {
        currentTime = getGameDuration();
        formattedTime = getFormattedDuration();
    }
    
    return {
        slot: slotNumber,
        playerName: localStorage.getItem('playerUserName') || 'CombatCoder_01',
        playerEmail: localStorage.getItem('playerEmail') || 'player@plasma.com',
        playerAvatar: localStorage.getItem('playerAvatar') || 'img/player-profile.png',
        character: gameState ? gameState.character : localStorage.getItem('selectedCharacter') || 'witch',
        hearts: gameState ? gameState.hearts : 3,
        hints: gameState ? gameState.hints : 1,
        currentLevel: gameState ? gameState.currentLevel : 1,
        currentSite: gameState ? gameState.currentSite : 1,
        lastChoice: gameState ? gameState.lastChoice : null,
        gameTime: currentTime,
        formattedTime: formattedTime,
        savedAt: new Date().toISOString(),
        timestamp: Date.now()
    };
}
function saveGameToSlot(slotNumber) {
    const saveData = createSaveData(slotNumber);
    
    // Get existing saves
    let saves = JSON.parse(localStorage.getItem(SAVE_SLOTS_KEY) || '{}');
    saves[slotNumber] = saveData;
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(saves));

    syncSaveToBackend(slotNumber, saveData);
    
    console.log(`Game saved to slot ${slotNumber}`, saveData);
    return true;
}

async function loadGameFromSlot(slotNumber) {
    const saves = JSON.parse(localStorage.getItem(SAVE_SLOTS_KEY) || '{}');
    let saveData = saves[slotNumber];
    
    if (!saveData) {
        const remoteSave = await fetchBackendSaveSlot(slotNumber);
        if (remoteSave) {
            saveData = remoteSave;
            saves[slotNumber] = remoteSave;
            localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(saves));
        }
    }
    
    if (!saveData) {
        console.log(`No save data found in slot ${slotNumber}`);
        return false;
    }
    
    // Store save data to be loaded on play.html
    localStorage.setItem('loadSaveSlot', JSON.stringify(saveData));
    
    console.log(`Game data prepared for loading from slot ${slotNumber}`, saveData);
    
    // Show success modal
    const successModal = new bootstrap.Modal(document.getElementById('loadSuccessModal'));
    successModal.show();
    
    // Redirect to play page after short delay
    setTimeout(() => {
        window.location.href = 'play.html';
    }, 1500);
    
    return true;
}

// Function to load saved data on play.html
// Function to load saved data on play.html
function applyLoadedSave() {
    const savedData = localStorage.getItem('loadSaveSlot');
    if (!savedData) return false;
    
    try {
        const saveData = JSON.parse(savedData);
        
        // Apply saved data to gameState
        if (typeof gameState !== 'undefined') {
            gameState.character = saveData.character;
            gameState.hearts = saveData.hearts;
            gameState.hints = saveData.hints;
            gameState.currentLevel = saveData.currentLevel;
            gameState.currentSite = saveData.currentSite;
            gameState.lastChoice = saveData.lastChoice;
        }
        
        // Apply player data
        localStorage.setItem('playerUserName', saveData.playerName);
        localStorage.setItem('playerEmail', saveData.playerEmail);
        localStorage.setItem('playerAvatar', saveData.playerAvatar);
        localStorage.setItem('selectedCharacter', saveData.character);
        
        // Apply timer time - CRITICAL FIX
        if (saveData.gameTime && saveData.gameTime > 0) {
            if (typeof setSavedGameTime === 'function') {
                setSavedGameTime(saveData.gameTime);
            } else {
                // Direct timer manipulation if function not available
                if (typeof gameStartTime !== 'undefined') {
                    gameStartTime = Date.now() - (saveData.gameTime * 1000);
                    isGameActive = true;
                    gameEndTime = null;
                    if (typeof startTimerDisplay === 'function') {
                        startTimerDisplay();
                    }
                    if (typeof saveTimerState === 'function') {
                        saveTimerState();
                    }
                }
            }
            console.log(`Timer restored to ${saveData.formattedTime} (${saveData.gameTime} seconds)`);
        }
        
        // Clear the saved slot data after loading
        localStorage.removeItem('loadSaveSlot');
        
        console.log('Save data applied successfully', saveData);
        
        // Update UI if function exists
        if (typeof updateUI === 'function') {
            updateUI();
        }
        
        return true;
    } catch (e) {
        console.error('Error applying save data:', e);
        return false;
    }
}

async function deleteSaveSlot(slotNumber) {
    // Show custom delete confirmation modal
    const modalHtml = `
        <div class="modal fade" id="deleteConfirmModal" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border border-4 border-danger bg-black rounded-0">
                    <div class="modal-header border-bottom border-danger">
                        <h3 class="pixel-font text-danger m-0">⚠️ DELETE SAVE ⚠️</h3>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center p-4">
                        <p class="text-white pixel-font fs-5 mb-3">Are you sure you want to delete this save file?</p>
                        <p class="text-warning pixel-font mb-4">This action cannot be undone!</p>
                        <div class="d-flex gap-3 justify-content-center">
                            <button class="btn btn-danger pixel-font px-4 py-2" onclick="confirmDeleteSlot(${slotNumber})">
                                YES, DELETE
                            </button>
                            <button class="btn btn-secondary pixel-font px-4 py-2" data-bs-dismiss="modal">
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('deleteConfirmModal');
    if (existingModal) existingModal.remove();
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    modal.show();
    
    // Clean up when hidden
    document.getElementById('deleteConfirmModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

function confirmDeleteSlot(slotNumber) {
    // Close the modal
    const modalEl = document.getElementById('deleteConfirmModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    
    // Delete the save
    const saves = JSON.parse(localStorage.getItem(SAVE_SLOTS_KEY) || '{}');
    delete saves[slotNumber];
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(saves));
    loadAllSlots();

    const token = getAuthToken();
    if (token) {
        fetch(`${API_BASE}/api/save-slots/${slotNumber}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include'
        }).catch((err) => console.warn('Delete backend save failed:', err.message));
    }
    
    // Show success message
    const successHtml = `
        <div class="modal fade" id="deleteSuccessModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border border-4 border-success bg-black rounded-0">
                    <div class="modal-body text-center p-4">
                        <h2 class="pixel-font text-success">✓ SAVE DELETED!</h2>
                        <p class="text-white mt-2">Slot ${slotNumber} has been cleared.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHtml);
    const successModal = new bootstrap.Modal(document.getElementById('deleteSuccessModal'));
    successModal.show();
    
    setTimeout(() => {
        successModal.hide();
        setTimeout(() => {
            document.getElementById('deleteSuccessModal')?.remove();
        }, 300);
    }, 1500);
    
    console.log(`Slot ${slotNumber} deleted`);
}

async function loadAllSlots() {
    const saves = JSON.parse(localStorage.getItem(SAVE_SLOTS_KEY) || '{}');
    const remoteSaves = await fetchAllBackendSaveSlots();
    if (remoteSaves.length) {
        remoteSaves.forEach((slotData) => {
            if (slotData && slotData.slot) {
                saves[slotData.slot] = slotData;
            }
        });
        localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(saves));
    }
    
    for (let i = 1; i <= 3; i++) {
        const saveData = saves[i];
        const isOccupied = !!saveData;
        
        // Get elements
        const statusEl = document.getElementById(`slot${i}Status`);
        const detailsEl = document.getElementById(`slot${i}Details`);
        const loadBtn = document.getElementById(`slot${i}LoadBtn`);
        const deleteBtn = document.getElementById(`slot${i}DeleteBtn`);
        
        if (statusEl) {
            if (isOccupied) {
                statusEl.textContent = 'Save Data';
                statusEl.className = 'slot-status occupied';
                if (detailsEl) detailsEl.style.display = 'block';
                if (loadBtn) {
                    loadBtn.disabled = false;
                    loadBtn.textContent = 'LOAD GAME';
                }
                if (deleteBtn) deleteBtn.style.display = 'inline-block';
                
                // Fill in details
                const nameEl = document.getElementById(`slot${i}Name`);
                const timeEl = document.getElementById(`slot${i}Time`);
                const progressEl = document.getElementById(`slot${i}Progress`);
                const heartsEl = document.getElementById(`slot${i}Hearts`);
                const hintsEl = document.getElementById(`slot${i}Hints`);
                
                const levelNames = {1: 'Forest', 2: 'Dungeon', 3: 'Volcanic Ruins'};
                const levelName = levelNames[saveData.currentLevel] || 'Forest';
                
                if (nameEl) nameEl.textContent = saveData.playerName;
                if (timeEl) timeEl.textContent = saveData.formattedTime || '0:00';
                if (progressEl) progressEl.textContent = `${levelName} - Site ${saveData.currentSite}`;
                if (heartsEl) heartsEl.innerHTML = `❤️ ${saveData.hearts}`;
                if (hintsEl) hintsEl.innerHTML = `💡 ${saveData.hints}`;
            } else {
                statusEl.textContent = 'Empty Slot';
                statusEl.className = 'slot-status empty';
                if (detailsEl) detailsEl.style.display = 'none';
                if (loadBtn) {
                    loadBtn.disabled = true;
                    loadBtn.textContent = 'EMPTY SLOT';
                }
                if (deleteBtn) deleteBtn.style.display = 'none';
            }
        }
    }
}

function hasAnySaveData() {
    const saves = JSON.parse(localStorage.getItem(SAVE_SLOTS_KEY) || '{}');
    return Object.keys(saves).length > 0;
}

function getSaveSlots() {
    return JSON.parse(localStorage.getItem(SAVE_SLOTS_KEY) || '{}');
}

// Make functions global
window.loadGameFromSlot = loadGameFromSlot;
window.deleteSaveSlot = deleteSaveSlot;
window.confirmDeleteSlot = confirmDeleteSlot;
window.loadAllSlots = loadAllSlots;
window.applyLoadedSave = applyLoadedSave;
window.saveGameToSlot = saveGameToSlot;