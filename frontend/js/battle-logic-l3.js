// ============================================================
// LEVEL 3 — VOLCANIC RUINS
// ============================================================

const BG_NUM_L3 = ['img/bg-l3-lava1.png', 'img/bg-l3-ruins1.png', 'img/bg-l3-ashfield.png'];
const ENEMIES_L3 = ['enemy-l3-emberbeast.png', 'enemy-l3-ashknight.png', 'enemy-l3-lavaskull.png', 'enemy-l3-ruinworm.png', 'enemy-l3-scorchling.png', 'enemy-l3-volcanofiend.png'];
const BOSSES_L3 = ['boss-l3-infernus.png'];

const PLAYER_DIAL_L3 = ["YOU: These ruins reek of ash and old code. Time to clean up.", "YOU: You're wreathed in flame... but your logic is still broken.", "YOU: Lava flows upward here. Nothing makes sense. Let's fight!", "YOU: An ancient evil, burning through the ages. How poetic. How dead.", "YOU: I've debugged worse. Probably. Let's see."];
const ENEMY_DIAL_L3 = ["ENEMY: This mountain has burned for a thousand years. You are nothing new.", "ENEMY: The eruption never ended. Neither will your suffering.", "ENEMY: Ash and ruin is all that remains. Join them.", "ENEMY: We were forged in the core of this world. You are just passing through.", "ENEMY: Your code cannot survive these temperatures.", "ENEMY: The volcano claimed this land. We claimed the volcano."];

const BOSS_DIAL_L3 = [
    "INFERNUS: I have reduced civilizations to cinders. You are a footnote.",
    "INFERNUS: The ground you stand on is my body. Every step is a mistake.",
    "INFERNUS: Your logic runs cold. Here, cold things die first.",
    "INFERNUS: I watched this world form from magma. I will watch it end the same way."
];

