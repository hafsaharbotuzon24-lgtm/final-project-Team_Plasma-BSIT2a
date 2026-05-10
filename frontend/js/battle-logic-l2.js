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
// LEVEL 2 — Dungeon 
// ============================================================

const BG_NUM_L2 = ['img/bg-dungeon.png', 'img/bg-balcony.png', 'img/bg-torture_room.png'];
const ENEMIES_L2 = ['enemy-mosquito.png', 'enemy-yellowmoth.png', 'enemy-beetle.png', 'enemy-dogfly.png'];
const BOSSES_L2 = ['boss-kingfly.png'];

const PLAYER_DIAL_L2 = ["YOU: You have eaten spellbooks worth more than your colony.", "YOU: You have claimed this castle long enough. Descend and face me.", "YOU: The villagers fled because of you. Your thirst ends now.", "YOU: I feel the cold radiating from you. Is that malice or just your nature?", "YOU: Your body looks fragile. Let me test that theory!"];
const ENEMY_DIAL_L2 = ["ENEMY: These walls are ours. Turn back or be crushed.", "ENEMY: Innocents taste the sweetest. I will not leave.", "ENEMY: You bring warmth here. We will snuff it out.", "ENEMY: Your power will die before it touches my skin.", "ENEMY: Your bones will join the mineral deposits.", "ENEMY: We have waited ages for prey. You'll do just fine."];

const BOSS_DIAL_L2 = [
    "LORD OF THE FLIES: FEED! DESTROY! AND DEVOUR!",
    "LORD OF THE FLIES: Every bone you see was once a trespasser like you. Want to join them? Ehuehuehuehue...",
    "LORD OF THE FLIES: Children, swarm this peckish fool! Dinner is served! Main dish? YOU!",
    "LORD OF THE FLIES: This castle was once peaceful. Your kind keeps trespassing! Must I use my iron fist to finish all of you off?"
];

