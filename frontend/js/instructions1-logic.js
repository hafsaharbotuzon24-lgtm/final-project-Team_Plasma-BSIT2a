function openInstructionsModal() {
    document.getElementById('modalContentWrapper').innerHTML = `
        <div class="bg-#15324e p-5 text-white border border-4 border-dark shadow-lg text-center" style="background-color: #15324e;">
            <div id="instrCarousel" class="carousel slide" data-bs-ride="false">
                <div class="carousel-inner pixel-font fs-3">
                    <div class="carousel-item active">
                        <p>LVL1 HTML<br>HTML (HyperText Markup Language) is the "bricks and walls" of a house. It is a markup language used to label and structure content for web browsers.
                    </div>
                    <div class="carousel-item">
                        <p>HTML Tags: These are words wrapped in angle brackets that tell the browser what to do. Most come in pairs:</p>
                        <p>&ltp&gt and &lt/p&gt: Used for a standard paragraph.</p>
                        <p>&lth1&gt and &lt/h1&gt: Used for a main title or heading to make text big and bold.</p>
                    
                    </div>
                    <div class="carousel-item">
                        <p>Every page uses a standard structure to organize the "house"</p>
                        <p>&lthtml&gt: The outer wrapper for the entire document.</p>
                        <p>&lthead&gt: The "secret closet" containing hidden info, like the &lttitle1&gt for the browser tab.</p>
                        <p>&ltbody&gt: The "actual room" where all visible content (text, images, buttons) is placed.</p>
                    </div>
                     <div class="carousel-item">
                        <p>You create a webpage by saving your code as a .html file and opening it with a browser like Chrome or Safari.</p>
                        <p>Example:</p>
                        <img src="../img/examples.jpg" class="img-fluid d-block mx-auto" alt="Example of HTML file">
                    </div>
                     <div class="carousel-item">
                        <p>Goodluck Coder! Adventure Awaits!</p>
                    </div>
                </div>
                <div class="mt-4">
                    <button class="btn btn-dark" data-bs-target="#instrCarousel" data-bs-slide="prev">PREV</button>
                    <button class="btn btn-dark" data-bs-target="#instrCarousel" data-bs-slide="next">NEXT</button>
                </div>
            </div>
            <button class="btn btn-success mt-5 pixel-font w-100" style="background-color: #020722; border: #ffffff" data-bs-dismiss="modal">START GAME</button>
        </div>`;
    new bootstrap.Modal(document.getElementById('gameModal')).show();
}