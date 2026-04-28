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
// LEVEL 3 — VOLCANIC RUINS
// ============================================================

const BG_NUM_L3 = ['img/bg-cavern.jpg','img/bg-crystalcave.png', 'img/bg-lava.png'];
const ENEMIES_L3 = ['enemy-roach.png', 'enemy-sausagepillar.png', 'enemy-centipede.png', 'enemy-ant.png'];
const BOSSES_L3 = ['boss-buffguy.png'];

const PLAYER_DIAL_L3 = ["YOU: You reek of brimstone and sulfur. Time to clean up.", "YOU: You're wreathed in flame... but your heart is still cold? Why?.", "YOU: Y'alls living condition honestly don't make sense! Let me give you mercy.", "YOU: An ancient evil, burning through the ages. How poetic. How dead.", "YOU: I've debugged worse. Probably. Let's see."];
const ENEMY_DIAL_L3 = ["ENEMY: You may be warm-blooded, but can you survive this heat?", "ENEMY: The eruption never ended. Neither will your suffering.", "ENEMY: Ash and ruin is all that remains. Join them, foolish being!", "ENEMY: We were forged in the core of this world", "ENEMY: You cannot survive these temperatures.", "ENEMY: The volcano claimed this land. We claimed the volcano."];

const BOSS_DIAL_L3 = [
    "INFERNUS: I have reduced civilizations to cinders. Be one with the ash!",
    "INFERNUS: Bow down to the emperor of the flames! Infernus! Me! WAHAHAHAHA!!!",
    "INFERNUS: BLLEEEUUGGHHH! Still raw! You aren't cooked yet? in this heat??? I'll burn you up a thousandfold!",
    "INFERNUS: I watched this world form from magma. I will watch it end the same way. You being in it shall be an achievement!"
];