const QUESTIONS_L2 = {
    1: [
        {
            q: "Find the &lt;ul&gt; tag and update the list by adding another list tag &lt;li&gt; with the content \"Advanced Layouts\" and the status \"Pending\":<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;section&gt;\n  &lt;h2&gt;Task List&lt;/h2&gt;\n  &lt;ul&gt;\n    &lt;li&gt;HTML Structure &lt;i&gt;(Completed)&lt;/i&gt;&lt;/li&gt;\n    &lt;li&gt;Forms &amp; Inputs &lt;i&gt;(In Progress)&lt;/i&gt;&lt;/li&gt;\n    <input type='text' id='fillBlank' class='blank-input' style='width:320px;'>\n  &lt;/ul&gt;\n&lt;/section&gt;</pre>",
            a: "<li>Advanced Layouts <i>(Pending)</i></li>",
            h: "Add a new &lt;li&gt; tag with 'Advanced Layouts' and wrap '(Pending)' in &lt;i&gt; tags for italics, just like the items above it."
        },
        {
            q: "Add a third navigation link in the &lt;nav&gt; section. Place a | symbol after \"Settings\" and add a new &lt;b&gt; tag containing the word \"Profile\":<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;header&gt;\n  &lt;h1&gt;Dashboard&lt;/h1&gt;\n  &lt;nav&gt;&lt;b&gt;Home&lt;/b&gt; | &lt;b&gt;Settings&lt;/b&gt;<input type='text' id='fillBlank' class='blank-input' style='width:180px;'>&lt;/nav&gt;\n&lt;/header&gt;</pre>",
            a: " | <b>Profile</b>",
            h: "Add a pipe symbol | followed by &lt;b&gt;Profile&lt;/b&gt; to match the format of the other navigation links."
        },
        {
            q: "Fix the nesting error in the code below. The &lt;b&gt; tag is not properly closed inside the &lt;p&gt; tag:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;p&gt;This is &lt;b&gt;important text!&lt;/p&gt;&lt;/b&gt;</pre><br>Type the CORRECTED code:<br><input type='text' id='fillBlank' class='blank-input' style='width:100%;'>",
            a: "<p>This is <b>important text!</b></p>",
            h: "The &lt;/b&gt; must close BEFORE &lt;/p&gt;. Tags must nest properly: last opened, first closed."
        }
    ],
    2: [
        {
            q: "Update the &lt;footer&gt; and change the text inside the &lt;small&gt; tag. Currently it says \"User: Admin | Status: Offline\". Change it so the user is \"Guest\" and the status is \"Online\":<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;footer&gt;\n  &lt;p&gt;&lt;small&gt;User: Admin | Status: Offline&lt;/small&gt;&lt;/p&gt;\n&lt;/footer&gt;</pre><br>Type the NEW text that should go inside the &lt;small&gt; tag:<br><input type='text' id='fillBlank' class='blank-input' style='width:280px;'>",
            a: "User: Guest | Status: Online",
            h: "Change 'Admin' to 'Guest' and 'Offline' to 'Online'. Keep the format: User: ___ | Status: ___"
        },
        {
            q: "Fix the two tags with errors in this code. The closing tags for &lt;h3&gt; and &lt;label&gt; are misspelled:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;section&gt;\n  &lt;h3&gt;Quick Entry&lt;/s2&gt;\n  &lt;label for=\"task\"&gt;New Task:&lt;/lapel&gt;\n  &lt;input type=\"text\" id=\"task\" value=\"Type here...\"&gt;\n  &lt;br&gt;&lt;br&gt;\n  &lt;button&gt;Add Task&lt;/button&gt;\n&lt;/section&gt;</pre><br>Type ONLY the 2 corrected lines (one per line):<br><input type='text' id='fillBlank' class='blank-input' style='width:100%;'>",
            a: "<h3>Quick Entry</h3>\n<label for=\"task\">New Task:</label>",
            h: "Line 1: &lt;/s2&gt; must be &lt;/h3&gt;. Line 2: &lt;/lapel&gt; must be &lt;/label&gt;. Type both corrected lines."
        },
        {
            q: "Fix and place the missing opening tags. Line 1 is missing &lt;li&gt; and Line 2 is missing &lt;i&gt;:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>__ HTML Structure &lt;i&gt;(Completed)&lt;/i&gt;&lt;/li&gt;\n&lt;li&gt;Forms &amp; Inputs __ (In Progress)&lt;/i&gt;&lt;/li&gt;</pre><br>Type the 2 corrected lines (one per line):<br><input type='text' id='fillBlank' class='blank-input' style='width:100%;'>",
            a: "<li>HTML Structure <i>(Completed)</i></li>\n<li>Forms & Inputs <i>(In Progress)</i></li>",
            h: "Line 1 needs &lt;li&gt; at the start. Line 2 needs &lt;i&gt; before (In Progress)."
        }
    ],
    3: [
        {
            q: "Find the &lt;h1&gt; tag within the &lt;header&gt; below. Currently it says \"Dashboard\". Change the text to \"Admin Control Center\":<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;header&gt;\n  &lt;h1&gt;Dashboard&lt;/h1&gt;\n  &lt;nav&gt;&lt;b&gt;Home&lt;/b&gt; | &lt;b&gt;Settings&lt;/b&gt;&lt;/nav&gt;\n&lt;/header&gt;</pre><br>Type only the new heading text that should replace \"Dashboard\":<br><input type='text' id='fillBlank' class='blank-input' style='width:220px;'>",
            a: "Admin Control Center",
            h: "Simply replace 'Dashboard' with 'Admin Control Center' inside the &lt;h1&gt; tags."
        },
        {
            q: "Fix the error in this label tag. The closing tag is misspelled as &lt;/lapel&gt; instead of &lt;/label&gt;:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;label for=\"task\"&gt;New Task:&lt;/lapel&gt;</pre><br>Type the CORRECTED line:<br><input type='text' id='fillBlank' class='blank-input' style='width:100%;'>",
            a: "<label for=\"task\">New Task:</label>",
            h: "Change the closing tag from &lt;/lapel&gt; to &lt;/label&gt;."
        },
        {
            q: "Change the button's text color to black in this CSS. Currently the color is set to white:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>button {\n  background-color: #4CAF50;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n}</pre><br>Type the corrected CSS property line:<br><input type='text' id='fillBlank' class='blank-input' style='width:200px;'>",
            a: "color: black;",
            h: "Change 'color: white;' to 'color: black;'. Just type the corrected line."
        }
    ],
    4: [
        {
            q: "The footer text needs to be centered. Look at this CSS code. Type the exact CSS property line that centers text horizontally:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>footer {\n  background-color: #333;\n  color: white;\n  padding: 15px 20px;\n  border-radius: 8px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:200px;'>\n}</pre>",
            a: "text-align: center;",
            h: "The property is 'text-align: center;' — type it exactly as shown."
        },
        {
            q: "Change the body background color to white. Currently it's set to #f5f5f5 (light gray). Type the corrected CSS property line:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>body {\n  font-family: Arial, sans-serif;\n  max-width: 800px;\n  margin: 20px auto;\n  padding: 20px;\n  <input type='text' id='fillBlank' class='blank-input' style='width:280px;'>\n}</pre>",
            a: "background-color: white;",
            h: "The property should be 'background-color: white;' instead of '#f5f5f5'."
        },
        {
            q: "Change the header background color to blue. Currently it's set to #333 (dark gray). Type the corrected CSS property line:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>header {\n  <input type='text' id='fillBlank' class='blank-input' style='width:280px;'>\n  color: white;\n  padding: 15px 20px;\n  border-radius: 8px;\n}</pre>",
            a: "background-color: blue;",
            h: "The property should be 'background-color: blue;' instead of '#333'."
        }
    ],
    5: [
        {
            q: "Boss Q1. Modify the &lt;body&gt; to be centered, change text color to blue, and set background color to yellow using CSS:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>body {\n    background-color: <input type='text' id='fillBlank' class='blank-input' style='width:100px;'>;\n    <input type='text' id='fillBlank2' class='blank-input' style='width:70px;'>: <input type='text' id='fillBlank3' class='blank-input' style='width:80px;'>;\n    text-align: <input type='text' id='fillBlank4' class='blank-input' style='width:80px;'>;\n}</pre>",
            a: ["yellow", "color", "blue", "center"],
            h: "background-color: yellow, color: blue, text-align: center."
        },
        {
            q: "Boss Q2. Create a webpage titled \"My List\" with a heading \"My Favorite Colors\" and an unordered list: Blue, Yellow, Red:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:50px;'>&gt;\n  &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:50px;'>&gt;\n    &lt;<input type='text' id='fillBlank3' class='blank-input' style='width:50px;'>&gt;<input type='text' id='fillBlank4' class='blank-input' style='width:80px;'>&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:50px;'>&gt;\n    &lt;h1&gt;<input type='text' id='fillBlank6' class='blank-input' style='width:150px;'>&lt;/h1&gt;\n    &lt;<input type='text' id='fillBlank7' class='blank-input' style='width:40px;'>&gt;\n      &lt;li&gt;<input type='text' id='fillBlank8' class='blank-input' style='width:60px;'>&lt;/li&gt;\n      &lt;<input type='text' id='fillBlank9' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank10' class='blank-input' style='width:60px;'>&lt;/li&gt;\n      &lt;<input type='text' id='fillBlank11' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank12' class='blank-input' style='width:60px;'>&lt;/li&gt;\n    &lt;/ul&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["html", "head", "title", "My List", "body", "My Favorite Colors", "ul", "Blue", "li", "Yellow", "li", "Red"],
            h: "Standard page: html>head>title, then body>h1+ul>li*3. Title is 'My List', heading is 'My Favorite Colors'."
        },
        {
            q: "Boss Q3. Create a webpage with heading \"My Tasks\", an unordered list (Task 1, Task 2, Task 3), and a footer displaying \"Status: Active\":<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:50px;'>&gt;\n  &lt;body&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:100px;'>&lt;/h1&gt;\n    &lt;ul&gt;\n      &lt;<input type='text' id='fillBlank4' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank5' class='blank-input' style='width:70px;'>&lt;/li&gt;\n      &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:70px;'>&lt;/li&gt;\n      &lt;<input type='text' id='fillBlank8' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank9' class='blank-input' style='width:70px;'>&lt;/li&gt;\n    &lt;/<input type='text' id='fillBlank10' class='blank-input' style='width:40px;'>&gt;\n  &lt;/body&gt;\n  &lt;footer&gt;\n    &lt;<input type='text' id='fillBlank11' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank12' class='blank-input' style='width:130px;'>&lt;/p&gt;\n  &lt;/<input type='text' id='fillBlank13' class='blank-input' style='width:60px;'>&gt;\n&lt;/html&gt;</pre>",
            a: ["html", "h1", "My Tasks", "li", "Task 1", "li", "Task 2", "li", "Task 3", "ul", "p", "Status: Active", "footer"],
            h: "Structure: html, body, h1 heading, ul with three li items, footer with p containing 'Status: Active'."
        },
        {
            q: "Boss Q4. Create a webpage with header \"My Page\", add \"Home\" and \"About\" in the nav, a section with heading \"Items\" and list \"Item 1, Item 2, Item 3\", and lastly a footer with \"User: Guest\" as its contents:<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:50px;'>&gt;\n  &lt;body&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>&gt;\n      &lt;h1&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:80px;'>&lt;/h1&gt;\n      &lt;<input type='text' id='fillBlank4' class='blank-input' style='width:50px;'>&gt;<input type='text' id='fillBlank5' class='blank-input' style='width:70px;'> | <input type='text' id='fillBlank6' class='blank-input' style='width:60px;'>&lt;/nav&gt;\n    &lt;/header&gt;\n    &lt;main&gt;\n      &lt;<input type='text' id='fillBlank7' class='blank-input' style='width:70px;'>&gt;\n        &lt;<input type='text' id='fillBlank8' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank9' class='blank-input' style='width:60px;'>&lt;/h2&gt;\n        &lt;<input type='text' id='fillBlank10' class='blank-input' style='width:40px;'>&gt;\n          &lt;li&gt;<input type='text' id='fillBlank11' class='blank-input' style='width:60px;'>&lt;/li&gt;\n          &lt;<input type='text' id='fillBlank12' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank13' class='blank-input' style='width:60px;'>&lt;/li&gt;\n          &lt;<input type='text' id='fillBlank14' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank15' class='blank-input' style='width:60px;'>&lt;/li&gt;\n        &lt;/ul&gt;\n      &lt;/section&gt;\n    &lt;/<input type='text' id='fillBlank16' class='blank-input' style='width:50px;'>&gt;\n    &lt;<input type='text' id='fillBlank17' class='blank-input' style='width:60px;'>&gt;\n      &lt;<input type='text' id='fillBlank18' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank19' class='blank-input' style='width:110px;'>&lt;/p&gt;\n    &lt;/footer&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["html", "header", "My Page", "nav", "Home", "About", "section", "h2", "Items", "ul", "Item 1", "li", "Item 2", "li", "Item 3", "main", "footer", "p", "User: Guest"],
            h: "header>h1+nav(Home|About), main>section>h2+ul>li*3(Item1-3), footer>p(User: Guest)."
        },
        {
            q: "Boss Q5. Create a webpage connecting to \"styles.css\" with title and heading \"Styled Page\" and paragraph \"This is a styled paragraph\":<br><pre style='color:white; font-family:\"Pixelify Sans\", sans-serif; font-size: 16px;'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:50px;'>&gt;\n  &lt;head&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:50px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:100px;'>&lt;/title&gt;\n    &lt;link rel=\"stylesheet\" href=\"<input type='text' id='fillBlank4' class='blank-input' style='width:100px;'>\"&gt;\n  &lt;/<input type='text' id='fillBlank5' class='blank-input' style='width:50px;'>&gt;\n  &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:50px;'>&gt;\n    &lt;<input type='text' id='fillBlank7' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank8' class='blank-input' style='width:120px;'>&lt;/h1&gt;\n    &lt;<input type='text' id='fillBlank9' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank10' class='blank-input' style='width:200px;'>&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>",
            a: ["html", "title", "Styled Page", "styles.css", "head", "body", "h1", "Styled Page", "p", "This is a styled paragraph"],
            h: "html>head>title('Styled Page')+link(href='styles.css'), body>h1('Styled Page')+p('This is a styled paragraph')."
        }
    ]
};

