const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'css/style.css'; // Path relative to the HTML file using the JS
document.head.appendChild(link);

document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('profTrigger');
    const overlay = document.getElementById('accountOverlay');

    if (!trigger || !overlay) {
        return;
    }

    // Toggle window on click
    trigger.addEventListener('click', (e) => {
        overlay.style.display = 'flex';
        e.stopPropagation(); // Prevents immediate closing
    });

    // Close when clicking outside the account-container
    window.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

// Dynamic Name Change Function
function changeName() {
    const newName = prompt("Enter new player name:");
    if (newName) {
        document.getElementById('userName').innerText = newName;
        // You could also save this to localStorage here
        localStorage.setItem('playerName', newName);
    }
}

// script.js
function navigate(destination) {
    console.log("Traveling to " + destination + "...");
    
    // Add a quick visual feedback click
    document.body.style.opacity = "0.7";
    
    setTimeout(() => {
        document.body.style.opacity = "1";
        
        // Map destinations to your file names
        switch(destination) {
            case 'play':
                window.location.href = "load-slot.html";
                break;
            case 'leaderboard':
                window.location.href = "leaderboard.html";
                break;
            case 'learn':
                window.location.href = "learn.html";
                break;
            case 'settings':
                window.location.href = "settings.html";
                break;
            case 'home':
                window.location.href = "index.html";
                break;
        }
    }, 150);
}