const QUESTIONS_L3 = {
    1: [
        {
            q: "Make this a copyright notice at the very bottom of the page. Fill in the semantic tag.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;<input type='text' id='fillBlank' class='blank-input' style='width:100px;'>&gt;\n  &lt;p&gt;Copyright 2026. All rights reserved.&lt;/p&gt;\n&lt;/<input type='text' id='fillBlank2' class='blank-input' style='width:100px;'>&gt;</pre>",
            a: ["footer", "footer"],
            h: "The semantic tag for footer content at the bottom of a page is &lt;footer&gt;. Use the same tag for both opening and closing."
        },
        {
            q: "Correct the Toggle Switch: Fix the typos in the input tag to create a functional checkbox for email updates.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;input type=\"<input type='text' id='fillBlank' class='blank-input' style='width:120px;'>\" id=\"email\"&gt;\n&lt;<input type='text' id='fillBlank2' class='blank-input' style='width:80px;'> for=\"email\"&gt;Subscribe to updates&lt;/label&gt;</pre>",
            a: ["checkbox", "label"],
            h: "The correct type for a checkbox is 'checkbox' (not 'check-box'). The closing tag should be &lt;/label&gt; with an 'l' not double 'l'."
        },
        {
            q: "Add another option for the user experience level, name it 'Intermediate' and place it between the two existing options.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;h3&gt;User Survey&lt;/h3&gt;\n&lt;label&gt;Experience Level:&lt;/label&gt;\n&lt;select&gt;\n  &lt;option&gt;Beginner&lt;/option&gt;\n  <input type='text' id='fillBlank' class='blank-input' style='width:200px;'>\n  &lt;option&gt;Expert&lt;/option&gt;\n&lt;/select&gt;</pre>",
            a: "<option>Intermediate</option>",
            h: "Add a new &lt;option&gt; tag with the text 'Intermediate' between Beginner and Expert."
        }
    ],
    2: [
        {
            q: "Fix the semantic tag used for the title of the entire page at the very top.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;<input type='text' id='fillBlank' class='blank-input' style='width:80px;'>&gt;\n  &lt;h1&gt;Feedback Portal&lt;/h1&gt;\n&lt;/<input type='text' id='fillBlank2' class='blank-input' style='width:80px;'>&gt;</pre>",
            a: ["header", "header"],
            h: "The semantic tag for the introductory content or navigation links at the top of a page is &lt;header&gt;."
        },
        {
            q: "Update the Rotary Dial (Dropdown), replace the 'Beginner' option with 'Newbie'<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;select&gt;\n  &lt;option&gt;<input type='text' id='fillBlank' class='blank-input' style='width:100px;'>&lt;/option&gt;\n  &lt;option&gt;Expert&lt;/option&gt;\n&lt;/select&gt;</pre>",
            a: "Newbie",
            h: "Change the text 'Beginner' to 'Newbie' inside the first &lt;option&gt; tag."
        },
        {
            q: "Change header background to darkgreen<br><pre style='color:white; font-family:\"Pixelify Sans\"'>header {\n  <input type='text' id='fillBlank' class='blank-input' style='width:200px;'>\n  color: white;\n  padding: 15px;\n  border-radius: 8px;\n  text-align: center;\n}</pre>",
            a: "background-color: darkgreen;",
            h: "Replace the existing background-color value with 'darkgreen'. The property is 'background-color'."
        }
    ],
    3: [
        {
            q: "Remove the hover effect. Delete the entire button:hover block.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>button:hover {\n  background-color: #2980b9;\n}<br><br>Type the word that means to remove or delete this code: <input type='text' id='fillBlank' class='blank-input' style='width:100px;'></pre>",
            a: "delete;",
            h: "The instruction says to remove or delete the entire button:hover block. Type 'delete' to confirm."
        },
        {
            q: "Add border and make the color of it blue to &lt;details&gt;<br><pre style='color:white; font-family:\"Pixelify Sans\"'>details {\n  background-color: #e8f4fd;\n  padding: 10px;\n  border-radius: 5px;\n  margin-bottom: 20px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:250px;'>\n}</pre>",
            a: "border: blue;",
            h: "Add a border property with the color blue."
        },
        {
            q: "Change &lt;h3&gt; font size to 20px<br><pre style='color:white; font-family:\"Pixelify Sans\"'>h3 {\n  color: #2c3e50;\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 5px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:150px;'>\n}</pre>",
            a: "font-size: 20px;",
            h: "Use the 'font-size' property to change the size of text. Set it to '20px'."
        }
    ],
    4: [
        {
            q: "Change body background to lightyellow<br><pre style='color:white; font-family:\"Pixelify Sans\"'>body {\n  font-family: Arial, sans-serif;\n  max-width: 500px;\n  margin: 20px auto;\n  padding: 20px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:200px;'>\n}</pre>",
            a: "background-color: lightyellow;",
            h: "Change the background-color property to 'lightyellow'. The current value is '#f0f4f8'."
        },
        {
            q: "Change the alert message to 'You must accept the terms first!'<br><pre style='color:white; font-family:\"Pixelify Sans\"'>if (!terms) {\n  alert('<input type='text' id='fillBlank' class='blank-input' style='width:280px;'>');\n  return;\n}</pre>",
            a: "You must accept the terms first!",
            h: "Replace the existing alert message with the exact text: 'You must accept the terms first!'"
        },
        {
            q: "Add date variable and console log. Add this to any line within &lt;script&gt;<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;script&gt;\n  <input type='text' id='fillBlank' class='blank-input' style='width:280px;'>\n  <input type='text' id='fillBlank2' class='blank-input' style='width:180px;'>\n&lt;/script&gt;</pre>",
            a: ["var today = new Date();", "console.log(today);"],
            h: "First create a new Date object: 'var today = new Date();' Then log it: 'console.log(today);'"
        }
    ],
    5: [
        {
            q: "Boss Q1. Create an HTML webpage with the title 'Explore More'. Inside the body, include a heading that says 'Visit Google', a link that leads to https://www.google.com labeled 'Click here to search', and an image with the source logo.png and an alternative text 'Website Logo'.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;<input type='text' id='fillBlank' class='blank-input' style='width:80px;'>&gt;\n    &lt;title&gt;<input type='text' id='fillBlank2' class='blank-input' style='width:150px;'>&lt;/title&gt;\n  &lt;/<input type='text' id='fillBlank3' class='blank-input' style='width:80px;'>&gt;\n  &lt;body&gt;\n    &lt;h1&gt;<input type='text' id='fillBlank4' class='blank-input' style='width:150px;'>&lt;/h1&gt;\n    &lt;a <input type='text' id='fillBlank5' class='blank-input' style='width:80px;'>=&quot;<input type='text' id='fillBlank6' class='blank-input' style='width:150px;'>&quot;&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:150px;'>&lt;/a&gt;\n    &lt;img <input type='text' id='fillBlank8' class='blank-input' style='width:80px;'>=&quot;<input type='text' id='fillBlank9' class='blank-input' style='width:80px;'>&quot; alt=&quot;<input type='text' id='fillBlank10' class='blank-input' style='width:150px;'>&quot;&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["head", "Explore More", "head", "Visit Google", "href", "https://www.google.com", "Click here to search", "src", "logo.png", "Website Logo"],
            h: "Fill in: head tag with title 'Explore More', h1 'Visit Google', a with href attribute, img with src attribute."
        },
        {
            q: "Boss Q2. Create an HTML webpage with the title 'My Hobbies'. Inside the body, add a heading 'Things I Love'. Create an unordered list with two items: 'Coding' (with a class named 'highlight') and 'Gaming'.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;My Hobbies&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    &lt;h1&gt;Things I Love&lt;/h1&gt;\n    &lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n        &lt;li <input type='text' id='fillBlank2' class='blank-input' style='width:80px;'>=&quot;highlight&quot;&gt;Coding&lt;/li&gt;\n        &lt;<input type='text' id='fillBlank3' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&lt;/<input type='text' id='fillBlank5' class='blank-input' style='width:40px;'>&gt;\n    &lt;/<input type='text' id='fillBlank6' class='blank-input' style='width:60px;'>&gt;\n&lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["ul", "class", "li", "Gaming", "li", "ul"],
            h: "Use &lt;ul&gt; for unordered list, class attribute for 'highlight', then &lt;li&gt; tags for list items."
        },
        {
            q: "Boss Q3. Create an HTML webpage with a header titled 'Feedback Portal'. Inside the main section, add a section that contains two collapsible details elements. Each element should have a summary and a paragraph inside. The first summary should show “Helpful tips” and show “Tips that are helpful.” when unfolded. The second summary should show “More Information” and show “Additional information unavailable.” when unfolded.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n&lt;body&gt;\n\n  &lt;header&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:180px;'>&lt;/h1&gt;\n  &lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:80px;'>&gt;\n\n  &lt;main&gt;\n    &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:80px;'>&gt;\n      &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:80px;'>&gt;\n        &lt;summary&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank8' class='blank-input' style='width:80px;'>&gt;\n        &lt;<input type='text' id='fillBlank9' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank10' class='blank-input' style='width:200px;'>&lt;/p&gt;\n      &lt;/details&gt;\n\n      &lt;details&gt;\n        &lt;<input type='text' id='fillBlank11' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank12' class='blank-input' style='width:180px;'>&lt;/summary&gt;\n        &lt;p&gt;<input type='text' id='fillBlank13' class='blank-input' style='width:250px;'>&lt;/p&gt;\n      &lt;/<input type='text' id='fillBlank14' class='blank-input' style='width:80px;'>&gt;\n    &lt;/section&gt;\n  &lt;/<input type='text' id='fillBlank15' class='blank-input' style='width:80px;'>&gt;\n\n&lt;/body&gt;\n&lt;/<input type='text' id='fillBlank16' class='blank-input' style='width:60px;'>&gt;</pre>",
            a: ["html", "h1", "Feedback Portal", "header", "section", "details", "Helpful tips", "summary", "p", "Tips that are helpful.", "summary", "More Information", "Additional information unavailable.", "details", "main", "html"],
            h: "First details: summary 'Helpful tips', p 'Tips that are helpful.' Second details: summary 'More Information', p 'Additional information unavailable.'"
        },
        {
            q: "Boss Q4. Create an HTML webpage titled implicitly by its content 'Feedback Portal'. Inside the body, add a header containing a main heading with that title. Below the header, include a main section that contains a form. Inside the form, create a section titled 'User Preferences'. Add a label 'Level:' followed by a dropdown (select) element with two options: 'Low' and 'High'. Finally, add a submit button labeled 'Submit Info'.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n  &lt;body&gt;\n\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:80px;'>&gt;\n      &lt;h1&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:180px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:40px;'>&gt;\n    &lt;/header&gt;\n\n    &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:60px;'>&gt;\n      &lt;form&gt;\n        &lt;section&gt;\n          &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:180px;'>&lt;/h3&gt;\n          &lt;label&gt;<input type='text' id='fillBlank8' class='blank-input' style='width:80px;'>&lt;/<input type='text' id='fillBlank9' class='blank-input' style='width:50px;'>&gt;\n          &lt;<input type='text' id='fillBlank10' class='blank-input' style='width:60px;'>&gt;\n            &lt;option&gt;<input type='text' id='fillBlank11' class='blank-input' style='width:60px;'>&lt;/<input type='text' id='fillBlank12' class='blank-input' style='width:80px;'>&gt;\n            &lt;<input type='text' id='fillBlank13' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank14' class='blank-input' style='width:60px;'>&lt;/option&gt;\n          &lt;/select&gt;\n        &lt;/section&gt;\n\n        &lt;button type=\"submit\"&gt;<input type='text' id='fillBlank15' class='blank-input' style='width:120px;'>&lt;/<input type='text' id='fillBlank16' class='blank-input' style='width:80px;'>&gt;\n      &lt;/form&gt;\n    &lt;/main&gt;\n\n  &lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["html", "header", "Feedback Portal", "h1", "main", "h3", "User Preferences", "Level:", "label", "select", "Low", "option", "option", "High", "Submit Info", "button"],
            h: "Header with h1 'Feedback Portal', main with form, section with h3 'User Preferences', label 'Level:', select with options 'Low' and 'High', submit button 'Submit Info'."
        },
        {
            q: "Boss Q5. Create a simple HTML webpage with a button labeled 'Click Me'. When the button is clicked, it should trigger a JavaScript function (showMessage)that displays an alert message 'Hello!'. Use an onclick event to connect the button to the JavaScript function, and define the function inside a script tag.<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n&lt;body&gt;\n\n  &lt;button onclick=\"<input type='text' id='fillBlank2' class='blank-input' style='width:120px;'>()\"&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:80px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:80px;'>&gt;\n\n  &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:60px;'>&gt;\n    function <input type='text' id='fillBlank6' class='blank-input' style='width:120px;'>() {\n      alert(\"<input type='text' id='fillBlank7' class='blank-input' style='width:80px;'>\");\n    }\n  &lt;/script&gt;\n\n&lt;/body&gt;\n&lt;/<input type='text' id='fillBlank8' class='blank-input' style='width:60px;'>&gt;</pre>",
            a: ["html", "showMessage", "Click Me", "button", "script", "showMessage", "Hello!", "html"],
            h: "Button calls 'showMessage()' when clicked. Script defines function showMessage() with alert 'Hello!'."
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
    
    // FIX: Add Enter key listener
    setTimeout(() => { 
        document.addEventListener('keydown', battleEnterHandler_L3); 
    }, 100);
    
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

    if (Array.isArray(qData.a)) {
        inputs.forEach((input, index) => {
            if (input.value.trim().toLowerCase() !== qData.a[index].toLowerCase()) isCorrect = false;
        });
    } else {
        if (inputs[0].value.trim().toLowerCase() !== qData.a.toLowerCase()) isCorrect = false;
    }

    if (isCorrect) {
        battleQIndex_L3++;
        if (battleQIndex_L3 >= (isBoss ? 5 : 3)) showBattleResult_L3(true, isBoss);
        else loadQuestion_L3();
    } else {
        gameState.hearts--;
        updateUI();
        const lossBox = document.getElementById('heartLossBox');
        if (lossBox) { 
            lossBox.classList.remove('d-none'); 
            setTimeout(() => lossBox.classList.add('d-none'), 1500); 
        }
        if (gameState.hearts <= 0) showBattleResult_L3(false, isBoss);
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
    // Remove enter key listener
    document.removeEventListener('keydown', battleEnterHandler_L3);
    
    const quizArea = document.getElementById('quizArea');
    if (quizArea) quizArea.classList.add('d-none');
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
        
        // Submit to leaderboard
        if (typeof submitGameCompletionTime === 'function') {
            submitGameCompletionTime(finalTime).then(() => {
                console.log('Leaderboard updated with time:', finalTime);
            }).catch(err => {
                console.error('Leaderboard submission failed:', err);
            });
        } else {
            console.error('submitGameCompletionTime function not available!');
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
    const DEFEAT_DIAL = ["The lava rose faster than my resolve...", "I underestimated a foe made of fire. Rookie mistake.", "The ruins claimed another wanderer. Today it was me.", "My final thought... was about a missing semicolon.", "The ash... fills my lungs... the fire... wins again..."];
    
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-danger p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <h1 class="text-white mb-2">YOU DIED</h1>
            <p class="text-white fs-5 mb-4">"${DEFEAT_DIAL[Math.floor(Math.random() * DEFEAT_DIAL.length)]}"</p>
            <div class="d-flex flex-column gap-2">
                <button class="btn btn-warning pixel-font fw-bold fs-4" onclick="restartGame()">RETRY LEVEL</button>
                <button class="btn btn-dark border-white pixel-font" onclick="homeAndReset()">MAIN MENU</button>
            </div>
        </div>`;
}

function homeAndReset() {
    if (typeof resetGameTimer === 'function') {
        resetGameTimer();
    }
    location.href = 'index.html';
}

function restartGame() {
    // Reset hearts and hints but stay on current level
    gameState.hearts = 3;
    gameState.hints = 1;
    gameState.currentSite = 1;
    gameState.lastChoice = null;
    gameState.currentQuestionIndex = 0;
    updateUI();
    
    // Close modal and reload the page to restart the level properly (timer continues - DO NOT reset timer)
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