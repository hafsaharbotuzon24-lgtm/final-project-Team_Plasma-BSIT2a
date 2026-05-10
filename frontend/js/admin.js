// =============================================
// ADMIN LOGIN FUNCTIONALITY - Backend Auth
// =============================================

const API_BASE = window.API_BASE_URL || 'http://localhost:5000';

// Check if admin is already logged in
document.addEventListener('DOMContentLoaded', function() {
    checkAdminSession();
    
    // Form submission
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', handleForgotPassword);
    }
});

function checkAdminSession() {
    const adminSession = localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession');
    if (adminSession) {
        try {
            const session = JSON.parse(adminSession);
            if (session.isLoggedIn && session.token) {
                window.location.href = 'admin-dashboard.html';
                return;
            }
        } catch (e) {
            localStorage.removeItem('adminSession');
            sessionStorage.removeItem('adminSession');
        }
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMessage = document.getElementById('errorMessage');
    
    // Reset error message
    errorMessage.classList.remove('show');
    
    try {
        const res = await fetch(`${API_BASE}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok && data.token) {
            // Create session with JWT token
            const session = {
                isLoggedIn: true,
                username: data.admin.username,
                token: data.token,
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe
            };

            // Store session
            if (rememberMe) {
                localStorage.setItem('adminSession', JSON.stringify(session));
            } else {
                sessionStorage.setItem('adminSession', JSON.stringify(session));
            }

            // Redirect to dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            // Show error message
            errorMessage.querySelector('span').textContent = data.message || 'Invalid credentials. Please try again.';
            errorMessage.classList.add('show');
            
            // Shake animation for form
            const form = document.querySelector('.admin-login-card');
            form.style.animation = 'shake 0.5s';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
            
            // Clear password field
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    } catch (err) {
        console.error('Login error:', err);
        errorMessage.querySelector('span').textContent = 'Unable to connect to server.';
        errorMessage.classList.add('show');
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    // Show info about default credentials
    const footer = document.querySelector('.admin-login-footer p');
    const originalText = footer.innerHTML;
    
    footer.innerHTML = '<i class="fas fa-info-circle"></i> Contact system administrator to reset password. Default: admin / admin123';
    footer.style.color = '#ffc107';
    
    setTimeout(() => {
        footer.innerHTML = originalText;
        footer.style.color = '';
    }, 5000);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
