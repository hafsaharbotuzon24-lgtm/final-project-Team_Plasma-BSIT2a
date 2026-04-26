/**
 * Updated typewriter to support HTML tags and a callback for images
 */
function runTypewriter(text, elementId, callback) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    // Clear any existing typewriter timeout
    if (container._typewriterTimeout) {
        clearTimeout(container._typewriterTimeout);
        container._typewriterTimeout = null;
    }
    
    let index = 0;
    container.innerHTML = ""; 

    function type() {
        if (index < text.length) {
            if (text[index] === '<') {
                let tagEnd = text.indexOf('>', index);
                if (tagEnd !== -1) {
                    index = tagEnd + 1;
                }
            } else {
                index++;
            }

            container.innerHTML = text.substring(0, index);
            container._typewriterTimeout = setTimeout(type, 30); 
        } else {
            container._typewriterTimeout = null;
            if (callback) callback();
        }
    }
    type();
}

function openInstructionsModal() {
    const levelTitles = {
        1: "LVL1 HTML Basics",
        2: "LVL2 HTML Structure & Semantics",
        3: "LVL3 HTML Forms & Interactive Elements"
    };

    const slideContents = {
        1: [
            "LVL1 HTML<br>HTML (HyperText Markup Language) is the \"bricks and walls\" of a house. It is a markup language used to label and structure content for web browsers.",
            "HTML Tags: These are words wrapped in angle brackets that tell the browser what to do. Most come in pairs: <span class='tag-highlight'>&lt;p&gt;</span> and <span class='tag-highlight'>&lt;/p&gt;</span> for paragraphs, <span class='tag-highlight'>&lt;h1&gt;</span> and <span class='tag-highlight'>&lt;/h1&gt;</span> for headings.",
            "Every page uses a standard structure: <span class='tag-highlight'>&lt;html&gt;</span> (wrapper), <span class='tag-highlight'>&lt;head&gt;</span> (secret info), and <span class='tag-highlight'>&lt;body&gt;</span> (visible content).",
            "You create a webpage by saving your code as a .html file and opening it with a browser like Chrome or Safari.",
            "Goodluck Coder! Adventure Awaits!"
        ],
        2: [
            // Slide 0
            "LVL2 — Building Your Digital Home<br><br>Building on the \"house\" analogy, more complex tags act as <span class='tag-highlight'>specialized rooms</span> in your HTML skeleton.<br><br><span class='tag-highlight'>&lt;header&gt;</span> — The front porch with your logo<br><span class='tag-highlight'>&lt;main&gt;</span> — The living room with main content<br><span class='tag-highlight'>&lt;footer&gt;</span> — The basement for fine print<br><span class='tag-highlight'>&lt;section&gt;</span> — Individual rooms grouping related ideas",
            
            // Slide 1
            "Making It Functional<br><br>Interactive elements let users engage with your page:<br><br><span class='tag-highlight'>&lt;label&gt;</span> and <span class='tag-highlight'>&lt;input&gt;</span> — A mailbox for visitor information<br><span class='tag-highlight'>&lt;nav&gt;</span> — A signpost helping users navigate<br><span class='tag-highlight'>&lt;ul&gt;</span> and <span class='tag-highlight'>&lt;li&gt;</span> — A bulletin board for lists<br><span class='tag-highlight'>&lt;hr&gt;</span> — A divider wall between sections<br><span class='tag-highlight'>&lt;small&gt;</span> — Fine print at the bottom",
            
            // Slide 2
            "Office Analogy: Structure<br><br><span class='tag-highlight'>Corporate Layout:</span><br><span class='tag-highlight'>&lt;header&gt;</span> — Company name and logo<br><span class='tag-highlight'>&lt;main&gt;</span> — Primary work area<br><span class='tag-highlight'>&lt;footer&gt;</span> — Copyright and contact<br><span class='tag-highlight'>&lt;section&gt;</span> — Distinct departments<br><br><span class='tag-highlight'>Navigation:</span><br><span class='tag-highlight'>&lt;nav&gt;</span> — Office directory<br><span class='tag-highlight'>&lt;hr&gt;</span> — Visual separator",
            
            // Slide 3
            "Office Analogy: Tools<br><br><span class='tag-highlight'>Data Organization:</span><br><span class='tag-highlight'>&lt;ul&gt;</span> + <span class='tag-highlight'>&lt;li&gt;</span> — Bulleted task lists<br><span class='tag-highlight'>&lt;table&gt;</span> — Data grid for comparison<br><br><span class='tag-highlight'>User Interaction:</span><br><span class='tag-highlight'>&lt;label&gt;</span> + <span class='tag-highlight'>&lt;input&gt;</span> — Data entry forms<br><span class='tag-highlight'>&lt;details&gt;</span> + <span class='tag-highlight'>&lt;summary&gt;</span> — Expandable panels<br><span class='tag-highlight'>&lt;select&gt;</span> + <span class='tag-highlight'>&lt;option&gt;</span> — Dropdown menus",
            
            // Slide 4
            "Example Code<br><br><pre style='color:white; font-family:\"Pixelify Sans\", monospace; text-align:left; font-size:0.6em; line-height:1.3; background:#0a0a1a; padding:10px; border:1px solid #FFD700; border-radius:4px; overflow-x:auto;'>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>&lt;body&gt;<br><br>  &lt;header&gt;<br>    &lt;h1&gt;Dashboard&lt;/h1&gt;<br>    &lt;nav&gt;Home | Settings&lt;/nav&gt;<br>  &lt;/header&gt;<br><br>  &lt;hr&gt;<br><br>  &lt;main&gt;<br>    &lt;section&gt;<br>      &lt;h2&gt;Task List&lt;/h2&gt;<br>      &lt;ul&gt;<br>        &lt;li&gt;HTML (Done)&lt;/li&gt;<br>        &lt;li&gt;Forms (WIP)&lt;/li&gt;<br>      &lt;/ul&gt;<br>    &lt;/section&gt;<br>    &lt;section&gt;<br>      &lt;label&gt;New Task:&lt;/label&gt;<br>      &lt;input type=\"text\"&gt;<br>      &lt;button&gt;Add&lt;/button&gt;<br>    &lt;/section&gt;<br>  &lt;/main&gt;<br><br>  &lt;footer&gt;<br>    &lt;small&gt;Admin | Offline&lt;/small&gt;<br>  &lt;/footer&gt;<br><br>&lt;/body&gt;<br>&lt;/html&gt;</pre>",
            
            // Slide 5
            "LVL2 — See It In Action<br><br>Here's what the code looks like rendered in a browser:",
            
            // Slide 6
            "Go get 'em, Tiger!<br><br>You've learned HTML structure. Now go build something great!"
        ],
        3: [
            // Slide 0 - House Analogy with storage and toggles
            "LVL3 — Storage & Toggles<br><br>Building on our house analogy, this version adds <span class='tag-highlight'>storage solutions</span> and <span class='tag-highlight'>toggle switches</span> to your structure.<br><br>The <span class='tag-highlight'>&lt;details&gt;</span> and <span class='tag-highlight'>&lt;summary&gt;</span> tags act like a <span class='tag-highlight'>collapsible closet</span> or a folding screen; they keep information tucked away and out of sight until a guest clicks to open it, which helps prevent the room from looking cluttered.",
            
            // Slide 1 - Decision making
            "Decision Making Tools<br><br>For decision-making, we use the <span class='tag-highlight'>&lt;select&gt;</span> tag, which works like a <span class='tag-highlight'>rotary dial</span>, offering a list of preset choices in a compact space.",
            
            // Slide 2 - Checkboxes and footer
            "Yes/No & Clean Endings<br><br>To manage simple \"yes or no\" choices, the <span class='tag-highlight'>&lt;input type=\"checkbox\"&gt;</span> acts like a <span class='tag-highlight'>light switch</span> or a toggle, allowing guests to flip multiple options on or off independently.<br><br>Finally, the <span class='tag-highlight'>&lt;footer&gt;</span> has been stripped down to a simple plaque on the wall, using a standard <span class='tag-highlight'>&lt;p&gt;</span> tag to display a plain, readable copyright notice at the very bottom of the house.<br><br>These new parts focus on giving the visitor <span class='tag-highlight'>clear, clickable choices</span> while keeping the overall layout clean and professional.",
            
            // Slide 3 - Business Office Analogy
            "Office Analogy: Interactive Tools<br><br><span class='tag-highlight'>Document Management:</span><br><span class='tag-highlight'>&lt;details&gt;</span> and <span class='tag-highlight'>&lt;summary&gt;</span> — An interactive tool used to hide non-essential data. The <span class='tag-highlight'>&lt;summary&gt;</span> acts as the folder's label, while the <span class='tag-highlight'>&lt;details&gt;</span> tag hides the content until a user chooses to expand it.<br><span class='tag-highlight'>&lt;footer&gt;</span> — The terminal section of a document providing clean, professional space for copyright notices or site ownership.<br><span class='tag-highlight'>&lt;p&gt;</span> — Used within the footer or body to display standard, readable text for simple declarations.<br><br><span class='tag-highlight'>User Selection Tools:</span><br><span class='tag-highlight'>&lt;select&gt;</span> and <span class='tag-highlight'>&lt;option&gt;</span> (The Rotary Dial) — A compact selection tool that allows users to pick one specific item from a pre-defined list, keeping the \"desk\" tidy.<br><span class='tag-highlight'>&lt;input type=\"checkbox\"&gt;</span> (The Toggle Switch) — A binary control for \"yes or no\" choices, allowing multiple independent selections.<br><span class='tag-highlight'>&lt;button type=\"submit\"&gt;</span> (The Dispatch Key) — The final interactive element that signals the browser to process and send gathered information.",
            
            // Slide 4 - Example Code
            "Example Code<br><br><pre style='color:white; font-family:\"Pixelify Sans\", monospace; text-align:left; font-size:0.55em; line-height:1.3; background:#0a0a1a; padding:10px; border:1px solid #FFD700; border-radius:4px; overflow-x:auto;'>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>&lt;body&gt;<br><br>  &lt;header&gt;<br>    &lt;h1&gt;Feedback Portal&lt;/h1&gt;<br>  &lt;/header&gt;<br><br>  &lt;main&gt;<br>    &lt;section&gt;<br>      &lt;details&gt;<br>        &lt;summary&gt;Helpful Tips&lt;/summary&gt;<br>        &lt;p&gt;Please select carefully&lt;/p&gt;<br>      &lt;/details&gt;<br>    &lt;/section&gt;<br><br>    &lt;form&gt;<br>      &lt;section&gt;<br>        &lt;h3&gt;User Survey&lt;/h3&gt;<br>        &lt;label&gt;Experience:&lt;/label&gt;<br>        &lt;select&gt;<br>          &lt;option&gt;Beginner&lt;/option&gt;<br>          &lt;option&gt;Expert&lt;/option&gt;<br>        &lt;/select&gt;<br>      &lt;/section&gt;<br><br>      &lt;section&gt;<br>        &lt;h3&gt;Permissions&lt;/h3&gt;<br>        &lt;input type=\"checkbox\"&gt;<br>        &lt;label&gt;Subscribe&lt;/label&gt;<br>        &lt;br&gt;<br>        &lt;input type=\"checkbox\"&gt;<br>        &lt;label&gt;Agree to terms&lt;/label&gt;<br>      &lt;/section&gt;<br><br>      &lt;button type=\"submit\"&gt;Submit&lt;/button&gt;<br>    &lt;/form&gt;<br>  &lt;/main&gt;<br><br>  &lt;footer&gt;<br>    &lt;p&gt;Copyright 2026&lt;/p&gt;<br>  &lt;/footer&gt;<br><br>&lt;/body&gt;<br>&lt;/html&gt;</pre>",
            
            // Slide 5 - Image
            "See It In Action<br><br>Here's what the code looks like rendered in a browser:",
            
            // Slide 6 - Motivation
            "You're a coding warrior!<br><br>Forms, toggles, and interactive elements — you've mastered them all. Go build something amazing!"
        ]
    };

    const slideContent = slideContents[gameState.currentLevel] || slideContents[1];
    const totalSlides = slideContent.length;
    
    // Level 1: 5 slides (original format)
    // Level 2: 7 slides (image on slide 5)
    // Level 3: 7 slides (image on slide 5)
    const isMultiSlide = gameState.currentLevel === 2 || gameState.currentLevel === 3;
    const isLevel1 = gameState.currentLevel === 1;

    let carouselItemsHTML = '';
    if (isMultiSlide) {
        // Level 2 & 3: 7 slides (0-6), image on slide 5
        for (let i = 0; i < totalSlides; i++) {
            const isActive = i === 0 ? ' active' : '';
            carouselItemsHTML += `
                <div class="carousel-item${isActive}">
                    <p id="instr-${i}" style="font-size: 0.85em; line-height: 1.6;"></p>
                    ${i === 5 ? '<div id="instr-img-container"></div>' : ''}
                </div>`;
        }
    } else {
        // Level 1: Original format with specific slide 3 for image
        carouselItemsHTML = `
            <div class="carousel-item active">
                <p id="instr-0"></p>
            </div>
            <div class="carousel-item">
                <p id="instr-1"></p>
            </div>
            <div class="carousel-item">
                <p id="instr-2"></p>
            </div>
            <div class="carousel-item">
                <div id="instr-3"></div>
                <div id="instr-3-img-container"></div>
            </div>
            <div class="carousel-item">
                <p id="instr-4"></p>
            </div>`;
    }

    document.getElementById('modalContentWrapper').innerHTML = `
        <div style="background-color: #15324e; padding: 30px; color: white; border: 4px solid #333; text-align: center; max-height: 90vh; overflow-y: auto;">
            <h2 class="pixel-font mb-4 text-warning">${levelTitles[gameState.currentLevel]}</h2>
            <div id="instrCarousel" class="carousel slide" data-bs-ride="false" data-bs-interval="false">
                <div class="carousel-inner pixel-font fs-3">
                    ${carouselItemsHTML}
                </div>
                <div class="mt-4">
                    <button class="btn btn-dark" data-bs-target="#instrCarousel" data-bs-slide="prev">PREV</button>
                    ${isMultiSlide ? `<span class="text-white mx-3" id="slideCounter">1 / ${totalSlides}</span>` : ''}
                    <button class="btn btn-dark" data-bs-target="#instrCarousel" data-bs-slide="next">NEXT</button>
                </div>
            </div>
            <button class="btn btn-success mt-5 pixel-font w-100" id="start-btn-text" style="background-color: #020722; border: #ffffff" data-bs-dismiss="modal"></button>
        </div>
        <style>
            .carousel-item { transition: none !important; }
            .tag-highlight {
                background-color: #FFD700;
                color: #000000;
                padding: 2px 6px;
                border-radius: 3px;
                font-weight: bold;
                display: inline-block;
            }
            #instr-img-container img { margin-top: 15px; max-width: 90%; border: 2px solid #FFD700; border-radius: 5px; }
            #instr-3-img-container img { margin-top: 15px; max-width: 90%; }
            .carousel-item pre {
                background: #0a0a1a;
                padding: 10px;
                border: 1px solid #FFD700;
                border-radius: 5px;
                overflow-x: auto;
                max-height: 350px;
                overflow-y: auto;
            }
        </style>`;

    const modalEl = document.getElementById('gameModal');
    const carouselEl = document.getElementById('instrCarousel');

    // Initial typewriter load
    runTypewriter(slideContent[0], isMultiSlide ? 'instr-0' : 'instr-0');
    runTypewriter("START GAME", "start-btn-text");

    // Carousel slide event - clean up previous typewriter before starting new one
    if (carouselEl) {
        carouselEl.addEventListener('slid.bs.carousel', (event) => {
            const index = event.to;
            
            // Update slide counter
            const counter = document.getElementById('slideCounter');
            if (counter) {
                counter.textContent = `${index + 1} / ${totalSlides}`;
            }
            
            // Clear image containers
            const imgContainerL2 = document.getElementById('instr-img-container');
            const imgContainerL1 = document.getElementById('instr-3-img-container');
            if (imgContainerL2) imgContainerL2.innerHTML = "";
            if (imgContainerL1) imgContainerL1.innerHTML = "";
            
            // Stop any running typewriters by clearing all instruction elements
            const maxSlides = isMultiSlide ? totalSlides : 5;
            for (let i = 0; i < maxSlides; i++) {
                const el = document.getElementById(`instr-${i}`);
                if (el && i !== index) {
                    if (el._typewriterTimeout) {
                        clearTimeout(el._typewriterTimeout);
                        el._typewriterTimeout = null;
                    }
                    el.innerHTML = "";
                }
            }
            
            // Start typewriter on current slide
            const targetId = isMultiSlide ? `instr-${index}` : (index === 3 ? "instr-3" : `instr-${index}`);
            runTypewriter(slideContent[index], targetId, () => {
                // Show image after typewriter completes (slide 5 for multi-slide, slide 3 for level 1)
                const showImageSlide = isMultiSlide ? (index === 5) : (index === 3);
                
                if (showImageSlide) {
                    let imagePath;
                    if (gameState.currentLevel === 2) {
                        imagePath = "img/example2.png";
                    } else if (gameState.currentLevel === 3) {
                        imagePath = "img/example3.png";
                    } else {
                        imagePath = "img/examples.jpg";
                    }
                    
                    const imgContainer = isMultiSlide ? 
                        document.getElementById('instr-img-container') : 
                        document.getElementById('instr-3-img-container');
                    
                    if (imgContainer) {
                        imgContainer.innerHTML = 
                            `<img src="${imagePath}" class="img-fluid d-block mx-auto" alt="Example">`;
                    }
                }
            });
        });
    }

    new bootstrap.Modal(modalEl).show();
}