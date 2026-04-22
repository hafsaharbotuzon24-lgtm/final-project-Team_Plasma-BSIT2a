
// RNG Arrays
const BG_NUM = ['img/bg-crystalcave.png','img/bg-moonlit.png','img/bg-woodland.png','img/forestshroud.png'];
const ENEMIES = ['enemy-roach.png', 'enemy-roach.png', 'enemy-bee.png', 'enemy-sausagepillar-.png', 'enemy-insectoid.png','enemy-centipede.png'];
const BOSSES = ['boss-mantis.png'];

const PLAYER_DIAL = ["YOU: Dusty wings... Glowing eyes... You're ugly. Let's go!", "YOU: You're blocking the path, Move aside.", "YOU: Your syntax is weak!", "YOU: Eat my code!", ];
const ENEMY_DIAL = ["ENEMY: For the swarm. Charge!!!", "ENEMY: Try me weakling!.", "ENEMY: I am the firewall!", "ENEMY: The light blinds me. The dark is my home.", "ENEMY: You look like breakfast. Move along."];

// FULL QUESTION DATABASE
// h = hint, q = question, a = answer
const QUESTIONS = {
    1: [
        {q: "<p>Hello world___", a: "</p>", h: "Like the first <p> but has an extra ."},
        {q: "Fix the incorrect closing tag: <h1>My Title</h2>", a: "&lth1&gt My Title &lt/h1&gt", h: "Might there be something wrong with the number?"},
        {q: "Fix this code with a missing <body> closing tag: <html> <body> <p>Hello!</p> </html>", a: "<html> <body> <p>Hello!</p> </body> </html>", h: "There body doesn't have a buddy."}
    ],
    2: [
        {q: "Tag for an Unordered List?", a: "ul", h: "U... L..."},
        {q: "Tag for a Line Break?", a: "br", h: "Short for 'Break'."},
        {q: "Largest Heading tag?", a: "h1", h: "H followed by the number 1."}
    ],
    3: [
        {q: "Tag for a list item?", a: "li", h: "L... I..."},
        {q: "Tag for a table row?", a: "tr", h: "T... R..."},
        {q: "Tag for a paragraph?", a: "p", h: "The first letter of 'Paragraph'."}
    ],
    4: [
        {q: "Tag for a button?", a: "button", h: "Spelled exactly like the word."},
        {q: "Tag for an input field?", a: "input", h: "What you use to type data."},
        {q: "Tag for a dropdown select?", a: "select", h: "To pick an option."}
    ],
    5: [ // BOSS QUESTIONS (Requires 5)
        {q: "BOSS: Root tag of HTML?", a: "html", h: "The container for everything."},
        {q: "BOSS: Tag for metadata?", a: "head", h: "Not the body, but the..."},
        {q: "BOSS: Tag for visible content?", a: "body", h: "The main part of the human."},
        {q: "BOSS: Tag for a section?", a: "section", h: "A thematic grouping."},
        {q: "BOSS: Tag for navigation?", a: "nav", h: "Short for Navigation."}
    ]
};

let battleQIndex = 0; 
let isTyping = false;

