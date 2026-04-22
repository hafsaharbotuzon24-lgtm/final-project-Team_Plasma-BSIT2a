const API_BASE = window.API_BASE_URL || 'http://localhost:5000';

function usernameToEmail(username) {
    const safe = String(username || '').trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
    return `${safe || 'player'}@combatcoders.local`;
}

async function apiRequest(path, options = {}) {
    let response;
    try {
        response = await fetch(`${API_BASE}${path}`, {
            headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
            credentials: 'include',
            ...options
        });
    } catch (networkErr) {
        throw new Error(networkErr?.message || 'Network error: unable to reach backend');
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const validation = Array.isArray(data?.errors)
            ? data.errors.map((e) => e?.message).filter(Boolean).join('\n')
            : '';
        throw new Error(validation || data.message || `Request failed (HTTP ${response.status})`);
    }
    return data;
}

function openRegModal() { document.getElementById('regModal').classList.remove('d-none'); }
function closeRegModal() { document.getElementById('regModal').classList.add('d-none'); }
function closeErrorModal() { document.getElementById('errorModal').classList.add('d-none'); }

function closeModal(id) {
    document.getElementById(id).classList.add('d-none');
}

function showError(msg) {
    document.getElementById('errorMsg').innerText = msg;
    document.getElementById('errorModal').classList.remove('d-none');
}

function isValidEmail(email) {
    // Basic pragmatic check; backend still enforces strict validation.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

async function saveNewAccount() {
    const username = document.getElementById('regName').value.trim();
    const emailInput = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPass').value.trim();

    if (!username || !emailInput || !password) {
        showError('Data required: Entry fields are empty.');
        return;
    }

    if (!isValidEmail(emailInput)) {
        showError('Please provide a valid email address.');
        return;
    }

    // Prevent accidental double-click spamming the auth endpoints (can trigger 429).
    const saveBtn = document.querySelector('#regModal button[onclick="saveNewAccount()"]');
    if (saveBtn) {
        saveBtn.disabled = true;
    }

    try {
        const registerPayload = { username, email: emailInput, password };

        const registerData = await apiRequest('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(registerPayload)
        });

        const loginData = await apiRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                identifier: registerPayload.email,
                password
            })
        });

        localStorage.setItem('authToken', loginData.token || '');
        localStorage.setItem('userName', registerData.player?.username || username);
        localStorage.setItem('userEmail', registerData.player?.email || registerPayload.email);
        window.location.href = 'index.html';
    } catch (err) {
        showError(err.message || 'System failure: Database unreachable.');
    } finally {
        if (saveBtn) {
            saveBtn.disabled = false;
        }
    }
}

function loginExisting() {
    document.getElementById('loginExistingModal').classList.remove('d-none');
}

async function validateExistingLogin() {
    const nameOrEmail = document.getElementById('loginName').value.trim();
    const password = document.getElementById('loginPass').value.trim();

    if (!nameOrEmail || !password) {
        showError('Please enter your credentials.');
        return;
    }

    const email = nameOrEmail.includes('@') ? nameOrEmail : usernameToEmail(nameOrEmail);

    try {
        const data = await apiRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ identifier: nameOrEmail.includes('@') ? email : nameOrEmail, password })
        });

        localStorage.setItem('authToken', data.token || '');
        localStorage.setItem('userName', data.player?.username || nameOrEmail);
        localStorage.setItem('userEmail', data.player?.email || email);
        closeModal('loginExistingModal');
        window.location.href = 'index.html';
    } catch (err) {
        showError(err.message || 'Invalid credentials.');
    }
}

function handleCredentialResponse(response) {
    (async () => {
        try {
            const data = await apiRequest('/api/auth/google', {
                method: 'POST',
                body: JSON.stringify({ credential: response.credential })
            });

            localStorage.setItem('authToken', data.token || '');
            localStorage.setItem('userName', data.player?.username || 'Google User');
            localStorage.setItem('userEmail', data.player?.email || '');
            localStorage.setItem('isGoogleUser', 'true');
            window.location.href = 'index.html';
        } catch (e) {
            showError(e.message || 'Google Access Failed.');
        }
    })();
}

function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

function openForgotEmailModal() {
    closeModal('loginExistingModal');
    document.getElementById('forgotEmailModal').classList.remove('d-none');
}

function processEmailRecovery() {
    const email = document.getElementById('forgotEmailInput').value.trim();
    if (email.includes('@')) {
        localStorage.setItem('recoveryEmail', email);
        closeModal('forgotEmailModal');
        document.getElementById('otpVerifyModal').classList.remove('d-none');
    } else {
        showError('Invalid email format.');
    }
}

function processOTPVerify() {
    const otp = document.getElementById('otpCodeInput').value.trim();
    if (otp.length === 6) {
        closeModal('otpVerifyModal');
        document.getElementById('renewPasswordModal').classList.remove('d-none');
    } else {
        showError('Please enter the 6-digit OTP.');
    }
}

function processPasswordRenewal() {
    const newPass = document.getElementById('newPassInput').value;
    const confirm = document.getElementById('confirmNewPassInput').value;
    if (newPass && newPass === confirm) {
        closeModal('renewPasswordModal');
        showError('Password reset API is not implemented yet in backend.');
    } else {
        showError('Passwords do not match.');
    }
}