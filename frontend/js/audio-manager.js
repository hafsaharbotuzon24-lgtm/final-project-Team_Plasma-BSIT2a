// =============================================
// AUDIO MANAGER - Enhanced
// Simple, reliable cross-page audio
// =============================================

(function() {
    'use strict';

    // =============================================
    // AUDIO PLAYERS
    // =============================================
    let bgmPlayer = null;

    // =============================================
    // VOLUME SETTINGS
    // =============================================
    function getMusicVolume() {
        return parseInt(localStorage.getItem('musicVolume') || '50') / 100;
    }

    function getSFXVolume() {
        return parseInt(localStorage.getItem('sfxVolume') || '80') / 100;
    }

    // =============================================
    // PAGE DETECTION
    // =============================================
    function getCurrentPage() {
        const path = window.location.pathname;
        let page = path.substring(path.lastIndexOf('/') + 1);
        if (!page || page === '') page = 'home.html';
        return page;
    }

    // =============================================
    // MUSIC MAPPING — API-driven with fallback
    // =============================================
    let musicConfig = null;

    // Hardcoded fallback if API is unavailable
    const fallbackMusicConfig = [
        { key: 'bg1', label: 'Home / Menu Music', file: 'sound-fx/bg1.mp3', pages: ['about.html','admin-dashboard.html','admin.html','learn.html','char-select.html','load-slot.html','login.html','module.html','modules.html','home.html','leaderboard.html','play-modes.html','profile.html'], volume: 50 },
        { key: 'bg2', label: 'Play Mode Music', file: 'sound-fx/bg2.mp3', pages: ['play.html'], volume: 50 },
        { key: 'bg3', label: 'Quest Mode Music', file: 'sound-fx/bg3.mp3', pages: ['quest-mode.html'], volume: 50 }
    ];

    async function fetchMusicConfig() {
        const API_BASE = window.API_BASE_URL || 'http://localhost:5000';
        try {
            const res = await fetch(`${API_BASE}/api/game-settings/music`, { headers: { 'Content-Type': 'application/json' } });
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    musicConfig = data;
                    console.log('✓ Music config loaded from API');
                    return;
                }
            }
        } catch (e) {
            console.warn('Could not fetch music config from API, using defaults');
        }
        musicConfig = fallbackMusicConfig;
    }

    function getMusicFile() {
        const page = getCurrentPage();
        const config = musicConfig || fallbackMusicConfig;
        for (const track of config) {
            if ((track.pages || []).includes(page)) return track.file;
        }
        return 'sound-fx/bg1.mp3';
    }

    function getMusicKey() {
        const page = getCurrentPage();
        const config = musicConfig || fallbackMusicConfig;
        for (const track of config) {
            if ((track.pages || []).includes(page)) return track.key;
        }
        return 'bg1';
    }

    // =============================================
    // PLAY BACKGROUND MUSIC - Instant play
    // =============================================
    function playBGM() {
        const musicFile = getMusicFile();
        const musicKey = getMusicKey();
        const savedMusicKey = sessionStorage.getItem('lastMusicKey');
        const savedTime = sessionStorage.getItem('bgmTime');
        
        
        bgmPlayer = new Audio();
        bgmPlayer.preload = 'auto';
        bgmPlayer.src = musicFile;
        bgmPlayer.loop = true;
        bgmPlayer.volume = getMusicVolume();
        
        
        if (savedMusicKey === musicKey && savedTime && parseFloat(savedTime) > 0) {
            bgmPlayer.currentTime = parseFloat(savedTime);
        }
        
        
        bgmPlayer.play().then(() => {
            console.log('▶ Playing:', musicFile);
        }).catch(() => {
            
            document.addEventListener('click', function retry() {
                bgmPlayer.play().catch(() => {});
                document.removeEventListener('click', retry);
            }, { once: true });
            document.addEventListener('keydown', function retry() {
                bgmPlayer.play().catch(() => {});
                document.removeEventListener('keydown', retry);
            }, { once: true });
        });
        
        
        setInterval(() => {
            if (bgmPlayer && !bgmPlayer.paused) {
                sessionStorage.setItem('bgmTime', bgmPlayer.currentTime);
                sessionStorage.setItem('lastMusicKey', musicKey);
            }
        }, 100);
    }

    // =============================================
    // PLAY CLICK SOUND
    // =============================================
    function playClick() {
        const click = new Audio('sound-fx/click.mp3');
        click.volume = getSFXVolume();
        click.currentTime = 0;
        click.play().catch(() => {});
    }

    // =============================================
    // PLAY SFX
    // =============================================
    window.playSFX = function(file) {
        const sfx = new Audio(file || 'sound-fx/click.mp3');
        sfx.volume = getSFXVolume();
        sfx.currentTime = 0;
        sfx.play().catch(() => {});
    };

    // =============================================
    // VOLUME UPDATES
    // =============================================
    window.updateMusicVolume = function() {
        if (bgmPlayer) {
            bgmPlayer.volume = getMusicVolume();
        }
    };

    // =============================================
    // INITIALIZE CLICK SOUNDS
    // =============================================
    function initClickSound() {
        document.addEventListener('click', function(e) {
            const target = e.target;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'SELECT' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[onclick]') ||
                target.getAttribute('role') === 'button'
            ) {
                playClick();
            }
        });
        
        console.log('✓ Click sounds ready');
    }

    // =============================================
    // SAVE BEFORE UNLOAD
    // =============================================
    window.addEventListener('beforeunload', function() {
        if (bgmPlayer) {
            sessionStorage.setItem('bgmTime', bgmPlayer.currentTime);
            sessionStorage.setItem('lastMusicKey', getMusicKey());
        }
    });

    // =============================================
    // LISTEN FOR VOLUME CHANGES
    // =============================================
    window.addEventListener('storage', function(e) {
        if (e.key === 'musicVolume' || e.key === 'sfxVolume') {
            if (bgmPlayer) bgmPlayer.volume = getMusicVolume();
        }
    });

    window.addEventListener('musicVolumeChanged', function() {
        if (bgmPlayer) bgmPlayer.volume = getMusicVolume();
    });

    // =============================================
    // START - Fetch config then play
    // =============================================
    async function init() {
        await fetchMusicConfig();
        playBGM();
        initClickSound();
        console.log('Audio Manager Ready - Page:', getCurrentPage());
    }

    
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
    
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }

})();