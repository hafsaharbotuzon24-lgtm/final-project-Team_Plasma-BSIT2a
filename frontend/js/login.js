const API_BASE = window.API_BASE_URL || 'http://localhost:5000';

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('d-none');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('d-none');
}

// Local storage keys
const STORAGE_KEYS = {
    CURRENT_USER: 'combatCoders_currentUser',
    AUTH_TOKEN: 'authToken'
};

function normalizePlayer(player) {
    if (!player || typeof player !== 'object') return null;
    return {
        id: player._id || player.id || '',
        username: player.username || '',
        email: player.email || ''
    };
}

function setAuthSession(token, player) {
    const safePlayer = normalizePlayer(player);
    if (!token || !safePlayer) return;

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safePlayer));

    // Compatibility keys used in other frontend scripts.
    localStorage.setItem('playerId', safePlayer.id);
    localStorage.setItem('playerUserName', safePlayer.username);
    localStorage.setItem('playerEmail', safePlayer.email);
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
}

// Logout
function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem('playerId');
    localStorage.removeItem('playerUserName');
    localStorage.removeItem('playerEmail');
}

// Modal functions
function openRegModal() { 
    openModal('regModal');
}

function closeRegModal() { 
    closeModal('regModal');
}

function closeErrorModal() { 
    closeModal('errorModal');
}

function showError(msg) {
    const errorMsg = document.getElementById('errorMsg');
    const errorModal = document.getElementById('errorModal');
    
    if (errorMsg && errorModal) {
        errorMsg.innerText = msg;
        errorModal.classList.remove('d-none');
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function isValidPassword(password) {
    // Must match backend policy.
    return (
        typeof password === 'string' &&
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
}

function isValidUsername(username) {
    return username && username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
}

// =============================================
// REGISTRATION
// =============================================
async function saveNewAccount() {
    const username = document.getElementById('regName')?.value.trim();
    const emailInput = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPass')?.value.trim();

    if (!username || !emailInput || !password) {
        showError('All fields are required.');
        return;
    }

    if (!isValidUsername(username)) {
        showError('Username must be at least 3 characters and contain only letters, numbers, and underscores.');
        return;
    }

    if (!isValidEmail(emailInput)) {
        showError('Please provide a valid email address.');
        return;
    }

    if (!isValidPassword(password)) {
        showError('Password must be at least 8 chars with uppercase, lowercase, number, and special character.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username,
                email: emailInput,
                password
            })
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(payload.message || 'Registration failed');
        }

        setAuthSession(payload.token, payload.player);

        document.getElementById('regName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPass').value = '';

        closeRegModal();
        window.location.href = 'index.html';
    } catch (err) {
        showError(err.message || 'Unable to register right now.');
    }
}

// =============================================
// LOGIN
// =============================================
function loginExisting() {
    openModal('loginExistingModal');
}

async function validateExistingLogin() {
    const nameOrEmail = document.getElementById('loginName')?.value.trim();
    const password = document.getElementById('loginPass')?.value.trim();

    if (!nameOrEmail || !password) {
        showError('Please enter your username/email and password.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                identifier: nameOrEmail,
                password
            })
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(payload.message || 'Login failed');
        }

        setAuthSession(payload.token, payload.player);

        document.getElementById('loginName').value = '';
        document.getElementById('loginPass').value = '';

        closeModal('loginExistingModal');
        updateAccountDisplay();
        window.location.href = 'index.html';
    } catch (err) {
        showError(err.message || 'Unable to login right now.');
    }
}

// =============================================
// UPDATE ACCOUNT DISPLAY
// =============================================
function updateAccountDisplay() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const userNameEl = document.getElementById('userName');
        const userEmailEl = document.getElementById('userEmail');
        
        if (userNameEl) userNameEl.textContent = currentUser.username;
        if (userEmailEl) userEmailEl.textContent = currentUser.email;
    }
}

// =============================================
// CHANGE NAME
// =============================================
async function changeName() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showError('You must be logged in to change your name.');
        return;
    }

    const newName = prompt('Enter new username (min 3 characters, letters/numbers/underscores only):', currentUser.username);
    
    if (!newName) return;
    
    if (!isValidUsername(newName)) {
        showError('Invalid username. Must be at least 3 characters and contain only letters, numbers, and underscores.');
        return;
    }

    try {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (!token || !currentUser.id) {
            throw new Error('Session expired. Please login again.');
        }

        const response = await fetch(`${API_BASE}/api/players/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ username: newName })
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(payload.message || 'Failed to update username');
        }

        setAuthSession(token, payload);
        updateAccountDisplay();
        alert('Username updated successfully!');
    } catch (err) {
        showError(err.message || 'Unable to update username.');
    }
}

// =============================================
// GOOGLE LOGIN
// =============================================
async function handleCredentialResponse(response) {
    try {
        const credential = response?.credential;
        if (!credential) {
            throw new Error('Missing Google credential');
        }

        const req = await fetch(`${API_BASE}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ credential })
        });

        const payload = await req.json().catch(() => ({}));
        if (!req.ok) {
            throw new Error(payload.message || 'Google login failed');
        }

        setAuthSession(payload.token, payload.player);
        window.location.href = 'index.html';
    } catch (err) {
        showError(err.message || 'Unable to continue with Google login.');
    }
}

// =============================================
// FORGOT PASSWORD FLOW
// =============================================
function openForgotEmailModal() {
    closeModal('loginExistingModal');
    openModal('forgotEmailModal');
}

function processEmailRecovery() {
    const email = document.getElementById('forgotEmailInput')?.value.trim();
    if (!email || !email.includes('@')) {
        showError('Please enter a valid email address.');
        return;
    }

    showError('Password recovery API is not connected yet. Please contact support/admin.');
}

function processOTPVerify() {
    const otp = document.getElementById('otpCodeInput')?.value.trim();
    
    if (!otp || otp.length !== 6) {
        showError('Please enter a valid 6-digit code.');
        return;
    }

    closeModal('otpVerifyModal');
    openModal('renewPasswordModal');
}

function processPasswordRenewal() {
    showError('Password reset API is not connected yet.');
}

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    updateAccountDisplay();
    
    const currentUser = getCurrentUser();
    const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (currentUser && authToken) {
        console.log('Logged in as:', currentUser.username);
    }
});