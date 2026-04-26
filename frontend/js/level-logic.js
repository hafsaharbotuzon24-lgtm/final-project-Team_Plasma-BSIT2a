/* --- CORE STATE --- */
let gameState = {
    hearts: 3,
    hints: 1,
    currentLevel: 1,
    currentSite: 1,
    lastChoice: null,
    character: localStorage.getItem('selectedCharacter') || 'witch',
    currentQuestionIndex: 0
};

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    if (gameState.currentLevel === 1 && gameState.currentSite === 1) {
        setTimeout(openInstructionsModal, 500);
    }
});

function updateUI() {
    if (gameState.hearts > 3) gameState.hearts = 3;
    
    const heartCountEl = document.getElementById('heartCount');
    const hintCountEl = document.getElementById('hintCount');
    
    if (heartCountEl) heartCountEl.innerText = gameState.hearts;
    if (hintCountEl) hintCountEl.innerText = gameState.hints;
    
    renderCards();
}

function renderCards() {
    const row = document.getElementById('selectionRow');
    if (!row) return;
    row.innerHTML = "";
    
    let choices = [];
    const lvl = gameState.currentLevel;
    const site = gameState.currentSite;
    const last = gameState.lastChoice;

    if (lvl === 1) {
        if (site === 1) choices = ['chest', 'battle', 'room'];
        else if (site === 2) choices = (last === 'chest') ? ['room'] : ['chest'];
        else if (site === 3) choices = (last === 'room') ? ['battle'] : ['battle', 'room'];
        else if (site === 4) choices = (last === 'battle') ? ['chest'] : ['battle', 'battle'];
        else if (site === 5) choices = ['boss'];
    }
    else if (lvl === 2) {
        if (site === 1) choices = ['chest', 'room'];
        else if (site === 2) {
            if (last === 'chest') choices = ['room', 'battle', 'battle'];
            else if (last === 'room') choices = ['battle', 'chest'];
            else choices = ['battle', 'chest'];
        }
        else if (site === 3) {
            if (last === 'room') choices = ['battle'];
            else if (last === 'battle') choices = ['room', 'room'];
            else if (last === 'chest') choices = ['room', 'battle'];
            else choices = ['room', 'battle'];
        }
        else if (site === 4) choices = ['chest'];
        else if (site === 5) choices = ['boss'];
    }
    else if (lvl === 3) {
        if (site === 1) choices = ['battle', 'battle'];
        else if (site === 2) {
            if (last === 'battle') choices = ['chest', 'room', 'room'];
            else choices = ['room', 'room'];
        }
        else if (site === 3) {
            if (last === 'chest' || last === 'room') choices = ['battle'];
            else choices = ['battle'];
        }
        else if (site === 4) {
            if (last === 'battle') choices = ['room', 'room'];
            else if (last === 'chest') choices = ['room', 'battle'];
            else choices = ['room', 'battle'];
        }
        else if (site === 5) choices = ['boss'];
    }

    if (choices.length === 0) {
        row.innerHTML = '<p class="text-white pixel-font">No paths available.</p>';
        return;
    }

    choices.forEach((type, index) => {
        const card = document.createElement('div');
        card.className = "card-option border border-4 border-white p-4 text-center";
        card.style.cssText = "cursor: pointer; background: rgba(0,0,0,0.85); min-width: 180px; margin: 0 15px; border-radius: 10px; transition: all 0.2s; z-index: 10; position: relative;";
        card.setAttribute('data-type', type);
        card.setAttribute('data-index', index);
        
        card.addEventListener('mouseenter', function() {
            this.style.background = "rgba(255,215,0,0.2)";
            this.style.borderColor = "#FFD700";
            this.style.transform = "scale(1.05)";
        });
        card.addEventListener('mouseleave', function() {
            this.style.background = "rgba(0,0,0,0.85)";
            this.style.borderColor = "#ffffff";
            this.style.transform = "scale(1)";
        });
        
        const img = document.createElement('img');
        img.src = `img/icon-${type}.png`;
        img.height = 100;
        img.alt = type;
        img.style.cssText = "margin-bottom: 10px; pointer-events: none;";
        
        const title = document.createElement('h4');
        title.className = "pixel-font mt-2 text-white";
        title.textContent = type.toUpperCase();
        title.style.cssText = "text-shadow: 2px 2px 4px rgba(0,0,0,0.8); pointer-events: none;";
        
        card.appendChild(img);
        card.appendChild(title);
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const cardType = this.getAttribute('data-type');
            startEvent(cardType);
        });
        
        row.appendChild(card);
    });
}

