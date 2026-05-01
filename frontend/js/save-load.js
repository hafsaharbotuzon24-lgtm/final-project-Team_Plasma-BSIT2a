// ============================================================
// SAVE/LOAD SYSTEM
// ============================================================

const SAVE_SLOTS_KEY_PREFIX = 'combatCoders_saveSlots';
const LOAD_SLOT_KEY_PREFIX = 'loadSaveSlot';
const CURRENT_USER_KEY = 'combatCoders_currentUser';
if (typeof API_BASE === 'undefined') {
    var API_BASE = window.API_BASE_URL || 'http://localhost:5000';
}

function getCurrentPlayerId() {
    const explicitPlayerId = localStorage.getItem('playerId');
    if (explicitPlayerId) return explicitPlayerId;

    const currentUserRaw = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUserRaw) return 'guest';

    try {
        const currentUser = JSON.parse(currentUserRaw);
        return currentUser?.id || 'guest';
    } catch (_) {
        return 'guest';
    }
}

function getSaveSlotsKey() {
    return `${SAVE_SLOTS_KEY_PREFIX}:${getCurrentPlayerId()}`;
}

function getLoadSlotKey() {
    return `${LOAD_SLOT_KEY_PREFIX}:${getCurrentPlayerId()}`;
}

function readScopedSaves() {
    try {
        const parsed = JSON.parse(localStorage.getItem(getSaveSlotsKey()) || '{}');
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
        return {};
    }
}

function writeScopedSaves(saves) {
    localStorage.setItem(getSaveSlotsKey(), JSON.stringify(saves || {}));
}

function isSaveOwnedByCurrentUser(saveData) {
    if (!saveData || typeof saveData !== 'object') return false;

    const currentPlayerId = String(localStorage.getItem('playerId') || '').trim();
    const currentEmail = String(localStorage.getItem('playerEmail') || '').trim().toLowerCase();
    const savePlayerId = String(saveData.playerId || '').trim();
    const saveEmail = String(saveData.playerEmail || '').trim().toLowerCase();

    if (currentPlayerId && savePlayerId) {
        return currentPlayerId === savePlayerId;
    }

    if (currentEmail && saveEmail) {
        return currentEmail === saveEmail;
    }

    return false;
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

async function syncSaveToBackend(slotNumber, saveData) {
    const token = getAuthToken();
    if (!token) {
        console.error('No auth token for save sync');
        return false;
    }

    console.log('Syncing save to backend:', { slotNumber, API_BASE, hasToken: !!token });

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
        
        console.log('Save sync response:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Save sync failed:', response.status, errorData);
        }
        
        return response.ok;
    } catch (err) {
        console.error('Save slot backend sync failed:', err.message);
        return false;
    }
}

async function fetchBackendSaveSlot(slotNumber) {
    const token = getAuthToken();
    if (!token) return null;

    try {
        const response = await fetch(`${API_BASE}/api/save-slots/${slotNumber}?cache=false`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            },
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
        const response = await fetch(`${API_BASE}/api/save-slots?cache=false`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            },
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
    
    // Get avatar - extract just the filename if it's base64 encoded
    let playerAvatarValue = localStorage.getItem('playerAvatar') || 'img/player-profile.png';
    if (playerAvatarValue.startsWith('data:')) {
        playerAvatarValue = 'img/player-profile.png'; // Use default if it's base64
    }
    
    return {
        slot: slotNumber,
        playerId: localStorage.getItem('playerId') || '',
        playerName: localStorage.getItem('playerUserName') || 'CombatCoder_01',
        playerEmail: localStorage.getItem('playerEmail') || 'player@plasma.com',
        playerAvatar: playerAvatarValue,  // Now only stores the path, not base64 data
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
    let saves = readScopedSaves();
    saves[slotNumber] = saveData;
    writeScopedSaves(saves);

    syncSaveToBackend(slotNumber, saveData);
    
    console.log(`Game saved to slot ${slotNumber}`, saveData);
    return true;
}

async function loadGameFromSlot(slotNumber) {
    const token = getAuthToken();
    const saves = readScopedSaves();
    let saveData = null;

    if (token) {
        const remoteSave = await fetchBackendSaveSlot(slotNumber);
        if (remoteSave) {
            saveData = remoteSave;
            saves[slotNumber] = remoteSave;
            writeScopedSaves(saves);
        }
    }

    if (!saveData) {
        const localSave = saves[slotNumber];
        if (!token || isSaveOwnedByCurrentUser(localSave)) {
            saveData = localSave;
        }
    }
    
    if (!saveData) {
        console.log(`No save data found in slot ${slotNumber}`);
        return false;
    }
    
    // Store save data to be loaded on play.html
    localStorage.setItem(getLoadSlotKey(), JSON.stringify(saveData));
    
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

function applyLoadedSave() {
    const savedData = localStorage.getItem(getLoadSlotKey()) || localStorage.getItem('loadSaveSlot');
    if (!savedData) return false;
    
    try {
        const saveData = JSON.parse(savedData);
        
        // Apply saved data to gameState
        if (typeof gameState !== 'undefined') {
            gameState.character = saveData.character || 'witch';
            gameState.hearts = saveData.hearts || 3;
            gameState.hints = saveData.hints || 1;
            gameState.currentLevel = saveData.currentLevel || 1;
            gameState.currentSite = saveData.currentSite || 1;
            gameState.lastChoice = saveData.lastChoice || null;
        }
        
        // Force character into localStorage
        localStorage.setItem('selectedCharacter', saveData.character || 'witch');
        
        // Apply player data
        localStorage.setItem('playerUserName', saveData.playerName || 'CombatCoder_01');
        localStorage.setItem('playerEmail', saveData.playerEmail || 'player@plasma.com');
        localStorage.setItem('playerAvatar', saveData.playerAvatar || 'img/player-profile.png');
        
        // Apply timer time
        if (saveData.gameTime && saveData.gameTime > 0) {
            if (typeof setSavedGameTime === 'function') {
                setSavedGameTime(saveData.gameTime);
            } else {
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
        }
        
        // Clear the saved slot data after loading
        localStorage.removeItem(getLoadSlotKey());
        localStorage.removeItem('loadSaveSlot');
        
        // Update UI if function exists
        if (typeof updateUI === 'function') {
            setTimeout(() => updateUI(), 100);
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
    const saves = readScopedSaves();
    delete saves[slotNumber];
    writeScopedSaves(saves);
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
    const token = getAuthToken();
    let saves = readScopedSaves();
    const remoteSaves = token ? await fetchAllBackendSaveSlots() : [];

    if (token) {
        remoteSaves.forEach((slotData) => {
            if (slotData && slotData.slot) {
                saves[slotData.slot] = slotData;
            }
        });
        writeScopedSaves(saves);
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
    const saves = readScopedSaves();
    return Object.keys(saves).length > 0;
}

function getSaveSlots() {
    return readScopedSaves();
}

// Make functions global
window.loadGameFromSlot = loadGameFromSlot;
window.deleteSaveSlot = deleteSaveSlot;
window.confirmDeleteSlot = confirmDeleteSlot;
window.loadAllSlots = loadAllSlots;
window.applyLoadedSave = applyLoadedSave;
window.saveGameToSlot = saveGameToSlot;