let battleQIndex_L2 = 0;
let isTyping_L2 = false;

function openBattleModal_L2(isBoss) {
    battleQIndex_L2 = 0;
    const randomBG = isBoss ? 'img/bg-boss.png' : BG_NUM_L2[Math.floor(Math.random() * BG_NUM_L2.length)];
    const enemy = isBoss ? BOSSES_L2[Math.floor(Math.random() * BOSSES_L2.length)] : ENEMIES_L2[Math.floor(Math.random() * ENEMIES_L2.length)];
    const introDialogue = isBoss ? [BOSS_DIAL_L2[Math.floor(Math.random() * BOSS_DIAL_L2.length)], PLAYER_DIAL_L2[Math.floor(Math.random() * PLAYER_DIAL_L2.length)]] : [ENEMY_DIAL_L2[Math.floor(Math.random() * ENEMY_DIAL_L2.length)], PLAYER_DIAL_L2[Math.floor(Math.random() * PLAYER_DIAL_L2.length)]];

    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="battle-container border border-3 border-white bg-black position-relative overflow-hidden" style="font-family: 'Pixelify Sans', sans-serif; color: white; border-radius: 15px;">
            <style>
                .blank-input { background: #222; border: none; border-bottom: 2px solid #00ff00; color: #00ff00; font-family: 'Pixelify Sans', monospace; padding: 0 5px; margin: 2px; font-size: 16px; }
                .blank-input:focus { outline: none; background: #333; border-bottom: 2px solid #00ff00; }
                .boss-sprite {
                    animation: boss-float 3s ease-in-out infinite;
                    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
                }
                @keyframes boss-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
            </style>
            <div id="heartLossBox" class="position-absolute top-0 start-50 translate-middle-x mt-2 d-none" style="z-index: 6000;"><div class="bg-danger border border-white p-3 text-white pixel-font shadow-lg"><h3 class="mb-0 text-uppercase">-1 Heart: System Corruption!</h3></div></div>
            <div id="errorFeedbackBox" class="position-absolute top-50 start-50 translate-middle mt-2 d-none" style="z-index: 6000; width: 90%;"><div class="bg-warning border border-white p-3 text-dark pixel-font shadow-lg"><p id="errorFeedbackText" class="mb-0"></p></div></div>
            <div class="hint-trigger position-absolute p-3" onclick="event.stopPropagation(); triggerBattleHint();" style="z-index: 5000; cursor:pointer; top:0; left:0;"><img src="img/icon-hint.png" width="50" style="filter: drop-shadow(0 0 5px gold);"><span id="modalHintCount" class="text-white fs-4">${gameState.hints}</span></div>
            <div class="battle-screen d-flex justify-content-around align-items-end p-4" style="height:350px; background: url('${randomBG}') center/cover no-repeat; border-radius: 15px 15px 0 0;">
                <img src="img/${gameState.character}-model.png" class="game-model" style="height:130px; object-fit:contain;"><img src="img/${enemy}" class="game-model ${isBoss ? 'boss-sprite' : ''}" style="height:260px; object-fit:contain;">
            </div>
            <div id="dialogueBox" class="p-4 bg-dark text-white border-top border-3 border-white" style="min-height: 200px; cursor: pointer; border-radius: 0 0 15px 15px;">
                <p id="battleText" class="pixel-font fs-4 mb-0" style="line-height: 1.4; white-space: pre-wrap;"></p>
                <div id="quizArea" class="d-none mt-0">
                    <p class="pixel-font mb-2" style="color: #fff; font-size: 22px;">Question <span id="battleQuestionCounter"></span>:</p>
                    <div id="battleQuestionContent" style="font-family: 'Pixelify Sans', sans-serif; font-size: 18px;"></div>
                    <br>
                    <button class="btn btn-warning w-100 pixel-font fw-bold" onclick="checkBattleAnswer_L2(${isBoss})">SUBMIT DATA</button>
                </div>
            </div>
        </div>`;

    new bootstrap.Modal(document.getElementById('gameModal')).show();
    setTimeout(() => { 
        document.addEventListener('keydown', battleEnterHandler_L2);
        document.addEventListener('keydown', battleArrowKeyHandler_L2); 
    }, 100);
    startSequence_L2(introDialogue, () => {
        document.getElementById('quizArea').classList.remove('d-none');
        document.getElementById('battleText').style.display = 'none';
        loadQuestion_L2();
    });
}

function battleEnterHandler_L2(e) {
    if (e.key === 'Enter') {
        const quizArea = document.getElementById('quizArea');
        if (quizArea && !quizArea.classList.contains('d-none')) {
            e.preventDefault();
            checkBattleAnswer_L2(gameState.currentSite === 5);
        }
    }
}

function battleArrowKeyHandler_L2(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const quizArea = document.getElementById('quizArea');
        if (quizArea && !quizArea.classList.contains('d-none')) {
            e.preventDefault();
            const inputs = document.querySelectorAll('.blank-input');
            if (inputs.length === 0) return;
            const currentFocus = document.activeElement;
            let currentIndex = -1;
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i] === currentFocus) {
                    currentIndex = i;
                    break;
                }
            }
            if (currentIndex === -1) {
                inputs[0].focus();
                return;
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                const nextIndex = (currentIndex + 1) % inputs.length;
                inputs[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length;
                inputs[prevIndex].focus();
            }
        }
    }
}

function loadQuestion_L2() {
    const qData = QUESTIONS_L2[gameState.currentSite][battleQIndex_L2];
    const totalQuestions = (gameState.currentSite === 5) ? 5 : 3;
    
    const questionCounter = document.getElementById('battleQuestionCounter');
    if (questionCounter) {
        questionCounter.innerText = (battleQIndex_L2 + 1) + '/' + totalQuestions;
    }
    
    const questionContent = document.getElementById('battleQuestionContent');
    if (questionContent) {
        questionContent.innerHTML = qData.q;
    } else {
        document.getElementById('battleText').innerHTML = qData.q;
    }
    
    const inputs = document.querySelectorAll('.blank-input');
    if (inputs.length > 0) inputs[0].focus();
}

function checkBattleAnswer_L2(isBoss) {
    const qData = QUESTIONS_L2[gameState.currentSite][battleQIndex_L2];
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
                    errorMessages.push(`Field ${index + 1}: "${userAnswer}" is not the right HTML tag. Remember HTML tags use angle brackets like &lt; and &gt;.`);
                } else if (correctAnswer.includes(' ')) {
                    errorMessages.push(`Field ${index + 1}: "${userAnswer}" doesn't match the required text. Check your spelling and capitalization.`);
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
                errorMessages.push(`"${userAnswer}" is not the correct HTML tag. Remember to use proper HTML syntax with angle brackets.`);
            } else if (correctAnswer.includes(' ')) {
                errorMessages.push(`"${userAnswer}" doesn't match the expected text. Review the instructions and try again.`);
            } else {
                errorMessages.push(`"${userAnswer}" is not quite right. Think about what element belongs here.`);
            }
        }
    }

    if (isCorrect) {
        const errorBox = document.getElementById('errorFeedbackBox');
        if (errorBox) errorBox.classList.add('d-none');

        const totalQuestions = isBoss ? 5 : 3;
        const isLastQuestion = battleQIndex_L2 === totalQuestions - 1;
        const shouldShowPreview = isBoss || isLastQuestion;

        if (shouldShowPreview && typeof openBattlePreviewModal === 'function') {
            const currentAnswers = Array.from(inputs).map(input => input.value.trim());
            openBattlePreviewModal(qData, currentAnswers);
        }
        
        battleQIndex_L2++;
        if (battleQIndex_L2 >= (isBoss ? 5 : 3)) {
            showBattleResult_L2(true, isBoss);
        } else {
            loadQuestion_L2();
        }
    } else {
        gameState.hearts--;
        updateUI();
        
        const lossBox = document.getElementById('heartLossBox');
        if (lossBox) { 
            lossBox.classList.remove('d-none'); 
            setTimeout(() => lossBox.classList.add('d-none'), 1500); 
        }
        
        const errorBox = document.getElementById('errorFeedbackBox');
        const errorText = document.getElementById('errorFeedbackText');
        if (errorBox && errorText) {
            errorText.innerHTML = errorMessages.join('<br>');
            errorBox.classList.remove('d-none');
            setTimeout(() => errorBox.classList.add('d-none'), 5000);
        }
        
        if (Array.isArray(qData.a)) {
            inputs.forEach((input, index) => {
                const userAnswer = input.value.trim();
                if (userAnswer === '' || userAnswer.toLowerCase() !== qData.a[index].toLowerCase()) {
                    input.style.borderBottom = '2px solid #ff0000';
                    input.style.backgroundColor = '#330000';
                    setTimeout(() => {
                        input.style.borderBottom = '2px solid #00ff00';
                        input.style.backgroundColor = '#222';
                    }, 2500);
                }
            });
        } else {
            const userAnswer = inputs[0].value.trim();
            if (userAnswer === '' || userAnswer.toLowerCase() !== qData.a.toLowerCase()) {
                inputs[0].style.borderBottom = '2px solid #ff0000';
                inputs[0].style.backgroundColor = '#330000';
                setTimeout(() => {
                    inputs[0].style.borderBottom = '2px solid #00ff00';
                    inputs[0].style.backgroundColor = '#222';
                }, 2500);
            }
        }
        
        if (gameState.hearts <= 0) {
            if (errorBox) errorBox.classList.add('d-none');
            if (lossBox) lossBox.classList.add('d-none');
            showBattleResult_L2(false, isBoss);
        }
    }
}