const QUESTIONS_L3 = {
    1: [
        { q: "Add the correct CSS property to change text color to red:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>p {\n  <input type='text' id='fillBlank' class='blank-input'>: red;\n}</pre>", a: "color", h: "The CSS property for text color is simply 'color'." },
        { q: "Add the correct CSS property to set the background color:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>body {\n  <input type='text' id='fillBlank' class='blank-input'>: black;\n}</pre>", a: "background-color", h: "Use 'background-color' to set the background of an element." },
        { q: "Add the correct CSS property to change font size to 20px:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>h1 {\n  <input type='text' id='fillBlank' class='blank-input'>: 20px;\n}</pre>", a: "font-size", h: "The 'font-size' property controls how large the text appears." }
    ],
    2: [
        { q: "Add the CSS property to make text bold:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>strong {\n  <input type='text' id='fillBlank' class='blank-input'>: bold;\n}</pre>", a: "font-weight", h: "Use 'font-weight' to control how thick or thin text appears." },
        { q: "Add the CSS property to center text horizontally:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>h2 {\n  <input type='text' id='fillBlank' class='blank-input'>: center;\n}</pre>", a: "text-align", h: "The 'text-align' property positions text horizontally inside its container." },
        { q: "Add the CSS property to add 10px of space inside an element:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>div {\n  <input type='text' id='fillBlank' class='blank-input'>: 10px;\n}</pre>", a: "padding", h: "Padding adds space between the element's content and its border." }
    ],
    3: [
        { q: "Add the CSS property to add space outside an element:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>p {\n  <input type='text' id='fillBlank' class='blank-input'>: 15px;\n}</pre>", a: "margin", h: "Margin adds space outside an element, pushing it away from neighbors." },
        { q: "Add the CSS property to set the element's width:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>img {\n  <input type='text' id='fillBlank' class='blank-input'>: 100px;\n}</pre>", a: "width", h: "The 'width' property sets how wide an element is." },
        { q: "Add the CSS property to add a solid border:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>div {\n  <input type='text' id='fillBlank' class='blank-input'>: 2px solid black;\n}</pre>", a: "border", h: "The 'border' shorthand sets width, style, and color all at once." }
    ],
    4: [
        { q: "Add the CSS property to change the font family:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>body {\n  <input type='text' id='fillBlank' class='blank-input'>: Arial, sans-serif;\n}</pre>", a: "font-family", h: "Use 'font-family' to specify which typeface the text should use." },
        { q: "Add the CSS property to hide an element:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>.hidden {\n  <input type='text' id='fillBlank' class='blank-input'>: none;\n}</pre>", a: "display", h: "Setting 'display: none' removes the element from the layout entirely." },
        { q: "Add the CSS property to round the corners of a box:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>.card {\n  <input type='text' id='fillBlank' class='blank-input'>: 8px;\n}</pre>", a: "border-radius", h: "The 'border-radius' property rounds the corners of an element's border." }
    ],
    5: [
        {
            q: "Boss Q1. Write a CSS rule that selects all paragraphs and sets the color to 'crimson', font-size to '18px', and text-align to 'center':<br><pre style='color:white; font-family:\"Pixelify Sans\"'><input type='text' id='fillBlank' class='blank-input' style='width:30px;'> {\n  <input type='text' id='fillBlank2' class='blank-input' style='width:90px;'>: crimson;\n  <input type='text' id='fillBlank3' class='blank-input' style='width:90px;'>: 18px;\n  <input type='text' id='fillBlank4' class='blank-input' style='width:90px;'>: center;\n}</pre>",
            a: ["p", "color", "font-size", "text-align"],
            h: "Selector 'p' targets paragraphs. Then list the three properties in order."
        },
        {
            q: "Boss Q2. Write a CSS rule targeting the class 'volcano-box' that sets background-color to 'orange', padding to '20px', and border to '3px solid red':<br><pre style='color:white; font-family:\"Pixelify Sans\"'><input type='text' id='fillBlank' class='blank-input' style='width:130px;'> {\n  <input type='text' id='fillBlank2' class='blank-input' style='width:140px;'>: orange;\n  <input type='text' id='fillBlank3' class='blank-input' style='width:90px;'>: 20px;\n  <input type='text' id='fillBlank4' class='blank-input' style='width:90px;'>: 3px solid red;\n}</pre>",
            a: [".volcano-box", "background-color", "padding", "border"],
            h: "Class selectors start with a dot. Then background-color, padding, border."
        },
        {
            q: "Boss Q3. Write a CSS rule for the id 'inferno-title' that sets color to 'white', font-size to '36px', and font-weight to 'bold':<br><pre style='color:white; font-family:\"Pixelify Sans\"'><input type='text' id='fillBlank' class='blank-input' style='width:150px;'> {\n  <input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>: white;\n  <input type='text' id='fillBlank3' class='blank-input' style='width:90px;'>: 36px;\n  <input type='text' id='fillBlank4' class='blank-input' style='width:100px;'>: bold;\n}</pre>",
            a: ["#inferno-title", "color", "font-size", "font-weight"],
            h: "ID selectors start with #. Then color, font-size, font-weight."
        },
        {
            q: "Boss Q4. Write a CSS rule for the body that sets margin to '0', font-family to 'Arial, sans-serif', and background-color to '#1a1a1a':<br><pre style='color:white; font-family:\"Pixelify Sans\"'><input type='text' id='fillBlank' class='blank-input' style='width:60px;'> {\n  <input type='text' id='fillBlank2' class='blank-input' style='width:80px;'>: 0;\n  <input type='text' id='fillBlank3' class='blank-input' style='width:100px;'>: Arial, sans-serif;\n  <input type='text' id='fillBlank4' class='blank-input' style='width:140px;'>: #1a1a1a;\n}</pre>",
            a: ["body", "margin", "font-family", "background-color"],
            h: "Target 'body', then margin, font-family, background-color in order."
        },
        {
            q: "Boss Q5. Write a full CSS rule for 'div' elements: set width to '200px', height to '200px', border-radius to '50%', and background-color to 'firebrick':<br><pre style='color:white; font-family:\"Pixelify Sans\"'><input type='text' id='fillBlank' class='blank-input' style='width:40px;'> {\n  <input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>: 200px;\n  <input type='text' id='fillBlank3' class='blank-input' style='width:60px;'>: 200px;\n  <input type='text' id='fillBlank4' class='blank-input' style='width:110px;'>: 50%;\n  <input type='text' id='fillBlank5' class='blank-input' style='width:140px;'>: firebrick;\n}</pre>",
            a: ["div", "width", "height", "border-radius", "background-color"],
            h: "Selector 'div', then width, height, border-radius, background-color."
        }
    ]
};

let battleQIndex_L3 = 0;
let isTyping_L3 = false;

