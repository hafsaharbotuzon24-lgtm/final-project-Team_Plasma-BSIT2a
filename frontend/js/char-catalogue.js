const desktopEnterBtn = document.querySelector('#charCarousel .scroll-btn-enter');
const mobileEnterBtn = document.querySelector('.bottom-nav .scroll-btn-enter');

function handleEnterClick(e) {
    e.preventDefault();

    // Get the current character index from the carousel
    let selectedChar = characters[currentIndex].roleScroll;
    
    // Determine character based on roleScroll image
    if (selectedChar.includes('witch')) {
        selectedChar = 'witch';
    } else if (selectedChar.includes('knight')) {
        selectedChar = 'knight';
    } else if (selectedChar.includes('rogue')) {
        selectedChar = 'rogue';
    } else {
        selectedChar = 'witch'; 
    }

    console.log('Character selected:', selectedChar);
    
    
    localStorage.setItem('selectedCharacter', selectedChar);

    
    window.location.href = 'play.html';
}


if (desktopEnterBtn) {
    desktopEnterBtn.addEventListener('click', handleEnterClick);
}


if (mobileEnterBtn) {
    mobileEnterBtn.addEventListener('click', handleEnterClick);
}
const characters = [
    {
        roleScroll: "img/banner-witch.png",
        sprite: "img/witch-model.png",
       
        bio: "The only daughter and mage in a family of knights, Cecily wields a rare ability to synergize elements. Caught between her father’s wish for a warrior and her mother’s desire for a reflection, she works to exhaustion to satisfy both. In her rare leisure, she paints on rags and crafts the kingdom's finest wine.",

        stats: { "Mana": 5, "Artistry": 4, "Spellcasting": 4 }
    },
    {
        roleScroll: "img/banner-knight.png",
        sprite: "img/knight-model.png",
        
        bio: "Born to a poor fenland family, Torben inherited both his father’s Viking strength and his mother’s kindness. He became a knight not for glory, but to lift his twelve siblings out of poverty and prove his family's worth to the kingdom. In his quiet moments, he enjoys gardening and a simple meal of barley bread.",
        stats: { "Tenacity": 5, "Strength": 4, "Gardening": 3 }
    },
    {
        roleScroll: "img/banner-rogue.png",
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
    statsContainer.innerHTML = ''; 
    
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


window.onload = updateDisplay;

// Listen for keyboard arrow keys
const carouselElement = document.getElementById('charCarousel');
    const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselElement);

    
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            
            bsCarousel.prev();
            
            if (typeof prevChar === "function") prevChar();
        } 
        else if (event.key === 'ArrowRight') {
            
            bsCarousel.next();
            
            if (typeof nextChar === "function") nextChar();
        }
    });