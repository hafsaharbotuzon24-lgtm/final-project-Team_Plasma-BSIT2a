console.log('=== battle-logic-l3.js LOADED - REWARD VERSION ===');

function restartGame() {
    gameState.hearts = 3;
    gameState.hints = 1;
    gameState.currentSite = 1;
    gameState.lastChoice = null;
    gameState.currentQuestionIndex = 0;
    updateUI();
    
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
// LEVEL 3 — VOLCANIC RUINS
// ============================================================

const BG_NUM_L3 = ['img/bg-cavern.jpg','img/bg-crystalcave.png', 'img/bg-lava.png'];
const ENEMIES_L3 = ['enemy-roach.png', 'enemy-sausagepillar.png', 'enemy-centipede.png', 'enemy-ant.png'];
const BOSSES_L3 = ['boss-buffguy.png'];

const PLAYER_DIAL_L3 = ["YOU: You reek of brimstone and sulfur. Time to clean up.", "YOU: You're wreathed in flame... but your heart is still cold. Why?", "YOU: Your living conditions honestly don't make sense! Let me give you mercy.", "YOU: An ancient evil, burning through the ages. How poetic. How dead.", "YOU: I've debugged worse. Probably. Let's see."];
const ENEMY_DIAL_L3 = ["ENEMY: You may be warm-blooded, but can you survive this heat?", "ENEMY: The eruption never ended. Neither will your suffering.", "ENEMY: Ash and ruin is all that remains. Join them, foolish being!", "ENEMY: We were forged in the core of this world.", "ENEMY: You cannot survive these temperatures.", "ENEMY: The volcano claimed this land. We claimed the volcano."];

const BOSS_DIAL_L3 = [
    "INFERNUS: I have reduced civilizations to cinders. Be one with the ash!",
    "INFERNUS: Bow down to the emperor of the flames! Infernus! Me! WAHAHAHAHA!!!",
    "INFERNUS: BLLEEEUUGGHHH! Still raw! You aren't cooked yet in this heat? I'll burn you up a thousandfold!",
    "INFERNUS: I watched this world form from magma. I will watch it end the same way. You being in it shall be an achievement!"
];

const QUESTIONS_L3 = {
    1: [
        {
            q: "Make this a copyright notice at the very bottom of the page. Fill in the semantic tag.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;<input type='text' id='fillBlank' class='blank-input' style='width:100px;'>&gt;\n  &lt;p&gt;Copyright 2026. All rights reserved.&lt;/p&gt;\n&lt;/<input type='text' id='fillBlank2' class='blank-input' style='width:100px;'>&gt;</pre>",
            a: ["footer", "footer"],
            h: "The semantic tag for footer content at the bottom of a page is &lt;footer&gt;."
        },
        {
            q: "Fix the typos to create a functional checkbox for email updates.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;input type=\"<input type='text' id='fillBlank' class='blank-input' style='width:120px;'>\" id=\"email\"&gt;\n&lt;<input type='text' id='fillBlank2' class='blank-input' style='width:80px;'> for=\"email\"&gt;Subscribe to updates&lt;/label&gt;</pre>",
            a: ["checkbox", "label"],
            h: "The correct type is 'checkbox'. The tag before 'for' should be &lt;label&gt;."
        },
        {
            q: "Add another option named 'Intermediate' between the two existing options.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;h3&gt;User Survey&lt;/h3&gt;\n&lt;label&gt;Experience Level:&lt;/label&gt;\n&lt;select&gt;\n  &lt;option&gt;Beginner&lt;/option&gt;\n  <input type='text' id='fillBlank' class='blank-input' style='width:200px;'>\n  &lt;option&gt;Expert&lt;/option&gt;\n&lt;/select&gt;</pre>",
            a: "<option>Intermediate</option>",
            h: "Add a new &lt;option&gt; tag with 'Intermediate' between Beginner and Expert."
        }
    ],
    2: [
        {
            q: "Fix the semantic tag used for the page header at the very top.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;<input type='text' id='fillBlank' class='blank-input' style='width:80px;'>&gt;\n  &lt;h1&gt;Feedback Portal&lt;/h1&gt;\n&lt;/<input type='text' id='fillBlank2' class='blank-input' style='width:80px;'>&gt;</pre>",
            a: ["header", "header"],
            h: "The semantic tag for introductory content at the top is &lt;header&gt;."
        },
        {
            q: "Replace the 'Beginner' option with 'Newbie':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;select&gt;\n  &lt;option&gt;<input type='text' id='fillBlank' class='blank-input' style='width:100px;'>&lt;/option&gt;\n  &lt;option&gt;Expert&lt;/option&gt;\n&lt;/select&gt;</pre>",
            a: "Newbie",
            h: "Change the text 'Beginner' to 'Newbie' inside the first &lt;option&gt; tag."
        },
        {
            q: "Change the header background color to darkgreen:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>header {\n  <input type='text' id='fillBlank' class='blank-input' style='width:250px;'>\n  color: white;\n  padding: 15px;\n  border-radius: 8px;\n  text-align: center;\n}</pre>",
            a: "background-color: darkgreen;",
            h: "Use 'background-color' property with value 'darkgreen'."
        }
    ],
    3: [
        {
            q: "Delete the entire button:hover block. Type the word to confirm:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>button:hover {\n  background-color: #2980b9;\n}</pre><br>Type your answer: <input type='text' id='fillBlank' class='blank-input' style='width:100px;'>",
            a: "delete",
            h: "Type 'delete' to confirm you want to remove this code block."
        },
        {
            q: "Add a border property with blue color to &lt;details&gt;:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>details {\n  background-color: #e8f4fd;\n  padding: 10px;\n  border-radius: 5px;\n  margin-bottom: 20px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:200px;'>\n}</pre>",
            a: "border: 1px solid blue;",
            h: "Add a border property with blue color. Example: 'border: 1px solid blue;'"
        },
        {
            q: "Change &lt;h3&gt; font size to 20px:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>h3 {\n  color: #2c3e50;\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 5px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:150px;'>\n}</pre>",
            a: "font-size: 20px;",
            h: "Use 'font-size' property set to '20px'."
        }
    ],
    4: [
        {
            q: "Change body background to lightyellow:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>body {\n  font-family: Arial, sans-serif;\n  max-width: 500px;\n  margin: 20px auto;\n  padding: 20px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:250px;'>\n}</pre>",
            a: "background-color: lightyellow;",
            h: "Change the background-color property to 'lightyellow'."
        },
        {
            q: "Change the alert message to 'You must accept the terms first!':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>if (!terms) {\n  alert('<input type='text' id='fillBlank' class='blank-input' style='width:280px;'>');\n  return;\n}</pre>",
            a: "You must accept the terms first!",
            h: "Replace with: 'You must accept the terms first!'"
        },
        {
            q: "Add a date variable and console log it within &lt;script&gt;:<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;script&gt;\n  <input type='text' id='fillBlank' class='blank-input' style='width:250px;'>\n  <input type='text' id='fillBlank2' class='blank-input' style='width:180px;'>\n&lt;/script&gt;</pre>",
            a: ["var today = new Date();", "console.log(today);"],
            h: "First: 'var today = new Date();' Then: 'console.log(today);'"
        }
    ],
    5: [
        {
            q: "Boss Q1. Create a webpage with title 'Explore More', heading 'Visit Google', a link to https://www.google.com labeled 'Click here to search', and an image logo.png with alt 'Website Logo'.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;<input type='text' id='fillBlank' class='blank-input' style='width:80px;'>&gt;\n    &lt;title&gt;<input type='text' id='fillBlank2' class='blank-input' style='width:150px;'>&lt;/title&gt;\n  &lt;/<input type='text' id='fillBlank3' class='blank-input' style='width:80px;'>&gt;\n  &lt;body&gt;\n    &lt;h1&gt;<input type='text' id='fillBlank4' class='blank-input' style='width:150px;'>&lt;/h1&gt;\n    &lt;a <input type='text' id='fillBlank5' class='blank-input' style='width:80px;'>=&quot;<input type='text' id='fillBlank6' class='blank-input' style='width:200px;'>&quot;&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:180px;'>&lt;/a&gt;\n    &lt;img <input type='text' id='fillBlank8' class='blank-input' style='width:80px;'>=&quot;<input type='text' id='fillBlank9' class='blank-input' style='width:100px;'>&quot; alt=&quot;<input type='text' id='fillBlank10' class='blank-input' style='width:150px;'>&quot;&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["head", "Explore More", "head", "Visit Google", "href", "https://www.google.com", "Click here to search", "src", "logo.png", "Website Logo"],
            h: "Fill in: head, title 'Explore More', h1 'Visit Google', a href, img src."
        },
        {
            q: "Boss Q2. Create a webpage with title 'My Hobbies', heading 'Things I Love', an unordered list with 'Coding' (class='highlight') and 'Gaming'.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;My Hobbies&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    &lt;h1&gt;Things I Love&lt;/h1&gt;\n    &lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n        &lt;li <input type='text' id='fillBlank2' class='blank-input' style='width:80px;'>=&quot;highlight&quot;&gt;Coding&lt;/li&gt;\n        &lt;<input type='text' id='fillBlank3' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank4' class='blank-input' style='width:80px;'>&lt;/<input type='text' id='fillBlank5' class='blank-input' style='width:40px;'>&gt;\n    &lt;/<input type='text' id='fillBlank6' class='blank-input' style='width:60px;'>&gt;\n&lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["ul", "class", "li", "Gaming", "li", "ul"],
            h: "Use &lt;ul&gt;, class attribute, &lt;li&gt; tags."
        },
        {
            q: "Boss Q3. Create a webpage with header 'Feedback Portal', main with section containing two details elements. First: summary 'Helpful tips', p 'Tips that are helpful'. Second: summary 'More Information', p 'Additional information unavailable'.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n&lt;body&gt;\n  &lt;header&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:180px;'>&lt;/h1&gt;\n  &lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:80px;'>&gt;\n  &lt;main&gt;\n    &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:80px;'>&gt;\n      &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:80px;'>&gt;\n        &lt;summary&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank8' class='blank-input' style='width:80px;'>&gt;\n        &lt;<input type='text' id='fillBlank9' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank10' class='blank-input' style='width:200px;'>&lt;/p&gt;\n      &lt;/details&gt;\n      &lt;details&gt;\n        &lt;<input type='text' id='fillBlank11' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank12' class='blank-input' style='width:180px;'>&lt;/summary&gt;\n        &lt;p&gt;<input type='text' id='fillBlank13' class='blank-input' style='width:280px;'>&lt;/p&gt;\n      &lt;/<input type='text' id='fillBlank14' class='blank-input' style='width:80px;'>&gt;\n    &lt;/section&gt;\n  &lt;/<input type='text' id='fillBlank15' class='blank-input' style='width:80px;'>&gt;\n&lt;/body&gt;\n&lt;/<input type='text' id='fillBlank16' class='blank-input' style='width:60px;'>&gt;</pre>",
            a: ["html", "h1", "Feedback Portal", "header", "section", "details", "Helpful tips", "summary", "p", "Tips that are helpful", "summary", "More Information", "Additional information unavailable", "details", "main", "html"],
            h: "First details: summary 'Helpful tips', p 'Tips that are helpful'. Second: summary 'More Information', p 'Additional information unavailable'."
        },
        {
            q: "Boss Q4. Create a webpage with header 'Feedback Portal', main with form, section 'User Preferences', label 'Level:', select with options 'Low' and 'High', submit button 'Submit Info'.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n  &lt;body&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:80px;'>&gt;\n      &lt;h1&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:180px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:40px;'>&gt;\n    &lt;/header&gt;\n    &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:60px;'>&gt;\n      &lt;form&gt;\n        &lt;section&gt;\n          &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:180px;'>&lt;/h3&gt;\n          &lt;label&gt;<input type='text' id='fillBlank8' class='blank-input' style='width:80px;'>&lt;/<input type='text' id='fillBlank9' class='blank-input' style='width:60px;'>&gt;\n          &lt;<input type='text' id='fillBlank10' class='blank-input' style='width:80px;'>&gt;\n            &lt;option&gt;<input type='text' id='fillBlank11' class='blank-input' style='width:60px;'>&lt;/<input type='text' id='fillBlank12' class='blank-input' style='width:80px;'>&gt;\n            &lt;<input type='text' id='fillBlank13' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank14' class='blank-input' style='width:60px;'>&lt;/option&gt;\n          &lt;/select&gt;\n        &lt;/section&gt;\n        &lt;button type=\"submit\"&gt;<input type='text' id='fillBlank15' class='blank-input' style='width:140px;'>&lt;/<input type='text' id='fillBlank16' class='blank-input' style='width:80px;'>&gt;\n      &lt;/form&gt;\n    &lt;/main&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["html", "header", "Feedback Portal", "h1", "main", "h3", "User Preferences", "Level:", "label", "select", "Low", "option", "option", "High", "Submit Info", "button"],
            h: "Header h1 'Feedback Portal', main form, section h3 'User Preferences', label 'Level:', select Low/High, button 'Submit Info'."
        },
        {
            q: "Boss Q5. Create a webpage with button 'Click Me' that calls showMessage() on click. The function should alert 'Hello!' and be defined inside a script tag.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n&lt;body&gt;\n  &lt;button onclick=\"<input type='text' id='fillBlank2' class='blank-input' style='width:130px;'>()\"&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:100px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:80px;'>&gt;\n  &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:80px;'>&gt;\n    function <input type='text' id='fillBlank6' class='blank-input' style='width:130px;'>() {\n      alert(\"<input type='text' id='fillBlank7' class='blank-input' style='width:80px;'>\");\n    }\n  &lt;/script&gt;\n&lt;/body&gt;\n&lt;/<input type='text' id='fillBlank8' class='blank-input' style='width:60px;'>&gt;</pre>",
            a: ["html", "showMessage", "Click Me", "button", "script", "showMessage", "Hello!", "html"],
            h: "Button calls 'showMessage()'. Script defines function with alert 'Hello!'."
        }
    ]
};

let battleQIndex_L3 = 0;
let isTyping_L3 = false;

function openBattleModal_L3(isBoss) {
    battleQIndex_L3 = 0;
    const randomBG = isBoss ? 'img/bg-boss.png' : BG_NUM_L3[Math.floor(Math.random() * BG_NUM_L3.length)];
    const enemy = isBoss ? BOSSES_L3[Math.floor(Math.random() * BOSSES_L3.length)] : ENEMIES_L3[Math.floor(Math.random() * ENEMIES_L3.length)];
    const introDialogue = isBoss ? [BOSS_DIAL_L3[Math.floor(Math.random() * BOSS_DIAL_L3.length)], PLAYER_DIAL_L3[Math.floor(Math.random() * PLAYER_DIAL_L3.length)]] : [ENEMY_DIAL_L3[Math.floor(Math.random() * ENEMY_DIAL_L3.length)], PLAYER_DIAL_L3[Math.floor(Math.random() * PLAYER_DIAL_L3.length)]];

    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="battle-container border border-4 border-white bg-black position-relative overflow-hidden" style="font-family: 'Pixelify Sans', sans-serif; color: white;">
            <style>
                .blank-input { background: #222; border: none; border-bottom: 2px solid #fff; color: #00ff00; font-family: 'Pixelify Sans', monospace; padding: 0 5px; margin: 2px; }
                .blank-input:focus { outline: none; background: #333; border-bottom: 2px solid #00ff00; }
            </style>
            <div id="heartLossBox" class="position-absolute top-0 start-50 translate-middle-x mt-2 d-none" style="z-index: 6000;"><div class="bg-danger border border-white p-3 text-white pixel-font shadow-lg"><h3 class="mb-0 text-uppercase">-1 Heart: System Corruption!</h3></div></div>
            <div id="errorFeedbackBox" class="position-absolute top-50 start-50 translate-middle mt-2 d-none" style="z-index: 6000; width: 90%;"><div class="bg-warning border border-white p-3 text-dark pixel-font shadow-lg"><p id="errorFeedbackText" class="mb-0"></p></div></div>
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
    setTimeout(() => { document.addEventListener('keydown', battleEnterHandler_L3); }, 100);
    startSequence_L3(introDialogue, () => {
        document.getElementById('quizArea').classList.remove('d-none');
        loadQuestion_L3();
    });
}

function battleEnterHandler_L3(e) {
    if (e.key === 'Enter') {
        const quizArea = document.getElementById('quizArea');
        if (quizArea && !quizArea.classList.contains('d-none')) {
            e.preventDefault();
            checkBattleAnswer_L3(gameState.currentSite === 5);
        }
    }
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
    let errorMessages = [];

    if (Array.isArray(qData.a)) {
        inputs.forEach((input, index) => {
            const userAnswer = input.value.trim();
            const correctAnswer = qData.a[index];
            if (userAnswer === '') {
                isCorrect = false;
                errorMessages.push(`Field ${index + 1}: You left this blank. Make sure to fill in all fields.`);
            } else if (userAnswer.toLowerCase() !== correctAnswer.toLowerCase()) {
                isCorrect = false;
                if (correctAnswer.startsWith('<') && correctAnswer.endsWith('>')) {
                    errorMessages.push(`Field ${index + 1}: "${userAnswer}" is not the right HTML tag. Remember HTML tags use angle brackets.`);
                } else if (correctAnswer.includes(':')) {
                    errorMessages.push(`Field ${index + 1}: "${userAnswer}" is not the correct CSS property. Remember to include the colon and semicolon.`);
                } else if (correctAnswer.includes(' ')) {
                    errorMessages.push(`Field ${index + 1}: "${userAnswer}" doesn't match the required text. Check your spelling.`);
                } else {
                    errorMessages.push(`Field ${index + 1}: "${userAnswer}" is incorrect. Double-check what should go in this field.`);
                }
            }
        });
    } else {
        const userAnswer = inputs[0].value.trim();
        const correctAnswer = qData.a;
        if (userAnswer === '') {
            isCorrect = false;
            errorMessages.push(`You left the field empty. Try typing your answer.`);
        } else if (userAnswer.toLowerCase() !== correctAnswer.toLowerCase()) {
            isCorrect = false;
            if (correctAnswer.startsWith('<') && correctAnswer.endsWith('>')) {
                errorMessages.push(`"${userAnswer}" is not the correct HTML tag. Remember to use proper HTML syntax.`);
            } else if (correctAnswer.includes(':')) {
                errorMessages.push(`"${userAnswer}" is not the correct CSS property. Make sure to include the colon and semicolon.`);
            } else if (correctAnswer.includes(' ')) {
                errorMessages.push(`"${userAnswer}" doesn't match the expected text. Review the instructions.`);
            } else {
                errorMessages.push(`"${userAnswer}" is not quite right. Think about what belongs here.`);
            }
        }
    }

    if (isCorrect) {
        const errorBox = document.getElementById('errorFeedbackBox');
        if (errorBox) errorBox.classList.add('d-none');
        battleQIndex_L3++;
        if (battleQIndex_L3 >= (isBoss ? 5 : 3)) showBattleResult_L3(true, isBoss);
        else loadQuestion_L3();
    } else {
        gameState.hearts--;
        updateUI();
        const lossBox = document.getElementById('heartLossBox');
        if (lossBox) { lossBox.classList.remove('d-none'); setTimeout(() => lossBox.classList.add('d-none'), 1500); }
        const errorBox = document.getElementById('errorFeedbackBox');
        const errorText = document.getElementById('errorFeedbackText');
        if (errorBox && errorText) {
            errorText.innerHTML = errorMessages.join('<br>');
            errorBox.classList.remove('d-none');
            setTimeout(() => errorBox.classList.add('d-none'), 5000);
        }
        if (Array.isArray(qData.a)) {
            inputs.forEach((input, index) => {
                if (input.value.trim().toLowerCase() !== qData.a[index].toLowerCase()) {
                    input.style.borderBottom = '2px solid #ff0000';
                    input.style.backgroundColor = '#330000';
                    setTimeout(() => { input.style.borderBottom = '2px solid #fff'; input.style.backgroundColor = '#222'; }, 2500);
                }
            });
        } else {
            if (inputs[0].value.trim().toLowerCase() !== qData.a.toLowerCase()) {
                inputs[0].style.borderBottom = '2px solid #ff0000';
                inputs[0].style.backgroundColor = '#330000';
                setTimeout(() => { inputs[0].style.borderBottom = '2px solid #fff'; inputs[0].style.backgroundColor = '#222'; }, 2500);
            }
        }
        if (gameState.hearts <= 0) {
            if (errorBox) errorBox.classList.add('d-none');
            if (lossBox) lossBox.classList.add('d-none');
            showBattleResult_L3(false, isBoss);
        }
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

function showBattleResult_L3(won, isBoss) {
    document.removeEventListener('keydown', battleEnterHandler_L3);
    const quizArea = document.getElementById('quizArea');
    if (quizArea) quizArea.classList.add('d-none');
    
    // Add rewards for boss defeat
    if (won && isBoss) {
        gameState.hearts = Math.min(gameState.hearts + 1, 3);
        gameState.hints += 1;
        const heartCountEl = document.getElementById('heartCount');
        const hintCountEl = document.getElementById('hintCount');
        if (heartCountEl) heartCountEl.innerText = gameState.hearts;
        if (hintCountEl) hintCountEl.innerText = gameState.hints;
        console.log('BOSS REWARD - Hearts:', gameState.hearts, 'Hints:', gameState.hints);
    }
    
    runTypewriter(won ? "VICTORY! System integrity restored." : "DEFEAT... Connection lost.", 'battleText', () => {
        setTimeout(() => { if (won) renderVictoryModal_L3(isBoss); else renderDefeatModal_L3(); }, 1200);
    });
}

function renderVictoryModal_L3(isBoss) {
    const VICTORY_DIAL = ["That fight burned my shoe!", "Victory served hot!.", "Keep up the heat! Bring it on!"];
    
    // Check if this is the final boss (Level 3, Site 5)
    const isFinalBoss = (isBoss && gameState.currentLevel === 3 && gameState.currentSite === 5);
    
    console.log('renderVictoryModal_L3 - isBoss:', isBoss, 'isFinalBoss:', isFinalBoss);
    
    if (isFinalBoss) {
        // Stop the timer and get duration
        let finalTime = 0;
        let formattedTime = '0:00';
        
        if (typeof stopGameTimer === 'function') {
            finalTime = stopGameTimer();
            formattedTime = getFormattedDuration();
            console.log('Final time:', finalTime, 'seconds - Formatted:', formattedTime);
        } else {
            console.error('stopGameTimer function not available!');
        }
        
        // Submit to leaderboard - ensure valid time
        if (typeof submitGameCompletionTime === 'function' && finalTime > 0) {
            console.log('Submitting to leaderboard:', { finalTime, playerId: localStorage.getItem('playerId'), token: localStorage.getItem('authToken')?.substring(0, 20) + '...' });
            submitGameCompletionTime(finalTime).then((result) => {
                console.log('Leaderboard submission result:', result);
            }).catch(err => {
                console.error('Leaderboard submission failed:', err);
                alert('Failed to update leaderboard. Please try again.');
            });
        } else {
            console.error('Cannot submit to leaderboard:', { hasFunction: typeof submitGameCompletionTime === 'function', finalTime, isPositive: finalTime > 0 });
        }
        
        document.getElementById('modalContentWrapper').innerHTML = `
            <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
                <h1 class="text-white mb-3">✨ GAME COMPLETE! ✨</h1>
                <p class="text-white fs-2 mb-2">⏱️ Completion Time: ${formattedTime}</p>
                <p class="text-white fs-4 mb-4">"${VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)]}"</p>
                <p class="text-light mb-4">Your time has been recorded on the leaderboard!</p>
                <div class="d-flex gap-3 justify-content-center">
                    <button class="btn btn-light pixel-font fs-4 px-4" onclick="location.href='leaderboard.html'">VIEW LEADERBOARD</button>
                    <button class="btn btn-warning pixel-font fs-4 px-4" onclick="location.href='index.html'">MAIN MENU</button>
                </div>
            </div>`;
    } else {
        document.getElementById('modalContentWrapper').innerHTML = `
            <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
                <h1 class="text-white mb-3">${isBoss ? 'BOSS DEFEATED!' : 'SUCCESS'}</h1>
                <p class="text-white fs-4 mb-4">"${VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)]}"</p>
                <button class="btn btn-light pixel-font fs-4 px-4" onclick="proceed()">CONTINUE</button>
            </div>`;
    }
}

function renderDefeatModal_L3() {
    const DEFEAT_DIAL = ["The lava rose faster than my resolve...", "I underestimated a foe made of fire.", "The ruins claimed another wanderer.", "My final thought... was about a missing semicolon.", "The ash fills my lungs... the fire wins again..."];
    document.getElementById('modalContentWrapper').innerHTML = `
        <div style="background: #dc3545; padding: 40px 30px; text-align: center; border: 4px solid #fff; font-family: 'Pixelify Sans', sans-serif; box-shadow: 0 0 30px rgba(0,0,0,0.5);">
            <h1 style="color: #fff; margin-bottom: 10px; font-family: 'Pixelify Sans', sans-serif;">YOU DIED</h1>
            <p style="color: #fff; font-size: 1.2rem; margin-bottom: 20px; font-family: 'Pixelify Sans', sans-serif;">"${DEFEAT_DIAL[Math.floor(Math.random() * DEFEAT_DIAL.length)]}"</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="restartGame()" style="background: #ffc107; color: #000; border: none; padding: 12px; font-family: 'Pixelify Sans', sans-serif; font-size: 1.2rem; border-radius: 6px; cursor: pointer;">RETRY LEVEL</button>
                <button onclick="homeAndReset()" style="background: #1a1a1a; color: #fff; border: 2px solid #fff; padding: 12px; font-family: 'Pixelify Sans', sans-serif; font-size: 1.2rem; border-radius: 6px; cursor: pointer;">MAIN MENU</button>
            </div>
        </div>`;
}

function homeAndReset() {
    if (typeof resetGameTimer === 'function') resetGameTimer();
    location.href = 'index.html';
}
// Direct binding to dialogue box events
(function() {
    const NONACTIVE = 'url("../img/click-nonactive.png"), pointer';
    const ACTIVE = 'url("../img/click-active.png"), auto';
    
    function setCursor(element, state) {
        if (!element) return;
        const cursor = state === 'active' ? ACTIVE : NONACTIVE;
        element.style.cursor = cursor;
        element.style.setProperty('cursor', cursor, 'important');
    }
    
    // Hook into the existing dialogue box click handler
    const originalStartSequence = window.startSequence;
    if (originalStartSequence) {
        window.startSequence = function(lines, callback) {
            setTimeout(() => {
                const dialogueBox = document.getElementById('dialogueBox');
                if (dialogueBox) {
                    setCursor(dialogueBox, 'inactive');
                    
                    // Override the onclick that the game sets
                    const originalOnClick = dialogueBox.onclick;
                    dialogueBox.addEventListener('mousedown', () => setCursor(dialogueBox, 'active'));
                    dialogueBox.addEventListener('mouseup', () => setCursor(dialogueBox, 'inactive'));
                    dialogueBox.addEventListener('mouseleave', () => setCursor(dialogueBox, 'inactive'));
                }
            }, 50);
            return originalStartSequence.call(this, lines, callback);
        };
    }
    
    // Monitor for battle modal opening
    const originalOpenBattleModal = window.openBattleModal;
    if (originalOpenBattleModal) {
        window.openBattleModal = function(isBoss) {
            const result = originalOpenBattleModal.call(this, isBoss);
            setTimeout(() => {
                const dialogueBox = document.getElementById('dialogueBox');
                if (dialogueBox) {
                    setCursor(dialogueBox, 'inactive');
                    dialogueBox.addEventListener('mousedown', () => setCursor(dialogueBox, 'active'));
                    dialogueBox.addEventListener('mouseup', () => setCursor(dialogueBox, 'inactive'));
                }
            }, 100);
            return result;
        };
    }
    
    // Also for Level 2 and 3
    if (window.openBattleModal_L2) {
        const originalL2 = window.openBattleModal_L2;
        window.openBattleModal_L2 = function(isBoss) {
            const result = originalL2.call(this, isBoss);
            setTimeout(() => {
                const dialogueBox = document.getElementById('dialogueBox');
                if (dialogueBox) setCursor(dialogueBox, 'inactive');
            }, 100);
            return result;
        };
    }
    
    if (window.openBattleModal_L3) {
        const originalL3 = window.openBattleModal_L3;
        window.openBattleModal_L3 = function(isBoss) {
            const result = originalL3.call(this, isBoss);
            setTimeout(() => {
                const dialogueBox = document.getElementById('dialogueBox');
                if (dialogueBox) setCursor(dialogueBox, 'inactive');
            }, 100);
            return result;
        };
    }
    
    // Force cursor on card clicks
    document.body.addEventListener('click', function(e) {
        const card = e.target.closest('.card-option');
        if (card) {
            setCursor(card, 'active');
            setTimeout(() => setCursor(card, 'inactive'), 150);
        }
        
        const dialogueBox = e.target.closest('#dialogueBox');
        if (dialogueBox) {
            setCursor(dialogueBox, 'active');
            setTimeout(() => setCursor(dialogueBox, 'inactive'), 150);
        }
    }, true);
})();