function snapToTop() {
    // Selects the container with the scrollbar class
    const container = document.querySelector('.scrollbar');
    
    container.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function lbBackToTop() {
    const scrollContainer = document.getElementById('lbScrollTarget');
    if (scrollContainer) {
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// For Volume Slider //
document.addEventListener('DOMContentLoaded', () => {
    const sfxSlider = document.getElementById('sfx-slider');
    const musicSlider = document.getElementById('music-slider');

    if (!sfxSlider || !musicSlider) {
        return;
    }

    // 1. Load saved volumes or defaults
    const savedSfx = localStorage.getItem('sfxVolume') || 80;
    const savedMusic = localStorage.getItem('musicVolume') || 50;
    
    sfxSlider.value = savedSfx;
    musicSlider.value = savedMusic;

    // 2. Slider Change Listeners
    sfxSlider.addEventListener('input', (e) => {
        localStorage.setItem('sfxVolume', e.target.value);
        console.log(`SFX Volume: ${e.target.value}%`);
    });

    musicSlider.addEventListener('input', (e) => {
        localStorage.setItem('musicVolume', e.target.value);
        console.log(`Music Volume: ${e.target.value}%`);
    });

    // 3. Mute Logic (Clicking icons)
    document.getElementById('toggle-sfx').addEventListener('click', () => {
        sfxSlider.value = 0;
        localStorage.setItem('sfxVolume', 0);
    });

    document.getElementById('toggle-music').addEventListener('click', () => {
        musicSlider.value = 0;
        localStorage.setItem('musicVolume', 0);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggles = document.querySelectorAll('.mobile-nav-toggle');

    if (!navToggles.length) {
        return;
    }

    navToggles.forEach((toggle) => {
        const nav = toggle.closest('.plasma-navbar');
        const menu = nav ? nav.querySelector('.nav-links-wrap') : null;
        if (!menu) return;

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        menu.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    });

    window.addEventListener('click', () => {
        document.querySelectorAll('.nav-links-wrap.is-open').forEach((menu) => {
            menu.classList.remove('is-open');
        });
        document.querySelectorAll('.mobile-nav-toggle[aria-expanded="true"]').forEach((toggle) => {
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});

// 4. Logout Action
function handleLogout() {
    if(confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html"; // Or your login page
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.getElementById('lb-content');
    const backBtn = document.getElementById('scrollToTop');

    // Sample Data to show off the scrollbar
    const players = [
        { rank: "1.", name: "RedGUillermo", score: "9999" },
        { rank: "2.", name: "NIGGA", score: "8500" },
        { rank: "3.", name: "KANTOT_KALIMOT", score: "7200" },
        { rank: "4.", name: "LORD_PENIS", score: "5000" },
        { rank: "5.", name: "HAHAHA", score: "4200" },
        { rank: "6.", name: "BIT_CRUSHER", score: "3100" },
        { rank: "7.", name: "DIWAta", score: "1500" }
    ];

    // Generate Rows
    scrollContainer.innerHTML = players.map(player => `
        <div class="lb-player-slot">
            <span>${player.rank}</span>
            <span>${player.name}</span>
            <span>${player.score}</span>
        </div>
    `).join('');

    // Functionable Scroll Back Button
    backBtn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

function handleSignup() {
    console.log("Redirecting to registration portal...");
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = "signup.html"; 
    }, 500);
}

function handleGithub() {
    alert("Connecting to the Github...");
}

function handleGuest() {
    console.log("Entering as an Anonymous Wanderer...");
    window.location.href = "game.html";
}

function goBack() {
    window.history.back();
}

function goToNameInterface() {
    const user = document.getElementById('username').value;
    
    if (user === "") {
        alert("Identify yourself, programmerr!");
        return;
    }

    console.log("Validating password for: " + user);
    
    // Smooth transition to the Name Interface
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = "name-interface.html";
    }, 500);
}

// script.js
function handleMenu(destination) {
    console.log("Navigating to: " + destination);

    // Simple fade transition effect
    document.body.style.opacity = '0.5';

    setTimeout(() => {
        document.body.style.opacity = '1';
        
        switch(destination) {
            case 'play':
                window.location.href = "load-slot.html";
                break;
            case 'leaderboard':
                alert("Rankings are currently locked by the Bug King!");
                break;
            case 'learn':
                window.location.href = "learn.html";
                break;
            case 'settings':
                alert("Opening Option Runes...");
                break;
        }
    }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    const normalCursor = "url('assets/click-nonactive.png'), auto"; // Double check this path!
    const clickCursor = "url('assets/click-active.png'), pointer";

    document.body.style.cursor = normalCursor;

    window.addEventListener('mousedown', () => {
        document.body.style.cursor = clickCursor;
    });

    window.addEventListener('mouseup', () => {
        document.body.style.cursor = normalCursor;
    });
});

/* load-slot js */
function goToLoadSlot() {
    console.log("Opening Load Slot...");
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = "load-slot.html";
    }
    , 500);
}
function goCharSelect() {
    console.log("Opening Character Selection...");
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = "char-select.html";
    }
    , 500);
}

// Data for your characters
const characterData = {
    0: {
        role: "Knight",
        bio: "A brave defender of the source code, wielding the sword of Syntax.",
        stats: { str: 3, def: 2, agi: 1 },
        icon: "knight-icon.png"
    },
    1: {
        role: "Mage",
        bio: "Master of the Logic Runes. Can debug any curse with a single spell.",
        stats: { str: 1, def: 1, agi: 3 },
        icon: "mage-icon.png"
    }
    // Add more characters here as needed
};

// Initialize the Character Select logic
document.addEventListener('DOMContentLoaded', function() {
    const charCarousel = document.getElementById('charCarousel');
    
    if (charCarousel) {
        charCarousel.addEventListener('slide.bs.carousel', function (event) {
            const index = event.to; // The index of the next character
            updateCharacterInfo(index);
        });
    }
});

function updateCharacterInfo(index) {
    const data = characterData[index];
    if (!data) return;

    // Update Bio and Icon
    document.querySelector('.bio-text').innerText = data.bio;
    document.querySelector('.char-icon').src = data.icon;

    // Update Stats (Stars)
    const statRows = document.querySelectorAll('.stat-row .stars');
    
    // Clear and redraw stars for Strength, Defense, Agility
    updateStars(statRows[0], data.stats.str);
    updateStars(statRows[1], data.stats.def);
    updateStars(statRows[2], data.stats.agi);
}

function updateStars(container, count) {
    container.innerHTML = ''; // Clear old stars
    for (let i = 0; i < count; i++) {
        const star = document.createElement('img');
        star.src = 'star.png';
        container.appendChild(star);
    }
}
// keyboard-controls.js

document.addEventListener('keydown', function(event) {
    // Select your carousel element by ID
    const charCarouselElement = document.getElementById('charCarousel');
    
    // Initialize the Bootstrap Carousel instance
    const carousel = bootstrap.Carousel.getInstance(charCarouselElement);

    if (event.key === "ArrowLeft") {
        // Player pressed Left Arrow
        console.log("Keyboard: Moving to previous character");
        carousel.prev();
    } 
    else if (event.key === "ArrowRight") {
        // Player pressed Right Arrow
        console.log("Keyboard: Moving to next character");
        carousel.next();
    }
});