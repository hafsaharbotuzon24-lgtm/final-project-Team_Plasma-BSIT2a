const RESOURCE_API_BASE = window.API_BASE_URL || 'http://localhost:5000';

async function syncResourceDelta(heartsDelta, hintsDelta) {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
        await fetch(`${RESOURCE_API_BASE}/api/players/me/resources`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ heartsDelta, hintsDelta })
        });
    } catch (err) {
        console.warn('Resource sync failed:', err.message);
    }
}

function openChestModal() {
    const dialogues = [
        "You find a strange stone tablet that seems to be the missing piece to the puzzle ahead.",
        "Tucked inside the velvet lining is a diagram showing the secret mechanism of the Great Door",
        "You pull out a heavy brass key with a tag that reads: 'Only for the brave who seek the hidden path.",
        "The chest contains a collection of old letters that reveal the master's true intentions."
    ];
    const text = dialogues[Math.floor(Math.random() * dialogues.length)];
    gameState.hints++;
    syncResourceDelta(0, 1);
    renderReward('chest', text, '+1 HINT', 'text-success');
}

function openRoomModal() {
    const dialogues = [
        "You find a quiet sanctuary; the peace of this room seems to stitch your wounds back together",
        "You find a stash of clean bandages and potent tonics that give you a second wind.",
        "The air in this chamber is pure and bracing, clearing your head and mending your weary spirit.",
        "You drink from a silver basin, and the stinging pain of your injuries finally begins to fade.",
        "A warm glow fills the chamber, washing away your exhaustion and restoring your strength."
    ];
    const text = dialogues[Math.floor(Math.random() * dialogues.length)];
    gameState.hearts++;
    syncResourceDelta(1, 0);
    renderReward('room', text, '+1 HEART', 'text-danger');
}

function renderReward(type, text, reward, color) {
    // Select the background image based on the reward type (chest or room)
    const bgImage = type === 'chest' ? 'img/bg-chest.png' : 'img/bg-room.png';

    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="reward-container p-5 text-center border border-5 border-dark shadow-lg" 
             style="background: url('${bgImage}') no-repeat center center; background-size: cover; min-height: 400px; position: relative;">
            
            <div style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 10px; display: inline-block; width: 100%;">
                <img src="img/icon-${type}.png" height="120" class="mb-4">
                <h2 id="rewardTypewriter" class="pixel-font text-white mb-3"></h2>
                <h1 class="${color} pixel-font fw-bold mb-4">${reward}</h1>
                <button class="btn btn-light pixel-font fs-4 px-5 py-2" onclick="proceed()">PROCEED</button>
            </div>
        </div>`;
    
    new bootstrap.Modal(document.getElementById('gameModal')).show();
    
    // Ensure the typewriter runs after the modal is rendered
    setTimeout(() => {
        if (typeof runTypewriter === "function") {
            runTypewriter(text, 'rewardTypewriter');
        }
    }, 500);
}