function startSequence_L2(lines, callback) {
    let i = 0;
    const box = document.getElementById('dialogueBox');
    const next = () => {
        if (isTyping_L2) return;
        if (i < lines.length) { isTyping_L2 = true; runTypewriter(lines[i++], 'battleText', () => { isTyping_L2 = false; }); }
        else { box.onclick = null; callback(); }
    };
    box.onclick = next;
    next();
}

function showBattleResult_L2(won, isBoss) {
    document.removeEventListener('keydown', battleEnterHandler_L2);
    document.removeEventListener('keydown', battleArrowKeyHandler_L2);
    const quizArea = document.getElementById('quizArea');
    if (quizArea) quizArea.classList.add('d-none');
    
    const battleText = document.getElementById('battleText');
    if (battleText) battleText.style.display = 'block';
    
    // Add rewards BEFORE showing result
    if (won && isBoss) {
        gameState.hearts = Math.min(gameState.hearts + 1, 3);
        gameState.hints += 1;
        
        const heartCountEl = document.getElementById('heartCount');
        const hintCountEl = document.getElementById('hintCount');
        if (heartCountEl) heartCountEl.innerText = gameState.hearts;
        if (hintCountEl) hintCountEl.innerText = gameState.hints;

         localStorage.setItem('boss2Defeated', 'true');
    localStorage.setItem('level2Completed', 'true');
        
        console.log('BOSS REWARD GIVEN - Hearts:', gameState.hearts, 'Hints:', gameState.hints);
    }
    
    runTypewriter(won ? "VICTORY! System integrity restored." : "DEFEAT... Connection lost.", 'battleText', () => {
        setTimeout(() => { if (won) renderVictoryModal_L2(isBoss); else renderDefeatModal_L2(); }, 1200);
    });
}