function openBattleModal(isBoss) {
    battleQIndex = 0; // Reset index for every new battle
    const randomBG = BG_NUM[Math.floor(Math.random() * BG_NUM.length)];
    const enemy = isBoss ? BOSSES[Math.floor(Math.random() * BOSSES.length)] : ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
    
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="battle-container border border-4 border-white bg-black position-relative overflow-hidden" style="font-family: 'Pixelify Sans', sans-serif;">
            
            <div id="heartLossBox" class="position-absolute top-0 start-50 translate-middle-x mt-2 d-none" style="z-index: 6000;">
                <div class="bg-danger border border-white p-3 text-white pixel-font shadow-lg">
                    <h3 class="mb-0 text-uppercase">-1 Heart: System Corruption!</h3>
                </div>
            </div>

            <div class="hint-trigger position-absolute p-3" 
                 onclick="event.stopPropagation(); triggerBattleHint();" 
                 style="z-index: 5000; cursor:pointer; top:0; left:0;">
                <img src="img/icon-hint.png" width="50" style="filter: drop-shadow(0 0 5px gold);">
                <span id="modalHintCount" class="text-white fs-4">${gameState.hints}</span>
            </div>

            <div class="battle-screen d-flex justify-content-around align-items-end p-4" 
                style="height:350px; background: url('${randomBG}') center/cover no-repeat;">
                <img src="img/${gameState.character}-model.png" class="game-model" style="height:130px; object-fit:contain;">
                <img src="img/${enemy}" class="game-model" style="height:260px; object-fit:contain;">
            </div>

            <div id="dialogueBox" class="p-4 bg-dark text-white border-top border-4 border-white" style="min-height: 160px; cursor: pointer;">
                <p id="battleText" class="pixel-font fs-3 mb-0"></p>
                <div id="quizArea" class="d-none mt-3">
                    <input type="text" id="answerField" class="form-control bg-black text-white pixel-font fs-4 text-center mb-2" autocomplete="off" placeholder="Type answer...">
                    <button class="btn btn-warning w-100 pixel-font fw-bold" onclick="checkBattleAnswer(${isBoss})">SUBMIT DATA</button>
                </div>
            </div>
        </div>`;

    new bootstrap.Modal(document.getElementById('gameModal')).show();
    
    // Intro sequence
    startSequence([ENEMY_DIAL[Math.floor(Math.random()*ENEMY_DIAL.length)], PLAYER_DIAL[Math.floor(Math.random()*PLAYER_DIAL.length)]], () => {
        document.getElementById('quizArea').classList.remove('d-none');
        loadQuestion();
    });
}

function loadQuestion() {
    const qData = QUESTIONS[gameState.currentSite][battleQIndex];
    isTyping = true;
    runTypewriter(qData.q, 'battleText', () => { 
        isTyping = false; 
        document.getElementById('answerField').focus();
    });
}

function checkBattleAnswer(isBoss) {
    const input = document.getElementById('answerField').value.toLowerCase().trim();
    const correct = QUESTIONS[gameState.currentSite][battleQIndex].a;

    if (input === correct) {
        battleQIndex++;
        // If boss, need 5 correct. If regular enemy, 3.
        const target = isBoss ? 5 : 3;
        
        if (battleQIndex >= target) {
            showBattleResult(true);
        } else {
            document.getElementById('answerField').value = "";
            loadQuestion();
        }
    } else {
        // Handle Wrong Answer
        gameState.hearts--;
        updateUI();
        
        const lossBox = document.getElementById('heartLossBox');
        lossBox.classList.remove('d-none');
        setTimeout(() => lossBox.classList.add('d-none'), 1500);

        if (gameState.hearts <= 0) {
            showBattleResult(false);
        }
    }
}

function startSequence(lines, callback) {
    let i = 0;
    const box = document.getElementById('dialogueBox');
    const next = () => {
        if (isTyping) return;
        if (i < lines.length) {
            isTyping = true;
            runTypewriter(lines[i++], 'battleText', () => { isTyping = false; });
        } else {
            box.onclick = null;
            callback();
        }
    };
    box.onclick = next;
    next();
}
const VICTORY_DIAL = [
    "System integrity restored. You are a natural!",
    "Malware purged. Your syntax is flawless.",
    "Access granted. The firewall couldn't hold you back.",
    "Optimization complete. Onward to the next sector!"
];

const DEFEAT_DIAL = [
    "Your logic is flawed. System crash imminent...",
    "Compilation error: Skill not found.",
    "You were just a bug in my code.",
    "Hard drive wiped. Better luck in the next life."
];

// Updated Battle Result Logic
function showBattleResult(won) {
    document.getElementById('quizArea').classList.add('d-none');
    
    const text = won ? "VICTORY! System breach successful." : "DEFEAT... System failure.";
    
    runTypewriter(text, 'battleText', () => {
        setTimeout(() => {
            if (won) renderVictoryModal();
            else renderDefeatModal();
        }, 1200);
    });
}

function renderVictoryModal() {
    const rngText = VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)];
    
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <h1 class="text-white mb-3">SUCCESS</h1>
            <p class="text-white fs-4 mb-4">"${rngText}"</p>
            <div class="d-flex justify-content-center gap-3">
                <button class="btn btn-light pixel-font fs-4 px-4" onclick="proceed()">CONTINUE</button>
            </div>
        </div>`;
}

function renderDefeatModal() {
    const rngText = DEFEAT_DIAL[Math.floor(Math.random() * DEFEAT_DIAL.length)];
    
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-danger p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <h1 class="text-white mb-2">YOU DIED</h1>
            <p class="text-white fs-5 mb-4">"${rngText}"</p>
            
            <div class="bg-black border border-white p-2 mb-4">
                <span class="text-white pixel-font">Final Site: ${gameState.currentSite}</span>
            </div>

            <div class="d-flex flex-column gap-2">
                <button class="btn btn-warning pixel-font fw-bold fs-4" onclick="restartGame()">RETRY LEVEL</button>
                
                <button class="btn btn-dark border-white pixel-font" onclick="location.href='index.html'">MAIN MENU</button>
            </div>
        </div>`;
}

// Logic to reset the game state and refresh page
function restartGame() {
    gameState.hearts = 3;
    gameState.hints = 1;
    gameState.currentSite = 1;
    gameState.lastChoice = null;
    // We keep the same character stored in localStorage
    location.reload(); 
}