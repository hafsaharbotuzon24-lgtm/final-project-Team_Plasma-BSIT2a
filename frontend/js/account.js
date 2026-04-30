// account.js - Add at the top
document.addEventListener('DOMContentLoaded', () => {
    loadAccountData();
    ensurePlayerId();
    updateNavbarAvatar();
});

function ensurePlayerId() {
    if (!localStorage.getItem('playerId')) {
        const email = localStorage.getItem('playerEmail') || 'player@plasma.com';
        const playerId = btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
        localStorage.setItem('playerId', playerId);
    }
}

function getPlayerId() {
    return localStorage.getItem('playerId') || (() => {
        const email = localStorage.getItem('playerEmail') || 'player@plasma.com';
        return btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
    })();
}

function loadAccountData() {
    const storedName = localStorage.getItem('playerUserName') || 'CombatCoder_01';
    const storedEmail = localStorage.getItem('playerEmail') || 'player@plasma.com';
    const storedAvatar = localStorage.getItem('playerAvatar') || 'img/player-profile.png';
    
    // Ensure player ID exists
    const playerId = getPlayerId();
    localStorage.setItem('playerId', playerId);

    const nameDisplay = document.getElementById('displayUserName');
    const emailDisplay = document.getElementById('displayUserEmail');
    const navAvatar = document.getElementById('navAvatar');
    const modalAvatar = document.getElementById('modalAvatar');
    const profileAvatar = document.getElementById('profileAvatar');

    if (nameDisplay) nameDisplay.innerText = storedName;
    if (emailDisplay) emailDisplay.innerText = storedEmail;
    
    if (navAvatar) {
        navAvatar.src = storedAvatar;
        navAvatar.style.borderRadius = '50%';
        navAvatar.style.objectFit = 'cover';
    }
    if (modalAvatar) {
        modalAvatar.src = storedAvatar;
        modalAvatar.style.borderRadius = '50%';
        modalAvatar.style.objectFit = 'cover';
    }
    if (profileAvatar) {
        profileAvatar.src = storedAvatar;
    }
    
    // Update navbar profile icon
    updateNavbarAvatar();
}

function updateNavbarAvatar() {
    const storedAvatar = localStorage.getItem('playerAvatar') || 'img/icon-prof.png';
    
    // Update the navbar profile icon
    const navProfileIcon = document.getElementById('navProfileIcon');
    if (navProfileIcon) {
        navProfileIcon.src = storedAvatar;
        navProfileIcon.style.width = '40px';
        navProfileIcon.style.height = '40px';
        navProfileIcon.style.borderRadius = '50%';
        navProfileIcon.style.objectFit = 'cover';
        navProfileIcon.style.imageRendering = 'auto';
    }
    
    // Also check for any other profile trigger images
    const profTriggerImg = document.querySelector('#profTrigger img');
    if (profTriggerImg && profTriggerImg.id !== 'navProfileIcon') {
        profTriggerImg.src = storedAvatar;
        profTriggerImg.style.width = '40px';
        profTriggerImg.style.height = '40px';
        profTriggerImg.style.borderRadius = '50%';
        profTriggerImg.style.objectFit = 'cover';
        profTriggerImg.style.imageRendering = 'auto';
    }
}

function openAccountModal() {
    const myModal = new bootstrap.Modal(document.getElementById('accountModal'));
    myModal.show();
}

function promptChangeName() {
    const newName = prompt("Enter new username:");
    if (newName && newName.trim() !== "") {
        localStorage.setItem('playerUserName', newName.trim());
        loadAccountData();
    }
}

function triggerAvatarUpload() {
    document.getElementById('avatarInput').click();
}

function previewAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            localStorage.setItem('playerAvatar', base64Image);
            loadAccountData();
            // Update navbar avatar immediately
            updateNavbarAvatar();
        };
        reader.readAsDataURL(file);
    }
}

// Expose for global use
window.updateNavbarAvatar = updateNavbarAvatar;
window.previewAvatar = previewAvatar;
window.triggerAvatarUpload = triggerAvatarUpload;

document.addEventListener('DOMContentLoaded', () => {
    loadAccountData();
    ensurePlayerId();
});

function ensurePlayerId() {
    if (!localStorage.getItem('playerId')) {
        const email = localStorage.getItem('playerEmail') || 'player@plasma.com';
        const playerId = btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
        localStorage.setItem('playerId', playerId);
    }
}

function getPlayerId() {
    return localStorage.getItem('playerId') || (() => {
        const email = localStorage.getItem('playerEmail') || 'player@plasma.com';
        return btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
    })();
}

function loadAccountData() {
    const storedName = localStorage.getItem('playerUserName') || 'CombatCoder_01';
    const storedEmail = localStorage.getItem('playerEmail') || 'player@plasma.com';
    const storedAvatar = localStorage.getItem('playerAvatar') || 'img/player-profile.png';
    
    // Ensure player ID exists
    const playerId = getPlayerId();
    localStorage.setItem('playerId', playerId);

    const nameDisplay = document.getElementById('displayUserName');
    const emailDisplay = document.getElementById('displayUserEmail');
    const navAvatar = document.getElementById('navAvatar');
    const modalAvatar = document.getElementById('modalAvatar');

    if (nameDisplay) nameDisplay.innerText = storedName;
    if (emailDisplay) emailDisplay.innerText = storedEmail;
    
    if (navAvatar) navAvatar.src = storedAvatar;
    if (modalAvatar) modalAvatar.src = storedAvatar;
}

function openAccountModal() {
    const myModal = new bootstrap.Modal(document.getElementById('accountModal'));
    myModal.show();
}

function promptChangeName() {
    const newName = prompt("Enter new username:");
    if (newName && newName.trim() !== "") {
        localStorage.setItem('playerUserName', newName.trim());
        loadAccountData();
    }
}

function triggerAvatarUpload() {
    document.getElementById('avatarInput').click();
}

function previewAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            localStorage.setItem('playerAvatar', base64Image);
            loadAccountData();
        };
        reader.readAsDataURL(file);
    }
}