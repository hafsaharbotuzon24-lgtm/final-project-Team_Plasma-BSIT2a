// chest1-logic.js
function openChestModal() {
    const dialogues = ["A shiny chest awaits!", "You unlocked a hidden secret!"];
    const text = dialogues[Math.floor(Math.random() * dialogues.length)];
    gameState.hints++;
    renderReward('chest', text, '+1 HINT', 'text-success');
}

// room1-logic.js
function openRoomModal() {
    const dialogues = ["A safe room to rest.", "You feel revitalized!"];
    const text = dialogues[Math.floor(Math.random() * dialogues.length)];
    gameState.hearts++;
    renderReward('room', text, '+1 HEART', 'text-danger');
}

function renderReward(type, text, reward, color) {
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="reward-container bg-white p-5 text-center border border-5 border-dark shadow-lg">
            <img src="img/icon-${type}.png" height="120" class="mb-4">
            <h2 id="rewardTypewriter" class="pixel-font text-dark mb-3"></h2>
            <h1 class="${color} pixel-font fw-bold mb-4">${reward}</h1>
            <button class="btn btn-dark pixel-font fs-4 px-5 py-2" onclick="proceed()">PROCEED</button>
        </div>`;
    new bootstrap.Modal(document.getElementById('gameModal')).show();
    setTimeout(() => runTypewriter(text, 'rewardTypewriter'), 500);
}