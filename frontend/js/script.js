 

 


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


    

// Profile Dropdown
(function() {
    function setupProfileDropdown() {
        const trigger = document.getElementById('profTrigger');
        const dropdown = document.getElementById('profileDropdown');
        
        if (!trigger || !dropdown) {
            console.error('Profile dropdown elements not found');
            return;
        }
        
        // Toggle dropdown on button click
        trigger.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking anywhere outside
        document.addEventListener('click', function(event) {
            if (!trigger.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });
        
        // Close dropdown on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                dropdown.classList.remove('show');
            }
        });
        
        // Close dropdown when window is resized (mobile handling)
        window.addEventListener('resize', function() {
            dropdown.classList.remove('show');
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupProfileDropdown);
    } else {
        setupProfileDropdown();
    }
})();

function openProfile() {
    window.location.href = 'profile.html';
    // Add your profile modal/page logic here
}

function switchTheme() {
    console.log('Switch Theme');
    // Add your theme switching logic here
}

function signOut() {
    var dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.remove('show');
    
    // Create modal HTML
    var modalHTML = `
        <div class="cc-logout-overlay" id="ccLogoutModal">
            <div class="cc-logout-modal-box">
                <h3 style="font-family: 'Pixelify Sans', sans-serif; color: #ffffff; font-size: 1.8rem; margin-bottom: 8px;">LOG OUT</h3>
                <p style="font-family: 'Pixelify Sans', sans-serif; color: #8aa0b8; font-size: 1.1rem; margin-bottom: 25px;">ARE YOU SURE?</p>
                <div class="cc-logout-actions">
                    <button class="cc-logout-btn cc-btn-no" onclick="closeCCLogout()">NO</button>
                    <button class="cc-logout-btn cc-btn-yes" onclick="confirmCCLogout()">YES</button>
                </div>
            </div>
        </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close on overlay click
    document.getElementById('ccLogoutModal').addEventListener('click', function(e) {
        if (e.target === this) closeCCLogout();
    });
    
    // Close on Escape
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeCCLogout();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeCCLogout() {
    var modal = document.getElementById('ccLogoutModal');
    if (modal) modal.remove();
}

function confirmCCLogout() {
    localStorage.removeItem('combatCoders_currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('playerId');
    localStorage.removeItem('playerUserName');
    localStorage.removeItem('playerEmail');
    window.location.href = 'login.html';
}

/**
 * Combined Logic for settings.html
 */

function handleLogout() {
    // 1. Play sound if the function exists from audio-manager.js
    if (typeof playSFX === 'function') {
        playSFX('sound-fx/click.mp3');
    }
    
    // 2. Target the unique ID we created
    const modal = document.getElementById('ccLogoutModal');
    if (modal) {
        modal.style.display = 'flex'; // This brings it to the front
    } else {
        console.error("Modal with ID 'ccLogoutModal' not found.");
    }
}

function closeCcModal() {
    const modal = document.getElementById('ccLogoutModal');
    if (modal) modal.style.display = 'none';
}

function confirmCcLogout() {
    window.location.href = 'login.html';
}