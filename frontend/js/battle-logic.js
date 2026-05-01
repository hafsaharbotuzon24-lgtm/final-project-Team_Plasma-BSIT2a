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
    const randomBG = isBoss ? 'img/bg-boss.png' : BG_NUM[Math.floor(Math.random() * BG_NUM.length)];
    const enemy = isBoss ? BOSSES[Math.floor(Math.random() * BOSSES.length)] : ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
    const introDialogue = isBoss ? [BOSS_DIAL[Math.floor(Math.random() * BOSS_DIAL.length)], PLAYER_DIAL[Math.floor(Math.random() * PLAYER_DIAL.length)]] : [ENEMY_DIAL[Math.floor(Math.random() * ENEMY_DIAL.length)], PLAYER_DIAL[Math.floor(Math.random() * PLAYER_DIAL.length)]];

    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="battle-container border border-4 border-white bg-black position-relative overflow-hidden" style="font-family: 'Pixelify Sans', sans-serif; color: white;">
            <style>
                .blank-input { 
                    background: #222; 
                    border: none; 
                    border-bottom: 2px solid #fff; 
                    color: #00ff00; 
                    font-family: 'Pixelify Sans', monospace; 
                    padding: 0 5px; 
                    margin: 2px; 
                }
                .blank-input:focus { 
                    outline: none; 
                    background: #333; 
                    border-bottom: 2px solid #00ff00; 
                }
                .input-with-indicator {
                    display: inline-block;
                    position: relative;
                    margin: 0 2px;
                }
                .input-indicator {
                    width: 100%;
                    height: 4px;
                    background: #00ff00;
                    border-radius: 0 0 2px 2px;
                    box-shadow: 0 0 10px rgba(0, 255, 0, 0.7), 0 0 20px rgba(0, 255, 0, 0.3);
                    animation: pulse-indicator 1.5s ease-in-out infinite;
                }
                @keyframes pulse-indicator {
                    0%, 100% { opacity: 0.7; box-shadow: 0 0 10px rgba(0, 255, 0, 0.7), 0 0 20px rgba(0, 255, 0, 0.3); }
                    50% { opacity: 1; box-shadow: 0 0 15px rgba(0, 255, 0, 1), 0 0 30px rgba(0, 255, 0, 0.5); }
                }
                .question-section {
                    background: rgba(0, 0, 0, 0.3);
                    border-left: 3px solid #00ff00;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-radius: 4px;
                }
                .fill-section {
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px dashed rgba(255, 255, 255, 0.2);
                    padding: 10px;
                    border-radius: 4px;
                }
            </style>
            <div id="heartLossBox" class="position-absolute top-0 start-50 translate-middle-x mt-2 d-none" style="z-index: 6000;"><div class="bg-danger border border-white p-3 text-white pixel-font shadow-lg"><h3 class="mb-0 text-uppercase">-1 Heart: System Corruption!</h3></div></div>
            <div id="errorFeedbackBox" class="position-absolute top-50 start-50 translate-middle mt-2 d-none" style="z-index: 6000; width: 90%;"><div class="bg-warning border border-white p-3 text-dark pixel-font shadow-lg"><p id="errorFeedbackText" class="mb-0"></p></div></div>
            <div class="hint-trigger position-absolute p-3" onclick="event.stopPropagation(); triggerBattleHint();" style="z-index: 5000; cursor:pointer; top:0; left:0;"><img src="img/icon-hint.png" width="50" style="filter: drop-shadow(0 0 5px gold);"><span id="modalHintCount" class="text-white fs-4">${gameState.hints}</span></div>
            <div class="battle-screen d-flex justify-content-around align-items-end p-4" style="height:350px; background: url('${randomBG}') center/cover no-repeat;">
                <img src="img/${gameState.character}-model.png" class="game-model" style="height:130px; object-fit:contain;"><img src="img/${enemy}" class="game-model" style="height:260px; object-fit:contain;">
            </div>
            <div id="dialogueBox" class="p-4 bg-dark text-white border-top border-4 border-white" style="min-height: 200px; cursor: pointer;">
                <div class="question-section mb-3">
                    <p class="text-uppercase text-success mb-2 fs-6" style="letter-spacing: 2px;">► Question</p>
                    <p id="battleText" class="pixel-font fs-4 mb-0" style="line-height: 1.4; white-space: pre-wrap;"></p>
                </div>
                <div id="quizArea" class="d-none">
                    <div class="fill-section mb-3">
                        <p class="text-uppercase text-info mb-2 fs-6" style="letter-spacing: 2px;">► Your Answer</p>
                        <div id="fillInBlankContainer" style="line-height: 2.5;"></div>
                    </div>
                    <button class="btn btn-warning w-100 pixel-font fw-bold" onclick="checkBattleAnswer(${isBoss})">SUBMIT DATA</button>
                </div>
            </div>
        </div>`;

    new bootstrap.Modal(document.getElementById('gameModal')).show();
    
    setTimeout(() => { 
        document.addEventListener('keydown', battleEnterHandler); 
    }, 100);
    
    startSequence(introDialogue, () => {
        document.getElementById('quizArea').classList.remove('d-none');
        loadQuestion();
    });
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

const PLAYER_DIAL = ["YOU: This place was once pure. You are the blight.", "YOU: Dusty wings... Glowing eyes... You're ugly. Let's go!", "YOU: You're blocking the path, step aside monster!", "YOU: I sense the corruption in your shell. Who cursed you?", "YOU: Eat my code, foul pest!"];
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
            q: "Boss Q2. Create an HTML webpage with a title 'The Button, a heading that says 'Press the button', and a button labeled 'Press Here!':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n    &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:100px;'>&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&gt;\n    &lt;<input type='text' id='fillBlank5' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank6' class='blank-input' style='width:150px;'>&lt;/h1&gt;\n    &lt;<input type='text' id='fillBlank7' class='blank-input' style='width:80px;'>&gt;<input type='text' id='fillBlank8' class='blank-input' style='width:100px;'>&lt;/button&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", 
            a: ["head", "title", "The Button", "body", "h1", "Press the button", "button", "Press Here!"], 
            h: "Follow the prompt: Title 'The Button', Heading 'Press the button', Button 'Press Here!'."
        },
        {
            q: "Boss Q3. Create an HTML webpage with the title 'Double Content'. Inside the body, add a first heading that says 'First Heading' followed by a paragraph 'First paragraph' Then add a second heading that says 'Second Heading' followed by another paragraph 'Second paragraph':<br><pre style='color:white; font-family:\"Pixelify Sans\"'>&lt;!DOCTYPE html&gt;\n&lt;<input type='text' id='fillBlank' class='blank-input' style='width:60px;'>&gt;\n  &lt;<input type='text' id='fillBlank2' class='blank-input' style='width:60px;'>&gt;\n    &lt;title&gt;<input type='text' id='fillBlank3' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank4' class='blank-input' style='width:60px;'>&gt;\n  &lt;/<input type='text' id='fillBlank5' class='blank-input' style='width:60px;'>&gt;\n  &lt;<input type='text' id='fillBlank6' class='blank-input' style='width:60px;'>&gt;\n    &lt;h1&gt;<input type='text' id='fillBlank7' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank8' class='blank-input' style='width:40px;'>&gt;\n    &lt;<input type='text' id='fillBlank9' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank10' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank11' class='blank-input' style='width:30px;'>&gt;\n    &lt;<input type='text' id='fillBlank12' class='blank-input' style='width:40px;'>&gt;<input type='text' id='fillBlank13' class='blank-input' style='width:150px;'>&lt;/<input type='text' id='fillBlank14' class='blank-input' style='width:40px;'>&gt;\n    &lt;<input type='text' id='fillBlank15' class='blank-input' style='width:30px;'>&gt;<input type='text' id='fillBlank16' class='blank-input' style='width:150px;'>&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>", 
            a: ["html", "head", "Double Content", "title", "head", "body", "First Heading", "h1", "p", "First paragraph", "p", "h1", "Second Heading", "h1", "p", "Second paragraph"], 
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
    
    // Move the fill-in-the-blank inputs to the dedicated container
    const fillContainer = document.getElementById('fillInBlankContainer');
    const battleTextEl = document.getElementById('battleText');
    
    if (fillContainer && battleTextEl) {
        // Clear the container first
        fillContainer.innerHTML = '';
        
        // Find all inputs in the battle text and move them
        const inputs = battleTextEl.querySelectorAll('.blank-input');
        inputs.forEach((input, index) => {
            const wrapper = document.createElement('span');
            wrapper.className = 'input-with-indicator';
            wrapper.style.display = 'inline-block';
            wrapper.style.margin = '0 4px';
            
            // Clone the input
            const clonedInput = input.cloneNode(true);
            clonedInput.style.display = 'block';
            clonedInput.style.margin = '0';
            
            // Create the green indicator bar
            const indicator = document.createElement('div');
            indicator.className = 'input-indicator';
            
            wrapper.appendChild(clonedInput);
            wrapper.appendChild(indicator);
            fillContainer.appendChild(wrapper);
            
            // Add spacing between inputs
            if (index < inputs.length - 1) {
                fillContainer.appendChild(document.createTextNode(' '));
            }
        });
    }
    
    const inputs = document.querySelectorAll('.blank-input');
    if (inputs.length > 0) inputs[0].focus();
}

function checkBattleAnswer(isBoss) {
    const qData = QUESTIONS[gameState.currentSite][battleQIndex];
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
                    errorMessages.push(`Field ${index + 1}: "${userAnswer}" is not the right HTML tag. Remember HTML tags use angle brackets < >.`);
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
                        input.style.borderBottom = '2px solid #fff';
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
                    inputs[0].style.borderBottom = '2px solid #fff';
                    inputs[0].style.backgroundColor = '#222';
                }, 2500);
            }
        }
        
        if (gameState.hearts <= 0) {
            if (errorBox) errorBox.classList.add('d-none');
            if (lossBox) lossBox.classList.add('d-none');
            showBattleResult(false, isBoss);
        }
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
    document.removeEventListener('keydown', battleEnterHandler);
    
    const quizArea = document.getElementById('quizArea');
    if (quizArea) quizArea.classList.add('d-none');
    
    console.log('BEFORE REWARD - Hearts:', gameState.hearts, 'Hints:', gameState.hints, 'isBoss:', isBoss, 'won:', won);
    
    if (won && isBoss) {
        gameState.hearts = Math.min(gameState.hearts + 1, 3);
        gameState.hints += 1;
        
        const heartCountEl = document.getElementById('heartCount');
        const hintCountEl = document.getElementById('hintCount');
        if (heartCountEl) heartCountEl.innerText = gameState.hearts;
        if (hintCountEl) hintCountEl.innerText = gameState.hints;
        
        console.log('AFTER REWARD - Hearts:', gameState.hearts, 'Hints:', gameState.hints);
    }
    
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
    
    let rewardsHTML = '';
    if (isBoss) {
        rewardsHTML = `
            <div class="bg-dark d-inline-block px-4 py-3 rounded mb-4" style="border: 2px solid #FFD700;">
                <p class="text-warning fs-5 mb-2">BOSS REWARDS:</p>
                <p class="text-white mb-1">+1 Heart (Total: ${gameState.hearts})</p>
                <p class="text-white mb-0">+1 Hint (Total: ${gameState.hints})</p>
            </div>`;
    }
    
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-success p-5 text-center border border-4 border-white shadow-lg" style="font-family: 'Pixelify Sans', sans-serif;">
            <img src="img/icon-victory.png" height="100" class="mb-3" onerror="this.style.display='none'">
            <h1 class="text-white mb-3">${isBoss ? 'BOSS DEFEATED!' : 'SUCCESS'}</h1>
            <p class="text-white fs-4 mb-4">"${VICTORY_DIAL[Math.floor(Math.random() * VICTORY_DIAL.length)]}"</p>
            ${rewardsHTML}
            <button class="btn btn-light pixel-font fs-4 px-4" onclick="proceed()">${isBoss ? 'CONTINUE TO LEVEL 2' : 'CONTINUE'}</button>
        </div>`;
}
function renderDefeatModal() {
    const DEFEAT_DIAL = ["The forest dims... everything fades...", "I was not strong enough to cleanse this place.", "My code... corrupted... system shutting down...", "The insects... were too many... too fast...", "I feel the shell cracking... the light fading..."];
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
console.log('battle-logic.js loaded - renderVictoryModal defined');

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