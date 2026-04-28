function openBattleModal(isBoss) {
    // CRITICAL: Start timer when first battle begins
    console.log('openBattleModal called - Level:', gameState.currentLevel, 'Site:', gameState.currentSite);
    
    if (gameState.currentLevel === 1 && gameState.currentSite === 1) {
        console.log('First battle - attempting to start timer');
        if (typeof startGameTimer === 'function') {
            startGameTimer();
        } else {
            console.error('startGameTimer function not available!');
        }
    }
    
    battleQIndex = 0;
    // Rest of existing code...
}

function restartGame() {
    // Reset hearts and hints but stay on current level
    gameState.hearts = 3;
    gameState.hints = 1;
    gameState.currentSite = 1;
    gameState.lastChoice = null;
    gameState.currentQuestionIndex = 0;
    updateUI();
    
    // DO NOT reset timer - just reload the page
    const modalEl = document.getElementById('gameModal');
    if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
            modalEl.addEventListener('hidden.bs.modal', function handler() {
                modalEl.removeEventListener('hidden.bs.modal', handler);
                location.reload();
            }, { once: true });
            modalInstance.hide();
            return;
        }
    }
    location.reload();
}
// ============================================================
// LEVEL 1 — FOREST
// ============================================================

const BG_NUM = ['img/bg-moonlit.png', 'img/bg-woodland.png', 'img/bg-pathways.png'];
const ENEMIES = ['enemy-tisman.png', 'enemy-tick.png', 'enemy-bee.png', 'enemy-insectoid.png', 'enemy-dragonfly.png'];
const BOSSES = ['boss-mantis.png'];

const PLAYER_DIAL = ["YOU: This place was once pure. You are the blight.", "YOU: Dusty wings... Glowing eyes... You're ugly. Let's go!", "YOU: You're blocking the path, Step aside monster!.", "YOU: I sense the corruption in your shell. Who cursed you?", "YOU: Eat my code, foul pest!"];
const ENEMY_DIAL = ["ENEMY: We were here before you. We will remain after", "ENEMY: For the swarm. Charge!!!", "ENEMY: Try me weakling!.", "ENEMY: I am the one who guards this place!", "ENEMY: The light blinds me. The dark is my home.", "ENEMY: You look like breakfast. I'm kinda hungry right now"];

const BOSS_DIAL = [
    "ARGUS: You are small. But loud. I like loud. Easy to crush.",
    "ARGUS: Your footsteps are war drums. Leave this holy place.",
    "ARGUS: Debugging process initiated. Target: YOU.",
    "ARGUS: Witness the power of my Beauty!"
];

