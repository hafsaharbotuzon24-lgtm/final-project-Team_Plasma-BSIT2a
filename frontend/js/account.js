document.addEventListener('DOMContentLoaded', () => {
    loadAccountData();
});

function loadAccountData() {
    // 1. Load Username (Fallbacks to localStorage if logic from login.js saved it)
    const storedName = localStorage.getItem('playerUserName') || 'CombatCoder_01';
    const storedEmail = localStorage.getItem('playerEmail') || 'player@plasma.com';
    const storedAvatar = localStorage.getItem('playerAvatar') || 'img/player-profile.png';

    // Update UI Elements
    const nameDisplay = document.getElementById('displayUserName');
    const emailDisplay = document.getElementById('displayUserEmail');
    const navAvatar = document.getElementById('navAvatar');
    const modalAvatar = document.getElementById('modalAvatar');

    if (nameDisplay) nameDisplay.innerText = storedName;
    if (emailDisplay) emailDisplay.innerText = storedEmail;
    
    // Update Avatar Images
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
        loadAccountData(); // Refresh UI
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
            loadAccountData(); // Refresh UI immediately
        };
        reader.readAsDataURL(file);
    }
}