function openBattleModal_L3(isBoss) {
    battleQIndex_L3 = 0;
    const randomBG = isBoss ? 'img/bg-l3-boss.png' : BG_NUM_L3[Math.floor(Math.random() * BG_NUM_L3.length)];
    const enemy = isBoss ? BOSSES_L3[Math.floor(Math.random() * BOSSES_L3.length)] : ENEMIES_L3[Math.floor(Math.random() * ENEMIES_L3.length)];
    const introDialogue = isBoss ? [BOSS_DIAL_L3[Math.floor(Math.random() * BOSS_DIAL_L3.length)], PLAYER_DIAL_L3[Math.floor(Math.random() * PLAYER_DIAL_L3.length)]] : [ENEMY_DIAL_L3[Math.floor(Math.random() * ENEMY_DIAL_L3.length)], PLAYER_DIAL_L3[Math.floor(Math.random() * PLAYER_DIAL_L3.length)]];

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
                    <button class="btn btn-warning w-100 pixel-font fw-bold" onclick="checkBattleAnswer_L3(${isBoss})">SUBMIT DATA</button>
                </div>
            </div>
        </div>`;

    new bootstrap.Modal(document.getElementById('gameModal')).show();
    startSequence_L3(introDialogue, () => {
        document.getElementById('quizArea').classList.remove('d-none');
        loadQuestion_L3();
    });
}

function loadQuestion_L3() {
    const qData = QUESTIONS_L3[gameState.currentSite][battleQIndex_L3];
    document.getElementById('battleText').innerHTML = qData.q;
    const inputs = document.querySelectorAll('.blank-input');
    if (inputs.length > 0) inputs[0].focus();
}

function checkBattleAnswer_L3(isBoss) {
    const qData = QUESTIONS_L3[gameState.currentSite][battleQIndex_L3];
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
        battleQIndex_L3++;
        if (battleQIndex_L3 >= (isBoss ? 5 : 3)) showBattleResult_L3(true);
        else loadQuestion_L3();
    } else {
        gameState.hearts--;
        updateUI();
        const lossBox = document.getElementById('heartLossBox');
        if (lossBox) { lossBox.classList.remove('d-none'); setTimeout(() => lossBox.classList.add('d-none'), 1500); }
        if (gameState.hearts <= 0) showBattleResult_L3(false);
    }
}

function startSequence_L3(lines, callback) {
    let i = 0;
    const box = document.getElementById('dialogueBox');
    const next = () => {
        if (isTyping_L3) return;
        if (i < lines.length) { isTyping_L3 = true; runTypewriter(lines[i++], 'battleText', () => { isTyping_L3 = false; }); }
        else { box.onclick = null; callback(); }
    };
    box.onclick = next;
    next();
}

function showBattleResult_L3(won) {
    document.getElementById('quizArea').classList.add('d-none');
    runTypewriter(won ? "VICTORY! System integrity restored." : "DEFEAT... Connection lost.", 'battleText', () => {
        setTimeout(() => { if (won) renderVictoryModal_L3(); else renderDefeatModal_L3(); }, 1200);
    });
}

function renderVictoryModal_L3() {
    const VICTORY_DIAL = ["The volcano sleeps. The ruins remember. I move on.", "Ash on my boots, fire in my wake. Victory tastes like smoke.", "Ancient evil, ancient defeat. Same story, different lava."];
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <h1 class="text-white mb-3">SUCCESS</h1><p class="text-white fs-4 mb-4">"${VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)]}"</p>
            <button class="btn btn-light pixel-font fs-4 px-4" onclick="proceed()">CONTINUE</button>
        </div>`;
}

function renderDefeatModal_L3() {
    const DEFEAT_DIAL = ["The lava rose faster than my resolve...", "I underestimated a foe made of fire. Rookie mistake.", "The ruins claimed another wanderer. Today it was me.", "My final thought... was about a missing semicolon.", "The ash... fills my lungs... the mountain... wins again..."];
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-danger p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <h1 class="text-white mb-2">YOU DIED</h1><p class="text-white fs-5 mb-4">"${DEFEAT_DIAL[Math.floor(Math.random() * DEFEAT_DIAL.length)]}"</p>
            <div class="d-flex flex-column gap-2"><button class="btn btn-warning pixel-font fw-bold fs-4" onclick="restartGame()">RETRY LEVEL</button><button class="btn btn-dark border-white pixel-font" onclick="location.href='index.html'">MAIN MENU</button></div>
        </div>`;
}