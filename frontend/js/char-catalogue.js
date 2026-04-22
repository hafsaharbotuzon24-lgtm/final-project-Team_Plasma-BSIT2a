// Function to handle the character selection and navigation
const enterBtn = document.querySelector('.scroll-btn-enter');

if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
        // Prevent default navigation if handled via JS
        e.preventDefault();

        // 1. Identify which slide is active in the Bootstrap Carousel
        const activeSlide = document.querySelector('#charCarousel .carousel-item.active');
        
        // 2. Determine character ID based on the content of the active slide
        let selectedChar = 'witch'; // Default
        
        // We check for unique identifiers within the active slide
        if (activeSlide.innerHTML.includes('rogue') || activeSlide.classList.contains('rogue-slide')) {
            selectedChar = 'rogue';
        } else if (activeSlide.innerHTML.includes('knight') || activeSlide.classList.contains('knight-slide')) {
            selectedChar = 'knight';
        } else if (activeSlide.innerHTML.includes('witch') || activeSlide.classList.contains('witch-slide')) {
            selectedChar = 'witch';
        }

        // 3. Save to LocalStorage (This automatically overwrites previous values)
        localStorage.setItem('selectedCharacter', selectedChar);

        // 4. Move to play page
        window.location.href = 'play.html';
    });
}
const characters = [
    {
        roleScroll: "scroll-witch.png",
        sprite: "img/witch-model.png",
       
        bio: "The only daughter and mage in a family of knights, Cecily wields a rare ability to synergize elements. Caught between her father’s wish for a warrior and her mother’s desire for a reflection, she works to exhaustion to satisfy both. In her rare leisure, she paints on rags and crafts the kingdom's finest wine.",

        stats: { "Mana": 5, "Artistry": 4, "Spellcasting": 4 }
    },
    {
        roleScroll: "scroll-knight.png",
        sprite: "img/knight-model.png",
        
        bio: "Born to a poor fenland family, Torben inherited both his father’s Viking strength and his mother’s kindness. He became a knight not for glory, but to lift his twelve siblings out of poverty and prove his family's worth to the kingdom. In his quiet moments, he enjoys gardening and a simple meal of barley bread.",
        stats: { "Tenacity": 5, "Strength": 4, "Gardening": 3 }
    },
    {
        roleScroll: "scroll-rogue.png",
        sprite: "img/rogue-model.png",
      
        bio: "The last ghost of a fallen kingdom, Wulfric's only memories are of fire, mud, and a stranger pulling him to safety. Now a haunted rogue, he survives through foraging and quiet adventuring, using coin to buy the solitude he craves. Driven by a burning need for answers, he wanders the land seeking the truth behind the flames: who was he, and why did his world burn?",      
        stats: { "Speed": 5, "Dexterity": 4, "Badassery": 3 }
    }
];

let currentIndex = 0;

function updateDisplay() {
    const char = characters[currentIndex];
    
    // Update Images
    document.getElementById('role-scroll').src = char.roleScroll;
    document.getElementById('char-sprite').src = char.sprite;
    
    
    // Update Text
    document.getElementById('char-bio').innerText = char.bio;
    
    // Update Stats
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = ''; // Clear old stats
    
    for (const [name, value] of Object.entries(char.stats)) {
        let stars = '';
        for(let i=0; i<value; i++) stars += '<img src="img/icon-star.png" class="star-img">';
        
        statsContainer.innerHTML += `
            <div class="stat-row">
                <span>${name}:</span>
                <div class="stars">${stars}</div>
            </div>`;
    }
}

function nextChar() {
    currentIndex = (currentIndex + 1) % characters.length;
    updateDisplay();
}

function prevChar() {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateDisplay();
}

// Initialize on load
window.onload = updateDisplay;

// Listen for keyboard arrow keys
const carouselElement = document.getElementById('charCarousel');
    const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselElement);

    // 2. Add the Global Keyboard Listener
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            // Move the visual slide to the left
            bsCarousel.prev();
            // Call your existing function to update text/stats
            if (typeof prevChar === "function") prevChar();
        } 
        else if (event.key === 'ArrowRight') {
            // Move the visual slide to the right
            bsCarousel.next();
            // Call your existing function to update text/stats
            if (typeof nextChar === "function") nextChar();
        }
    });