function renderVictoryModal_L2(isBoss) {
    const VICTORY_DIAL = ["The lights dim. Their guardian falls. The castle is quiet now.", "Cold stone, warm victory. I'll take it.", "Bones are everywhere, I shall avenge them."];
    
    if (isBoss) {
        // Give rewards for Level 2 boss
        if (gameState.hearts < 3) gameState.hearts += 1;
        gameState.hints += 1;
        
        // Force update the UI counters
        const heartCountEl = document.getElementById('heartCount');
        const hintCountEl = document.getElementById('hintCount');
        if (heartCountEl) heartCountEl.innerText = gameState.hearts;
        if (hintCountEl) hintCountEl.innerText = gameState.hints;
        
        document.getElementById('modalContentWrapper').innerHTML = `
            <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif; display: flex; flex-direction: column; align-items: center; border-radius: 20px; overflow: hidden;">
                <h1 class="text-white mb-3">BOSS DEFEATED!</h1>
                <p class="text-white fs-4 mb-4">"${VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)]}"</p>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <div class="bg-dark px-4 py-3 rounded mb-4" style="border: 3px solid #FFD700; min-width: 250px;">
                        <h3 class="text-warning mb-3">REWARDS EARNED</h3>
                        <div class="d-flex justify-content-center gap-5">
                            <div class="text-center">
                                <span class="text-white fs-5">+1 Heart</span><br>
                                <small class="text-white">Total: ${gameState.hearts}</small>
                            </div>
                            <div class="text-center">
                                <span class="text-white fs-5">+1 Hint</span><br>
                                <small class="text-white">Total: ${gameState.hints}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-light pixel-font fs-4 px-4" onclick="advanceToNextLevel()">CONTINUE TO LEVEL 3</button>
            </div>
        `;
    } else {
        document.getElementById('modalContentWrapper').innerHTML = `
            <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif; display: flex; flex-direction: column; align-items: center; border-radius: 20px; overflow: hidden;">
                <h1 class="text-white mb-3">SUCCESS</h1>
                <p class="text-white fs-4 mb-4">"${VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)]}"</p>
                <button class="btn btn-light pixel-font fs-4 px-4" onclick="proceed()">CONTINUE</button>
            </div>
        `;
    }
}
function renderDefeatModal_L2() {
    const DEFEAT_DIAL = ["The walls, they're talking... they got inside my head. I can't think...", "Cold. So cold. The castle swallowed me whole.", "I should have brought a torch. And maybe a better plan.", "They laid eggs on me!!! EEEKKKKK!!!", "Even my screams froze in here. Nobody will hear me fall."];
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-danger p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif; border-radius: 20px;">
            <h1 class="text-white mb-2">YOU DIED</h1><p class="text-white fs-5 mb-4">"${DEFEAT_DIAL[Math.floor(Math.random() * DEFEAT_DIAL.length)]}"</p>
            <div class="d-flex flex-column gap-2"><button class="btn btn-warning pixel-font fw-bold fs-4" onclick="restartGame()">RETRY LEVEL</button><button class="btn btn-dark border-white pixel-font" onclick="location.href='index.html'">MAIN MENU</button></div>
        </div>`;
}

console.log('battle-logic-l2.js loaded - renderVictoryModal_L2 defined');

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