const QUESTIONS = {
    1: [
        { q: "Add the correct closing tag:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;p&gt;Hello world<input type='text' id='fillBlank' class='blank-input'></pre>", a: "</p>", h: "Like the first <p> but has an extra slash." },
        { q: "Add the correct closing tag:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;h1&gt;My Title<input type='text' id='fillBlank' class='blank-input'></pre>", a: "</h1>", h: "The opening and closing tags must use the same header level." },
        { q: "Fix the code with a missing &lt;body&gt; closing tag:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;html&gt;\n  &lt;body&gt;\n    &lt;p&gt;Hello!&lt;/p&gt;\n<input type='text' id='fillBlank' class='blank-input'>\n&lt;/html&gt;</pre>", a: "</body>", h: "Add the missing closing tag for the body element before the html tag ends." }
    ],
    2: [
        { q: "Change the title to 'My First Web Page':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;html&gt;\n  &lt;head&gt;\n    &lt;title&gt;<input type='text' id='fillBlank' class='blank-input'>&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;p&gt;Welcome!&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", a: "My First Web Page", h: "Replace the text inside the title tags with the new page title." },
        { q: "Fix the missing &lt;html&gt; closing tag:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;html&gt;\n  &lt;body&gt;\n    &lt;p&gt;Welcome&lt;/p&gt;\n  &lt;/body&gt;\n<input type='text' id='fillBlank' class='blank-input'></pre>", a: "</html>", h: "Every opening <html> tag needs a corresponding </html> tag at the end." },
        { q: "Replace the missing tag:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;html&gt;\n  <input type='text' id='fillBlank' class='blank-input'>\n    &lt;title&gt;This is the Title.&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;p&gt;Welcome!&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", a: "<head>", h: "The head section contains meta-information like the title." }
    ],
    3: [
        { q: "Add a button called 'Button 2':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;body&gt;\n  &lt;button&gt;Click Me!&lt;/button&gt;\n  <input type='text' id='fillBlank' class='blank-input'>\n&lt;/body&gt;</pre>", a: "<button>Button 2</button>", h: "Add a second button element after the existing one." },
        { q: "Add a paragraph with the message 'Hello':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;body&gt;\n  <input type='text' id='fillBlank' class='blank-input'>\n  &lt;button&gt;Click Me!&lt;/button&gt;\n&lt;/body&gt;</pre>", a: "<p>Hello</p>", h: "Insert a new paragraph element before the button." },
        { q: "What is the missing root container tag?<br><pre style='color:white; font-family:\"Pixelify Sans\"'>\n<input type='text' id='fillBlank' class='blank-input'>\n  &lt;body&gt;\n    &lt;h1&gt;My Page&lt;/h1&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", a: "<html>", h: "This tag surrounds all other content in an HTML document." }
    ],
    4: [
        { q: "Add'Submit' to the button tags:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;button&gt;<input type='text' id='fillBlank' class='blank-input'>&lt;/button&gt;</pre>", a: "Submit", h: "Replace only the text between the button tags." },
        { q: "Change heading from 'My First Heading' to 'Welcome to My Site':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;h1&gt;<input type='text' id='fillBlank' class='blank-input'>&lt;/h1&gt;</pre>", a: "Welcome to My Site", h: "Update the content inside the h1 tags." },
        { q: "Change paragraph from 'This is a simple paragraph' to 'Hello, I am learning HTML!':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;p&gt;This is a simple paragraph<input type='text' id='fillBlank' class='blank-input'>!&lt;/p&gt;</pre>", a: "Hello, I am learning HTML!", h: "Replace the phrase inside the tag with the given." }
    ],
    5: [
        {
            q: "Boss Q1. Create a simple HTML webpage that includes the following elements: a title displayed on the browser tab as 'My First Webpage', a main header on the page that says 'Welcome to My Website', and a paragraph below the header that reads 'This is my first HTML page.':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;head&gt;\n    &lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;<input type='text' id='fillBlank2' class='blank-input' style='width:150px;'>&lt;/title&gt;\n&lt;/<input type='text' id='fillBlank3' class='blank-input' style='width:60px;'>&gt;\n&lt;<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&gt;\n    &lt;h1&gt;<input type='text' id='fillBlank5' class='blank-input' style='width:180px;'>&lt;/<input type='text' id='fillBlank6' class='blank-input' style='width:40px;'>&gt;\n    &lt;<input type='text' id='fillBlank7' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank8' class='blank-input' style='width:180px;'>&lt;/<input type='text' id='fillBlank9' class='blank-input' style='width:30px;'>&gt;\n&lt;/body&gt;\n&lt;/html&gt;</pre>", 
            a: ["title", "My First Webpage", "head", "body", "Welcome to My Website", "h1", "p", "This is my first HTML page.", "p"], 
            h: "Standard structure: Title, Header, and Paragraph."
        },
        {
            q: "Boss Q2. Create an HTML webpage with a title 'The Button, a heading that says 'Press the button', and a button labeled 'Press Here.':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:100px;'>&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&gt;\n    &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank6' class='blank-input' style='width:150px;'>&lt;/h1&gt;\n    &lt;<input type='text' id='fillBlank7' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank8' class='blank-input' style='width:100px;'>&lt;/button&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", 
            a: ["head", "title", "The Button", "body", "h1", "Press the button", "button", "Press Here."], 
            h: "Follow the prompt: Title 'The Button', Heading 'Press the button', Button 'Press Here'."
        },
        {
            q: "Boss Q3. Create an HTML webpage with the title 'Double Content'. Inside the body, add a first heading that says 'First Heading' followed by a paragraph 'First paragraph.' Then add a second heading that says 'Second Heading' followed by another paragraph 'Second paragraph.':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n  &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>&gt;\n    &lt;title&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&gt;\n  &lt;/<input type='text' id='fillBlank5' class='blank-input' style='width:60px;'>&gt;\n  &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:60px;'>&gt;\n    &lt;h1&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank8' class='blank-input' style='width:40px;'>&gt;\n    &lt;<input type='text' id='fillBlank9' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank10' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank11' class='blank-input' style='width:30px;'>&gt;\n    &lt;<input type='text' id='fillBlank12' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank13' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank14' class='blank-input' style='width:40px;'>&gt;\n    &lt;<input type='text' id='fillBlank15' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank16' class='blank-input' style='width:150px;'>&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", 
            a: ["html", "head", "Double Content", "title", "head", "body", "First Heading", "h1", "p", "First paragraph.", "p", "h1", "Second Heading", "h1", "p", "Second paragraph."], 
            h: "Stack your headers and paragraphs sequentially."
        },
        {
            q: "Boss Q4. Create an HTML webpage with the title 'Two Buttons'. Inside the body, add a heading that says 'Click a Button' and include two buttons labeled 'Button 1' and 'Button 2'.:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n  &lt;head&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:120px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&gt;\n  &lt;/head&gt;\n  &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:60px;'>&gt;\n    &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank8' class='blank-input' style='width:40px;'>&gt;\n    &lt;button&gt;<input type='text' id='fillBlank9' class='blank-input' style='width:100px;'>&lt;/<input type='text' id='fillBlank10' class='blank-input' style='width:80px;'>&gt;\n    &lt;<input type='text' id='fillBlank11' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank12' class='blank-input' style='width:100px;'>&lt;/button&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", 
            a: ["html", "title", "Two Buttons", "title", "body", "h1", "Click a Button", "h1", "Button 1", "button", "button", "Button 2"], 
            h: "Add a heading and two buttons inside the body."
        },
        {
            q: "Boss Q5. Create an HTML webpage with the title 'My Page'. Inside the body, add a heading that says 'My First Heading', a paragraph with the text 'This is a simple paragraph', and a button labeled 'Click Me!':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n   &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:100px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank6' class='blank-input' style='width:180px;'>&lt;/<input type='text' id='fillBlank7' class='blank-input' style='width:40px;'>&gt;\n    &lt;<input type='text' id='fillBlank8' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank9' class='blank-input' style='width:250px;'>&lt;/<input type='text' id='fillBlank10' class='blank-input' style='width:30px;'>&gt;\n    &lt;<input type='text' id='fillBlank11' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank12' class='blank-input' style='width:100px;'>&lt;/button&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", 
            a: ["head", "title", "My Page", "title", "h1", "My First Heading", "h1", "p", "This is a simple paragraph", "p", "button", "Click Me!"], 
            h: "Combine all elements: title, h1, p, and button."
        }
    ]
};

