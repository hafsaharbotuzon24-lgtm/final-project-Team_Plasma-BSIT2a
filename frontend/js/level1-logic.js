let gameState = {
    hearts: 3,
    hints: 1,
    currentSite: 1,
    lastChoice: null,
    character: localStorage.getItem('selectedCharacter') || 'witch', 
    currentQuestionIndex: 0
};


document.body.style.fontFamily = "'Pixelify Sans', sans-serif";

console.log("Game initialized with character:", gameState.character);

// Log it to console to verify it worked
console.log("Playing as:", gameState.character);

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    // Show instruction modal on first load
    if (gameState.currentSite === 1) {
        setTimeout(openInstructionsModal, 500);
    }
});

function updateUI() {
    document.getElementById('heartCount').innerText = gameState.hearts;
    document.getElementById('hintCount').innerText = gameState.hints;
    renderCards();
}

function renderCards() {
    const row = document.getElementById('selectionRow');
    if (!row) return;
    row.innerHTML = "";
    
    let choices = [];
    const site = gameState.currentSite;
    const last = gameState.lastChoice;

    // Logic Map (A-E)
    if (site === 1) choices = ['chest', 'battle', 'room'];
    else if (site === 2) choices = (last === 'chest') ? ['room'] : ['chest'];
    else if (site === 3) choices = (last === 'room') ? ['battle'] : ['battle', 'room'];
    else if (site === 4) choices = (last === 'battle') ? ['chest'] : ['battle', 'battle'];
    else if (site === 5) choices = ['boss'];

    choices.forEach(type => {
        const card = document.createElement('div');
        card.className = "card-option border border-4 border-white p-4 text-center bg-black";
        card.style.cursor = "pointer";
        card.innerHTML = `
            <img src="img/icon-${type === 'boss' ? 'battle' : type}.png" height="100" style="pointer-events:none;">
            <h4 class="pixel-font mt-3 text-uppercase">${type}</h4>
        `;
        card.onclick = () => startEvent(type);
        row.appendChild(card);
    });
}

function startEvent(type) {
    gameState.lastChoice = type;
    if (type === 'chest') openChestModal();
    else if (type === 'room') openRoomModal();
    else openBattleModal(type === 'boss');
}

function proceed() {
    gameState.currentSite++;
    const modalElement = document.getElementById('gameModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
    updateUI();
}

function runTypewriter(text, elementId, callback) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 40);
}

function checkBattleAnswer(isBoss) {
    const input = document.getElementById('answerField').value.toLowerCase().trim();
    const correct = QUESTIONS[gameState.currentSite][battleQIndex].a;

    if (input === correct) {
        battleQIndex++;
        const target = isBoss ? 5 : 3;
        
        if (battleQIndex >= target) {
            showBattleResult(true);
        } else {
            document.getElementById('answerField').value = "";
            loadQuestion();
        }
    } else {
        // Correctly subtracts from the global gameState
        gameState.hearts--;
        
        // This updates the status-container on the main play.html screen
        updateUI(); 
        
        const lossBox = document.getElementById('heartLossBox');
        if(lossBox) {
            lossBox.classList.remove('d-none');
            setTimeout(() => lossBox.classList.add('d-none'), 1500);
        }

        if (gameState.hearts <= 0) {
            showBattleResult(false);
        }
    }
}