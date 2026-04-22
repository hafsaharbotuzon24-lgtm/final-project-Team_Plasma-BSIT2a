// --- GLOBAL AUDIO ENGINE ---
let bgm;

/**
 * Plays a one-shot sound effect (SFX)
 * Usage: playSFX('assets/sounds/click.mp3');
 */
function playSFX(audioPath) {
    const volume = localStorage.getItem('sfxVolume') || 80;
    const sfx = new Audio(audioPath);
    sfx.volume = volume / 100; 
    sfx.play().catch(e => console.log("SFX playback interaction required."));
}

/**
 * Starts background music (BGM) with persistence
 * Usage: startBGM('assets/sounds/theme.mp3');
 */
function startBGM(audioPath) {
    const volume = localStorage.getItem('musicVolume') || 50;
    
    if (!bgm) {
        bgm = new Audio(audioPath);
        bgm.loop = true;
        // Resume from where the user left off on the previous page
        const savedTime = localStorage.getItem('bgmTime');
        if (savedTime) bgm.currentTime = parseFloat(savedTime);
    }
    
    bgm.volume = volume / 100;
    
    bgm.play().catch(error => {
        console.log("Autoplay blocked. Music will start on first click.");
        document.addEventListener('click', () => bgm.play(), { once: true });
    });
}

// Save BGM position before the window closes or navigates
window.addEventListener('beforeunload', () => {
    if (bgm) {
        localStorage.setItem('bgmTime', bgm.currentTime);
    }
});

// Sync volume instantly if changed in another browser tab
window.addEventListener('storage', (e) => {
    if (bgm && e.key === 'musicVolume') {
        bgm.volume = (e.newValue || 50) / 100;
    }
});

// --- SETTINGS INTERFACE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const sfxSlider = document.getElementById('sfx-slider');
    const musicSlider = document.getElementById('music-slider');
    const sfxBtn = document.getElementById('toggle-sfx');
    const musicBtn = document.getElementById('toggle-music');

    // 1. Initialize sliders from LocalStorage
    if (sfxSlider) {
        sfxSlider.value = localStorage.getItem('sfxVolume') || 80;
        sfxSlider.addEventListener('input', (e) => {
            localStorage.setItem('sfxVolume', e.target.value);
        });
    }

    if (musicSlider) {
        musicSlider.value = localStorage.getItem('musicVolume') || 50;
        musicSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            localStorage.setItem('musicVolume', val);
            // Live update the music volume as the slider moves
            if (bgm) bgm.volume = val / 100;
        });
    }

    // 2. Mute/Toggle Logic (Clicking the icon buttons)
    if (sfxBtn) {
        sfxBtn.addEventListener('click', () => {
            const current = localStorage.getItem('sfxVolume') || 80;
            const target = current > 0 ? 0 : 80; // Toggle between mute and default
            localStorage.setItem('sfxVolume', target);
            if (sfxSlider) sfxSlider.value = target;
            playSFX('assets/sounds/click.mp3'); // Play sound to confirm
        });
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            const current = localStorage.getItem('musicVolume') || 50;
            const target = current > 0 ? 0 : 50;
            localStorage.setItem('musicVolume', target);
            if (musicSlider) musicSlider.value = target;
            if (bgm) bgm.volume = target / 100;
        });
    }
});

// --- STATE-BASED BGM ENGINE ---
let currentTrackPath = ""; // Track the currently playing file

function startBGM(audioPath) {
    const volume = localStorage.getItem('musicVolume') || 50;

    // 1. If the music is already playing the CORRECT song, just adjust volume and exit
    if (bgm && currentTrackPath === audioPath) {
        bgm.volume = volume / 100;
        return; 
    }

    // 2. If a DIFFERENT song is playing, stop it first
    if (bgm) {
        bgm.pause();
        bgm = null; 
    }

    // 3. Initialize the new track for this "Area"
    bgm = new Audio(audioPath);
    bgm.loop = true; // Continuous loop
    currentTrackPath = audioPath; // Update state
    bgm.volume = volume / 100;

    // 4. Persistence: Resume if it's the same track we previously saved
    const savedTime = localStorage.getItem('bgmTime');
    const savedTrack = localStorage.getItem('currentTrack');
    
    if (savedTime && savedTrack === audioPath) {
        bgm.currentTime = parseFloat(savedTime);
    }

    bgm.play().catch(() => {
        document.addEventListener('click', () => bgm.play(), { once: true });
    });
}

// Update the persistence save
window.addEventListener('beforeunload', () => {
    if (bgm) {
        localStorage.setItem('bgmTime', bgm.currentTime);
        localStorage.setItem('currentTrack', currentTrackPath);
    }
});