function startEvent(type) {
    gameState.lastChoice = type;
    
    if (type === 'chest') {
        openChestModal();
    } else if (type === 'room') {
        openRoomModal();
    } else if (type === 'battle') {
        if (gameState.currentLevel === 1) openBattleModal(false);
        else if (gameState.currentLevel === 2 && typeof openBattleModal_L2 === 'function') openBattleModal_L2(false);
        else if (gameState.currentLevel === 3 && typeof openBattleModal_L3 === 'function') openBattleModal_L3(false);
    } else if (type === 'boss') {
        if (gameState.currentLevel === 1) openBattleModal(true);
        else if (gameState.currentLevel === 2 && typeof openBattleModal_L2 === 'function') openBattleModal_L2(true);
        else if (gameState.currentLevel === 3 && typeof openBattleModal_L3 === 'function') openBattleModal_L3(true);
    }
}

function proceed() {
    // Properly hide the current modal and wait for backdrop to clear
    const modalEl = document.getElementById('gameModal');
    if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
            // Listen for when modal is fully hidden
            modalEl.addEventListener('hidden.bs.modal', function handler() {
                modalEl.removeEventListener('hidden.bs.modal', handler);
                
                gameState.currentSite++;
                
                if (gameState.currentSite > 5) {
                    showLevelCompleteModal();
                    return;
                }
                
                updateUI();
            }, { once: true });
            
            modalInstance.hide();
            return;
        }
    }
    
    // Fallback if no modal instance
    gameState.currentSite++;
    if (gameState.currentSite > 5) {
        showLevelCompleteModal();
        return;
    }
    setTimeout(() => updateUI(), 300);
}

function showLevelCompleteModal() {
    const levelNames = {1: "FOREST", 2: "DUNGEON", 3: "VOLCANIC RUINS"};
    const nextLevel = gameState.currentLevel + 1;
    const nextLevelName = levelNames[nextLevel] || "COMPLETE";
    const isGameComplete = gameState.currentLevel >= 3;
    
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <h1 class="text-white mb-3" style="font-size: 2.5em;">
                ${isGameComplete ? 'ALL LEVELS COMPLETE!' : 'LEVEL COMPLETE!'}
            </h1>
            <div class="bg-dark d-inline-block px-5 py-3 rounded mb-4" style="border: 3px solid #fff;">
                <p class="text-white fs-3 mb-1">${levelNames[gameState.currentLevel]} conquered!</p>
                <p class="text-warning fs-5 mb-0">
                    ${isGameComplete ? 'You are a true Code Warrior!' : 'Prepare for ' + nextLevelName}
                </p>
            </div>
            <div class="d-flex justify-content-center gap-3 mb-3">
                <span class="text-white fs-5">Hearts: ${gameState.hearts}</span>
                <span class="text-warning fs-5">Hints: ${gameState.hints}</span>
            </div>
            <button class="btn btn-light pixel-font fs-4 px-4" 
                onclick="${isGameComplete ? "location.href='index.html'" : "advanceToNextLevel()"}">
                ${isGameComplete ? 'RETURN TO MENU' : 'CONTINUE TO LEVEL ' + nextLevel}
            </button>
        </div>`;

    new bootstrap.Modal(document.getElementById('gameModal')).show();
}

function advanceToNextLevel() {
    const modalEl = document.getElementById('gameModal');
    if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
            modalEl.addEventListener('hidden.bs.modal', function handler() {
                modalEl.removeEventListener('hidden.bs.modal', handler);
                
                gameState.currentLevel++;
                gameState.currentSite = 1;
                gameState.lastChoice = null;
                
                updateUI();
                if (typeof openInstructionsModal === 'function') {
                    setTimeout(openInstructionsModal, 500);
                }
            }, { once: true });
            
            modalInstance.hide();
            return;
        }
    }
    
    // Fallback
    gameState.currentLevel++;
    gameState.currentSite = 1;
    gameState.lastChoice = null;
    setTimeout(() => {
        updateUI();
        if (typeof openInstructionsModal === 'function') {
            setTimeout(openInstructionsModal, 500);
        }
    }, 300);
}

function restartGame() {
    const modalEl = document.getElementById('gameModal');
    if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
            modalEl.addEventListener('hidden.bs.modal', function handler() {
                modalEl.removeEventListener('hidden.bs.modal', handler);
                
                gameState.hearts = 3;
                gameState.hints = 1;
                gameState.currentSite = 1;
                gameState.lastChoice = null;
                
                updateUI();
            }, { once: true });
            
            modalInstance.hide();
            return;
        }
    }
    
    // Fallback
    gameState.hearts = 3;
    gameState.hints = 1;
    gameState.currentSite = 1;
    gameState.lastChoice = null;
    setTimeout(() => updateUI(), 300);
}