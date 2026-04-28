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
            "LVL1 HTML<br><br>HTML (HyperText Markup Language) is the \"bricks and walls\" of a house. It is a markup language used to label and structure content for web browsers.",
            "HTML Tags<br><br>These are words wrapped in angle brackets that tell the browser what to do. Most come in pairs: <span class='tag-highlight'>&lt;p&gt;</span> and <span class='tag-highlight'>&lt;/p&gt;</span> for paragraphs, <span class='tag-highlight'>&lt;h1&gt;</span> and <span class='tag-highlight'>&lt;/h1&gt;</span> for headings.",
            "Standard Structure<br><br>Every page uses a standard structure: <span class='tag-highlight'>&lt;html&gt;</span> (wrapper), <span class='tag-highlight'>&lt;head&gt;</span> (secret info), and <span class='tag-highlight'>&lt;body&gt;</span> (visible content).",
            "Example Preview<br><br>Here's what it looks like:",
            "Goodluck Coder!<br><br>Adventure Awaits!"
        ],
        2: [
            // Slide 0
            "LVL2 — Building Your Digital Home<br><br>Building on the \"house\" analogy, more complex tags act as <span class='tag-highlight'>specialized rooms</span> in your HTML skeleton.",
            
            // Slide 1
            "The Front Porch & Living Room<br><br><span class='tag-highlight'>&lt;header&gt;</span> — The front porch with your logo<br><span class='tag-highlight'>&lt;main&gt;</span> — The living room with main content<br><span class='tag-highlight'>&lt;footer&gt;</span> — The basement for fine print",
            
            // Slide 2
            "Individual Rooms<br><br><span class='tag-highlight'>&lt;section&gt;</span> — Individual rooms grouping related ideas<br><span class='tag-highlight'>&lt;nav&gt;</span> — A signpost helping users navigate<br><span class='tag-highlight'>&lt;hr&gt;</span> — A divider wall between sections",
            
            // Slide 3
            "Making It Functional<br><br>Interactive elements let users engage with your page:<br><br><span class='tag-highlight'>&lt;label&gt;</span> and <span class='tag-highlight'>&lt;input&gt;</span> — A mailbox for visitor information<br><span class='tag-highlight'>&lt;ul&gt;</span> and <span class='tag-highlight'>&lt;li&gt;</span> — A bulletin board for lists<br><span class='tag-highlight'>&lt;small&gt;</span> — Fine print at the bottom",
            
            // Slide 4
            "Office Analogy: Structure<br><br><span class='tag-highlight'>Corporate Layout:</span><br><span class='tag-highlight'>&lt;header&gt;</span> — Company name and logo<br><span class='tag-highlight'>&lt;main&gt;</span> — Primary work area<br><span class='tag-highlight'>&lt;footer&gt;</span> — Copyright and contact<br><span class='tag-highlight'>&lt;section&gt;</span> — Distinct departments",
            
            // Slide 5
            "Office Analogy: Navigation<br><br><span class='tag-highlight'>&lt;nav&gt;</span> — Office directory<br><span class='tag-highlight'>&lt;hr&gt;</span> — Visual separator<br><br><span class='tag-highlight'>Data Organization:</span><br><span class='tag-highlight'>&lt;ul&gt;</span> + <span class='tag-highlight'>&lt;li&gt;</span> — Bulleted task lists",
            
            // Slide 6
            "Example Code<br><br><pre style='color:white; font-family:\"Pixelify Sans\", monospace; text-align:left; font-size:0.7em; line-height:1.3; background:#0a0a1a; padding:10px; border:1px solid #FFD700; border-radius:4px; overflow-x:auto;'>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>&lt;body&gt;<br><br>  &lt;header&gt;<br>    &lt;h1&gt;Dashboard&lt;/h1&gt;<br>    &lt;nav&gt;Home | Settings&lt;/nav&gt;<br>  &lt;/header&gt;<br><br>  &lt;hr&gt;<br><br>  &lt;main&gt;<br>    &lt;section&gt;<br>      &lt;h2&gt;Task List&lt;/h2&gt;<br>      &lt;ul&gt;<br>        &lt;li&gt;HTML (Done)&lt;/li&gt;<br>        &lt;li&gt;Forms (WIP)&lt;/li&gt;<br>      &lt;/ul&gt;<br>    &lt;/section&gt;<br>  &lt;/main&gt;<br><br>  &lt;footer&gt;<br>    &lt;small&gt;Admin | Offline&lt;/small&gt;<br>  &lt;/footer&gt;<br><br>&lt;/body&gt;<br>&lt;/html&gt;</pre>",
            
            // Slide 7
            "LVL2 — See It In Action<br><br>Here's what the code looks like rendered in a browser:",
            
            // Slide 8
            "Go get 'em, Tiger!<br><br>You've learned HTML structure. Now go build something great!"
        ],
        3: [
            // Slide 0
            "LVL3 — Storage & Toggles<br><br>Building on our house analogy, this version adds <span class='tag-highlight'>storage solutions</span> and <span class='tag-highlight'>toggle switches</span> to your structure.",
            
            // Slide 1
            "Collapsible Closets<br><br>The <span class='tag-highlight'>&lt;details&gt;</span> and <span class='tag-highlight'>&lt;summary&gt;</span> tags act like a <span class='tag-highlight'>collapsible closet</span> or a folding screen; they keep information tucked away until a guest clicks to open it, preventing the room from looking cluttered.",
            
            // Slide 2
            "Decision Making Tools<br><br>The <span class='tag-highlight'>&lt;select&gt;</span> tag works like a <span class='tag-highlight'>rotary dial</span>, offering a list of preset choices in a compact space.<br><br><span class='tag-highlight'>&lt;option&gt;</span> tags define each individual choice within the dial.",
            
            // Slide 3
            "Toggle Switches<br><br>The <span class='tag-highlight'>&lt;input type=\"checkbox\"&gt;</span> acts like a <span class='tag-highlight'>light switch</span>, allowing guests to flip multiple options on or off independently.",
            
            // Slide 4
            "The Dispatch Button<br><br><span class='tag-highlight'>&lt;button type=\"submit\"&gt;</span> is the <span class='tag-highlight'>dispatch key</span> that signals the browser to process and send gathered information.",
            
            // Slide 5
            "Clean Endings<br><br>The <span class='tag-highlight'>&lt;footer&gt;</span> with a <span class='tag-highlight'>&lt;p&gt;</span> tag displays a clean, readable copyright notice at the very bottom.<br><br>These parts focus on giving visitors <span class='tag-highlight'>clear, clickable choices</span> while keeping the layout professional.",
            
            // Slide 6
            "Office Analogy: Document Management<br><br><span class='tag-highlight'>&lt;details&gt;</span> and <span class='tag-highlight'>&lt;summary&gt;</span> — Interactive folder with label<br><span class='tag-highlight'>&lt;footer&gt;</span> and <span class='tag-highlight'>&lt;p&gt;</span> — Clean space for copyright notices",
            
            // Slide 7
            "Office Analogy: User Selection<br><br><span class='tag-highlight'>&lt;select&gt;</span> and <span class='tag-highlight'>&lt;option&gt;</span> — Rotary dial for picking one item<br><span class='tag-highlight'>&lt;input type=\"checkbox\"&gt;</span> — Toggle switch for yes/no<br><span class='tag-highlight'>&lt;button type=\"submit\"&gt;</span> — Dispatch key to send data",
            
            // Slide 8
            "Example Code<br><br><pre style='color:white; font-family:\"Pixelify Sans\", monospace; text-align:left; font-size:0.6em; line-height:1.3; background:#0a0a1a; padding:10px; border:1px solid #FFD700; border-radius:4px; overflow-x:auto;'>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>&lt;body&gt;<br><br>  &lt;header&gt;<br>    &lt;h1&gt;Feedback Portal&lt;/h1&gt;<br>  &lt;/header&gt;<br><br>  &lt;main&gt;<br>    &lt;details&gt;<br>      &lt;summary&gt;Helpful Tips&lt;/summary&gt;<br>      &lt;p&gt;Please select carefully&lt;/p&gt;<br>    &lt;/details&gt;<br><br>    &lt;form&gt;<br>      &lt;label&gt;Experience:&lt;/label&gt;<br>      &lt;select&gt;<br>        &lt;option&gt;Beginner&lt;/option&gt;<br>        &lt;option&gt;Expert&lt;/option&gt;<br>      &lt;/select&gt;<br><br>      &lt;input type=\"checkbox\"&gt;<br>      &lt;label&gt;Subscribe&lt;/label&gt;<br><br>      &lt;button type=\"submit\"&gt;Submit&lt;/button&gt;<br>    &lt;/form&gt;<br>  &lt;/main&gt;<br><br>  &lt;footer&gt;<br>    &lt;p&gt;Copyright 2026&lt;/p&gt;<br>  &lt;/footer&gt;<br><br>&lt;/body&gt;<br>&lt;/html&gt;</pre>",
            
            // Slide 9
            "You're a coding warrior!<br><br>Forms, toggles, and interactive elements — you've mastered them all. Go build something amazing!"
        ]
    };

    const slideContent = slideContents[gameState.currentLevel] || slideContents[1];
    const totalSlides = slideContent.length;
    
    // Level 1: 5 slides (image on slide 3)
    // Level 2: 9 slides (image on slide 7)
    // Level 3: 10 slides (image on slide... no image for level 3, or adjust as needed)
    const isLevel1 = gameState.currentLevel === 1;
    const isLevel2 = gameState.currentLevel === 2;
    const isLevel3 = gameState.currentLevel === 3;
    
    // Image slide positions
    const imageSlideIndex = isLevel1 ? 3 : (isLevel2 ? 7 : -1); // Level 3 has no image slide

    let carouselItemsHTML = '';
    
    if (isLevel1) {
        // Level 1: Original format with image on slide 3
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
                <div id="instr-img-container"></div>
            </div>
            <div class="carousel-item">
                <p id="instr-4"></p>
            </div>`;
    } else {
        // Level 2 & 3: Dynamic slides
        for (let i = 0; i < totalSlides; i++) {
            const isActive = i === 0 ? ' active' : '';
            const isImageSlide = i === imageSlideIndex;
            
            carouselItemsHTML += `
                <div class="carousel-item${isActive}">
                    <p id="instr-${i}" style="font-size: 0.85em; line-height: 1.6;"></p>
                    ${isImageSlide ? '<div id="instr-img-container"></div>' : ''}
                </div>`;
        }
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
                    <span class="text-white mx-3" id="slideCounter">1 / ${totalSlides}</span>
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
    const firstTargetId = isLevel1 ? 'instr-0' : 'instr-0';
    runTypewriter(slideContent[0], firstTargetId);
    runTypewriter("START GAME", "start-btn-text");

    // Carousel slide event
    if (carouselEl) {
        carouselEl.addEventListener('slid.bs.carousel', (event) => {
            const index = event.to;
            
            // Update slide counter
            const counter = document.getElementById('slideCounter');
            if (counter) {
                counter.textContent = `${index + 1} / ${totalSlides}`;
            }
            
            // Clear image container
            const imgContainer = document.getElementById('instr-img-container');
            if (imgContainer) imgContainer.innerHTML = "";
            
            // Stop any running typewriters
            for (let i = 0; i < totalSlides; i++) {
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
            const targetId = `instr-${index}`;
            runTypewriter(slideContent[index], targetId, () => {
                // Show image after typewriter completes
                if (index === imageSlideIndex && imageSlideIndex !== -1) {
                    let imagePath;
                    if (gameState.currentLevel === 1) {
                        imagePath = "img/examples.jpg";
                    } else if (gameState.currentLevel === 2) {
                        imagePath = "img/example2.png";
                    } else if (gameState.currentLevel === 3) {
                        imagePath = "img/example3.png";
                    }
                    
                    const imgContainer = document.getElementById('instr-img-container');
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