let battleQIndex = 0;
let isTyping = false;

function openBattleModal(isBoss) {
    battleQIndex = 0;
    const randomBG = isBoss ? 'img/bg-boss.png' : BG_NUM[Math.floor(Math.random() * BG_NUM.length)];
    const enemy = isBoss ? BOSSES[Math.floor(Math.random() * BOSSES.length)] : ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
    const introDialogue = isBoss ? [BOSS_DIAL[Math.floor(Math.random() * BOSS_DIAL.length)], PLAYER_DIAL[Math.floor(Math.random() * PLAYER_DIAL.length)]] : [ENEMY_DIAL[Math.floor(Math.random() * ENEMY_DIAL.length)], PLAYER_DIAL[Math.floor(Math.random() * PLAYER_DIAL.length)]];

    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="battle-container border border-4 border-white bg-black position-relative overflow-hidden" style="font-family: 'Pixelify Sans', sans-serif; color: white;">
            <style>
                .blank-input { background: #222; border: none; border-bottom: 2px solid #fff; color: #00ff00; font-family: 'Pixelify Sans', monospace; padding: 0 5px; margin: 2px; }
                .blank-input:focus { outline: none; background: #333; border-bottom: 2px solid #00ff00; }
            </style>
            <div id="heartLossBox" class="position-absolute top-0 start-50 translate-middle-x mt-2 d-none" style="z-index: 6000;"><div class="bg-danger border border-white p-3 text-white pixel-font shadow-lg"><h3 class="mb-0 text-uppercase">-1 Heart: System Corruption!</h3></div></div>
            <div class="hint-trigger position-absolute p-3" onclick="event.stopPropagation(); triggerBattleHint();" style="z-index: 5000; cursor:pointer; top:0; left:0;"><img src="img/icon-hint.png" width="50" style="filter: drop-shadow(0 0 5px gold);"><span id="modalHintCount" class="text-white fs-4">${gameState.hints}</span></div>
            <div class="battle-screen d-flex justify-content-around align-items-end p-4" style="height:350px; background: url('${randomBG}') center/cover no-repeat;">
                <img src="img/${gameState.character}-model.png" class="game-model" style="height:130px; object-fit:contain;"><img src="img/${enemy}" class="game-model" style="height:260px; object-fit:contain;">
            </div>
            <div id="dialogueBox" class="p-4 bg-dark text-white border-top border-4 border-white" style="min-height: 200px; cursor: pointer;">
                <p id="battleText" class="pixel-font fs-4 mb-0" style="line-height: 1.4; white-space: pre-wrap;"></p>
                <div id="quizArea" class="d-none mt-3">
                    <button class="btn btn-warning w-100 pixel-font fw-bold" onclick="checkBattleAnswer(${isBoss})">SUBMIT DATA</button>
                </div>
            </div>
        </div>`;

    new bootstrap.Modal(document.getElementById('gameModal')).show();
    
    // Add Enter key listener
    setTimeout(() => { 
        document.addEventListener('keydown', battleEnterHandler); 
    }, 100);
    
    startSequence(introDialogue, () => {
        document.getElementById('quizArea').classList.remove('d-none');
        loadQuestion();
    });
}

function battleEnterHandler(e) {
    if (e.key === 'Enter') {
        const quizArea = document.getElementById('quizArea');
        if (quizArea && !quizArea.classList.contains('d-none')) {
            e.preventDefault();
            checkBattleAnswer(gameState.currentSite === 5);
        }
    }
}

function loadQuestion() {
    const qData = QUESTIONS[gameState.currentSite][battleQIndex];
    document.getElementById('battleText').innerHTML = qData.q;
    const inputs = document.querySelectorAll('.blank-input');
    if (inputs.length > 0) inputs[0].focus();
}

function checkBattleAnswer(isBoss) {
    const qData = QUESTIONS[gameState.currentSite][battleQIndex];
    const inputs = document.querySelectorAll('.blank-input');
    let isCorrect = true;

    if (Array.isArray(qData.a)) {
        inputs.forEach((input, index) => {
            if (input.value.trim().toLowerCase() !== qData.a[index].toLowerCase()) isCorrect = false;
        });
    } else {
        if (inputs[0].value.trim().toLowerCase() !== qData.a.toLowerCase()) isCorrect = false;
    }

    if (isCorrect) {
        battleQIndex++;
        if (battleQIndex >= (isBoss ? 5 : 3)) {
            showBattleResult(true, isBoss);
        } else {
            loadQuestion();
        }
    } else {
        gameState.hearts--;
        updateUI();
        const lossBox = document.getElementById('heartLossBox');
        if (lossBox) { 
            lossBox.classList.remove('d-none'); 
            setTimeout(() => lossBox.classList.add('d-none'), 1500); 
        }
        if (gameState.hearts <= 0) showBattleResult(false, isBoss);
    }
}

function startSequence(lines, callback) {
    let i = 0;
    const box = document.getElementById('dialogueBox');
    const next = () => {
        if (isTyping) return;
        if (i < lines.length) { isTyping = true; runTypewriter(lines[i++], 'battleText', () => { isTyping = false; }); }
        else { box.onclick = null; callback(); }
    };
    box.onclick = next;
    next();
}

function showBattleResult(won, isBoss) {
    // Remove enter key listener
    document.removeEventListener('keydown', battleEnterHandler);
    
    const quizArea = document.getElementById('quizArea');
    if (quizArea) quizArea.classList.add('d-none');
    
    const message = won ? "VICTORY! System integrity restored." : "DEFEAT... Connection lost.";
    runTypewriter(message, 'battleText', () => {
        setTimeout(() => { 
            if (won) {
                renderVictoryModal(isBoss);
            } else {
                renderDefeatModal();
            }
        }, 1200);
    });
}

function renderVictoryModal(isBoss) {
    const VICTORY_DIAL = ["Tranquility breathes again. My duty is done.", "Bounty collected. Enemy dead. Site empty. Time to move out fast.", "Grub dead. Root intact. No treasure. Just sweat. Lots of sweat."];
    const buttonText = isBoss ? "CONTINUE TO LEVEL " + (gameState.currentLevel + 1) : "CONTINUE";
    
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <img src="img/icon-victory.png" height="100" class="mb-3" onerror="this.style.display='none'">
            <h1 class="text-white mb-3">${isBoss ? 'BOSS DEFEATED!' : 'SUCCESS'}</h1>
            <p class="text-white fs-4 mb-4">"${VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)]}"</p>
            <button class="btn btn-light pixel-font fs-4 px-4" onclick="proceed()">${buttonText}</button>
        </div>`;
}

function renderDefeatModal() {
    const DEFEAT_DIAL = ["The forest dims... everything fades...", "I was not strong enough to cleanse this place.", "My code... corrupted... system shutting down...", "The insects... they were too many... too fast...", "I feel the shell cracking... the light fading..."];
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-danger p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <h1 class="text-white mb-2">YOU DIED</h1>
            <p class="text-white fs-5 mb-4">"${DEFEAT_DIAL[Math.floor(Math.random() * DEFEAT_DIAL.length)]}"</p>
            <div class="d-flex flex-column gap-2">
                <button class="btn btn-warning pixel-font fw-bold fs-4" onclick="restartGame()">RETRY LEVEL</button>
                <button class="btn btn-dark border-white pixel-font" onclick="location.href='index.html'">MAIN MENU</button>
            </div>
        </div>`;
}