// =============================================
// ADMIN DASHBOARD FUNCTIONALITY - MongoDB Backed
// =============================================

const API_BASE = window.API_BASE_URL || 'http://localhost:5000';

let adminToken = null;
let currentPlayersPage = 1;
let currentSearch = '';
let currentDetailPlayerId = null;
const analyticsCharts = { modules: null, quest: null, signups: null };

document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    initializeDashboard();
    setupEventListeners();
    loadDashboardData();
});

function getAdminToken() {
    const session = localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession');
    if (!session) return null;
    try {
        const data = JSON.parse(session);
        return data.token || null;
    } catch { return null; }
}

function checkAdminAuth() {
    const adminSession = localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession');

    if (!adminSession) {
        window.location.href = 'admin.html';
        return;
    }

    try {
        const session = JSON.parse(adminSession);
        if (!session.isLoggedIn) {
            window.location.href = 'admin.html';
            return;
        }

        adminToken = session.token || null;
        const usernameDisplay = document.getElementById('adminUsername');
        if (usernameDisplay) {
            usernameDisplay.textContent = session.username || 'Admin';
        }
    } catch (e) {
        window.location.href = 'admin.html';
    }
}

function initializeDashboard() {
    const overviewSection = document.getElementById('overview');
    const overviewNavItem = document.querySelector('.admin-nav-item[data-section="overview"]');
    if (overviewSection && overviewNavItem) {
        overviewSection.classList.add('active');
        overviewNavItem.classList.add('active');
    }
}

function setupEventListeners() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            switchSection(this.getAttribute('data-section'));
        });
    });

    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    document.querySelector('.save-settings-btn')?.addEventListener('click', saveSettings);
    document.querySelector('.reset-settings-btn')?.addEventListener('click', resetSettings);

    // Search with debounce
    let searchTimeout;
    document.getElementById('userSearch')?.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = this.value.trim();
            currentPlayersPage = 1;
            loadUsersData();
        }, 350);
    });

    // Modal action buttons
    document.getElementById('editPlayerBtn')?.addEventListener('click', () => {
        if (currentDetailPlayerId) openEditPlayerModal(currentDetailPlayerId);
    });
    document.getElementById('deletePlayerBtn')?.addEventListener('click', () => {
        if (currentDetailPlayerId) openDeleteConfirmModal(currentDetailPlayerId);
    });
}

function switchSection(sectionName) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));

    const targetSection = document.getElementById(sectionName);
    if (targetSection) targetSection.classList.add('active');

    const targetNavItem = document.querySelector(`.admin-nav-item[data-section="${sectionName}"]`);
    if (targetNavItem) targetNavItem.classList.add('active');

    loadSectionData(sectionName);
}

function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'overview': loadOverviewData(); break;
        case 'users': loadUsersData(); break;
        case 'leaderboard': loadLeaderboardData(); break;
        case 'questions': loadQuestionsData(); break;
        case 'music': loadMusicData(); break;
        case 'settings': loadSettingsData(); break;
    }
}

function loadDashboardData() {
    loadOverviewData();
}

// --- API helpers ---

async function adminFetch(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

    try {
        const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
        if (res.status === 401 || res.status === 403) {
            showNotification('Session expired. Please log in again.', 'error');
            setTimeout(() => { window.location.href = 'admin.html'; }, 1500);
            return null;
        }
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch {
            return { message: text || 'Invalid response', parseError: true };
        }
    } catch (err) {
        console.error('API fetch error:', err);
        showNotification('Failed to connect to server.', 'error');
        return null;
    }
}

// --- Overview ---

async function loadOverviewData() {
    const data = await adminFetch('/api/admin/stats');
    if (!data) return;

    document.getElementById('totalUsers').textContent = data.totalPlayers || 0;
    document.getElementById('completedProgress').textContent = data.completedProgress || 0;
    document.getElementById('avgLevel').textContent = data.avgLevel || 0;
    document.getElementById('totalProgress').textContent = data.totalProgress || 0;

    const learn = data.learning || {};
    const pq = document.getElementById('playersQuestStat');
    const pm = document.getElementById('playersModulesStat');
    if (pq) pq.textContent = learn.playersWithQuest ?? 0;
    if (pm) pm.textContent = learn.playersWithModules ?? 0;

    // Level distribution bars
    renderLevelDistribution(data.levelDistribution || []);

    const analytics = await adminFetch('/api/admin/analytics');
    renderAnalyticsCharts(analytics);

    // Recent activity
    const activityData = await adminFetch('/api/admin/recent-activity?limit=15');
    renderActivityList(activityData);
}

function renderAnalyticsCharts(analytics) {
    if (typeof Chart === 'undefined') return;
    if (!analytics) return;

    Chart.defaults.color = '#8aa0b8';
    Chart.defaults.borderColor = '#2a4a6e';

    const destroy = (key) => {
        if (analyticsCharts[key]) {
            analyticsCharts[key].destroy();
            analyticsCharts[key] = null;
        }
    };

    const modData = analytics.moduleQuizByModule || [];
    const ctxM = document.getElementById('chartModules');
    if (ctxM) {
        destroy('modules');
        analyticsCharts.modules = new Chart(ctxM, {
            type: 'bar',
            data: {
                labels: modData.map((d) => `Module ${d._id}`),
                datasets: [{
                    label: 'Avg %',
                    data: modData.map((d) => Math.round((d.avgPct || 0) * 10) / 10),
                    backgroundColor: 'rgba(255, 193, 7, 0.6)',
                    borderColor: '#ffc107',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, title: { display: true, text: '%' } }
                }
            }
        });
    }

    const qData = analytics.questLevelsCompleted || [];
    const ctxQ = document.getElementById('chartQuest');
    if (ctxQ) {
        destroy('quest');
        analyticsCharts.quest = new Chart(ctxQ, {
            type: 'bar',
            data: {
                labels: qData.map((d) => `Lv ${d._id}`),
                datasets: [{
                    label: 'Players completed',
                    data: qData.map((d) => d.completions || 0),
                    backgroundColor: 'rgba(76, 175, 80, 0.5)',
                    borderColor: '#4CAF50',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    const reg = analytics.registrationsByDay || [];
    const ctxS = document.getElementById('chartSignups');
    if (ctxS) {
        destroy('signups');
        analyticsCharts.signups = new Chart(ctxS, {
            type: 'line',
            data: {
                labels: reg.map((d) => d._id),
                datasets: [{
                    label: 'New players',
                    data: reg.map((d) => d.count || 0),
                    fill: true,
                    backgroundColor: 'rgba(255, 193, 7, 0.15)',
                    borderColor: '#ffc107',
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}

function renderLevelDistribution(distribution) {
    const container = document.getElementById('levelDistribution');
    if (!container) return;

    if (!distribution.length) {
        container.innerHTML = '<p style="color:#8aa0b8;">No level data yet.</p>';
        return;
    }

    const maxCount = Math.max(...distribution.map(d => d.count), 1);
    container.innerHTML = distribution.map(d => {
        const pct = Math.round((d.count / maxCount) * 100);
        return `<div class="level-bar-row">
            <span class="level-bar-label">Lv ${d._id}</span>
            <div class="level-bar-track"><div class="level-bar-fill" style="width:${pct}%"></div></div>
            <span class="level-bar-count">${d.count}</span>
        </div>`;
    }).join('');
}

function renderActivityList(activities) {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    if (!activities || !activities.length) {
        activityList.innerHTML = '<p>No recent activity to display.</p>';
        return;
    }

    activityList.innerHTML = activities.map(a => {
        const icon = a.type === 'registration' ? 'fa-user-plus' : 'fa-trophy';
        const label = a.type === 'registration'
            ? `New player: <strong>${escapeHtml(a.username)}</strong>`
            : `<strong>${escapeHtml(a.username)}</strong> completed a quest`;
        const time = timeAgo(a.timestamp);
        return `<div class="activity-item">
            <i class="fas ${icon}"></i>
            <span>${label}</span>
            <span class="activity-time">${time}</span>
        </div>`;
    }).join('');
}

// --- Players ---

async function loadUsersData() {
    const params = new URLSearchParams({ page: currentPlayersPage, limit: 20 });
    if (currentSearch) params.set('search', currentSearch);

    const data = await adminFetch(`/api/admin/players?${params}`);
    if (!data) return;

    const { players, pagination } = data;
    const tbody = document.getElementById('usersTableBody');
    const countEl = document.getElementById('userCount');

    if (countEl) countEl.textContent = `${pagination.total} players`;

    if (!players.length) {
        tbody.innerHTML = `<tr><td colspan="8" class="no-data">No players found.</td></tr>`;
        renderPagination(pagination);
        return;
    }

    tbody.innerHTML = players.map(p => {
        const pathName = p.currentPath?.path_name || '—';
        const regDate = p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—';
        return `<tr>
            <td><strong>${escapeHtml(p.username)}</strong></td>
            <td>${escapeHtml(p.email)}</td>
            <td><span class="level-badge">Lv ${p.level ?? 0}</span></td>
            <td>${p.hearts ?? 3}</td>
            <td>${p.hints ?? 1}</td>
            <td>${escapeHtml(pathName)}</td>
            <td>${regDate}</td>
            <td>
                <button class="action-btn view-btn" onclick="viewPlayer('${p._id}')" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="openEditPlayerModal('${p._id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="openDeleteConfirmModal('${p._id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    }).join('');

    renderPagination(pagination);
}

function renderPagination(pagination) {
    const container = document.getElementById('paginationContainer');
    if (!container || !pagination) { if(container) container.innerHTML = ''; return; }

    const { page, pages } = pagination;
    if (pages <= 1) { container.innerHTML = ''; return; }

    let html = '<div class="pagination">';
    html += `<button class="page-btn" ${page <= 1 ? 'disabled' : ''} onclick="goToPage(${page - 1})"><i class="fas fa-chevron-left"></i></button>`;

    const start = Math.max(1, page - 2);
    const end = Math.min(pages, page + 2);
    for (let i = start; i <= end; i++) {
        html += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }

    html += `<button class="page-btn" ${page >= pages ? 'disabled' : ''} onclick="goToPage(${page + 1})"><i class="fas fa-chevron-right"></i></button>`;
    html += '</div>';
    container.innerHTML = html;
}

function goToPage(page) {
    currentPlayersPage = page;
    loadUsersData();
}

// --- View Player Detail ---

async function viewPlayer(playerId) {
    currentDetailPlayerId = playerId;
    const modal = document.getElementById('userDetailModal');
    const body = document.getElementById('userDetailBody');
    modal.style.display = 'flex';
    body.innerHTML = '<p>Loading player data...</p>';

    const data = await adminFetch(`/api/admin/players/${playerId}`);
    if (!data || data.message === 'Player not found') {
        body.innerHTML = '<p>Failed to load player data.</p>';
        return;
    }

    const { player, progressStats, leaderboardEntry } = data;
    const pathName = player.currentPath?.path_name || 'None';
    const regDate = player.createdAt ? new Date(player.createdAt).toLocaleString() : '—';
    const updatedDate = player.updatedAt ? new Date(player.updatedAt).toLocaleString() : '—';

    body.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item"><label>Username</label><span>${escapeHtml(player.username)}</span></div>
            <div class="detail-item"><label>Email</label><span>${escapeHtml(player.email)}</span></div>
            <div class="detail-item"><label>Level</label><span class="level-badge">Lv ${player.level ?? 0}</span></div>
            <div class="detail-item"><label>Hearts</label><span>${player.hearts ?? 3} <i class="fas fa-heart" style="color:#ff6b6b"></i></span></div>
            <div class="detail-item"><label>Hints</label><span>${player.hints ?? 1} <i class="fas fa-lightbulb" style="color:#ffc107"></i></span></div>
            <div class="detail-item"><label>Current Path</label><span>${escapeHtml(pathName)}</span></div>
            <div class="detail-item"><label>Registered</label><span>${regDate}</span></div>
            <div class="detail-item"><label>Last Updated</label><span>${updatedDate}</span></div>
        </div>
        <div class="detail-stats-section">
            <h4><i class="fas fa-chart-bar"></i> Progress Summary</h4>
            <div class="detail-stats-grid">
                <div class="detail-stat"><strong>${progressStats.totalAttempts}</strong><span>Total Attempts</span></div>
                <div class="detail-stat"><strong>${progressStats.completedAttempts}</strong><span>Completed</span></div>
                <div class="detail-stat"><strong>${progressStats.completionRate}%</strong><span>Completion Rate</span></div>
                <div class="detail-stat"><strong>${progressStats.totalEarnedHearts}</strong><span>Hearts Earned</span></div>
                <div class="detail-stat"><strong>${progressStats.totalEarnedHints}</strong><span>Hints Earned</span></div>
            </div>
        </div>
        ${leaderboardEntry ? `
        <div class="detail-stats-section">
            <h4><i class="fas fa-trophy"></i> Leaderboard Entry</h4>
            <div class="detail-stats-grid">
                <div class="detail-stat"><strong>${leaderboardEntry.score}</strong><span>Score</span></div>
                <div class="detail-stat"><strong>${leaderboardEntry.time_seconds}s</strong><span>Time</span></div>
            </div>
        </div>` : ''}
        <div class="detail-stats-section">
            <h4><i class="fas fa-flag-checkered"></i> Quest Mode (MongoDB)</h4>
            <p style="margin:0;color:#cbd5e1;font-size:0.9rem;">Levels cleared: <strong style="color:#ffc107;">${(player.questCompletedLevels && player.questCompletedLevels.length)
        ? escapeHtml(player.questCompletedLevels.join(', '))
        : '—'}</strong></p>
        </div>
        <div class="detail-stats-section">
            <h4><i class="fas fa-book"></i> HTML Modules — quiz (MongoDB)</h4>
            ${(player.moduleQuizzes && player.moduleQuizzes.length)
        ? `<div class="users-table-container" style="padding:0;border:none;"><table class="users-table" style="min-width:auto;"><thead><tr><th>Module</th><th>Score</th><th>Last</th></tr></thead><tbody>
                ${player.moduleQuizzes.map((m) => `<tr>
                    <td>#${m.moduleId}</td>
                    <td>${m.correct}/${m.total} (${Math.round((m.correct / m.total) * 100)}%)</td>
                    <td>${m.completedAt ? new Date(m.completedAt).toLocaleString() : '—'}</td>
                </tr>`).join('')}
            </tbody></table></div>`
        : '<p style="margin:0;color:#8aa0b8;">No module quiz data synced yet.</p>'}
        </div>
    `;
}

function closeUserDetailModal() {
    document.getElementById('userDetailModal').style.display = 'none';
    currentDetailPlayerId = null;
}

// --- Edit Player ---

async function openEditPlayerModal(playerId) {
    const data = await adminFetch(`/api/admin/players/${playerId}`);
    if (!data || !data.player) {
        showNotification('Failed to load player data.', 'error');
        return;
    }

    const p = data.player;
    document.getElementById('editPlayerId').value = p._id;
    document.getElementById('editUsername').value = p.username || '';
    document.getElementById('editEmail').value = p.email || '';
    document.getElementById('editLevel').value = p.level ?? 0;
    document.getElementById('editHearts').value = p.hearts ?? 3;
    document.getElementById('editHints').value = p.hints ?? 1;
    const qEl = document.getElementById('editQuestLevels');
    if (qEl) qEl.value = Array.isArray(p.questCompletedLevels) ? p.questCompletedLevels.join(', ') : '';

    document.getElementById('userDetailModal').style.display = 'none';
    document.getElementById('editPlayerModal').style.display = 'flex';
}

function closeEditPlayerModal() {
    document.getElementById('editPlayerModal').style.display = 'none';
}

async function savePlayerEdit() {
    const id = document.getElementById('editPlayerId').value;
    const body = {
        username: document.getElementById('editUsername').value.trim(),
        email: document.getElementById('editEmail').value.trim(),
        level: Number(document.getElementById('editLevel').value),
        hearts: Number(document.getElementById('editHearts').value),
        hints: Number(document.getElementById('editHints').value)
    };

    const qIn = document.getElementById('editQuestLevels');
    if (qIn) {
        body.questCompletedLevels = qIn.value.trim()
            ? qIn.value.trim().split(/[\s,]+/).map((x) => Number(x)).filter((n) => Number.isFinite(n) && n >= 1)
            : [];
    }

    const result = await adminFetch(`/api/admin/players/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
    });

    if (result && result._id) {
        showNotification('Player updated successfully!', 'success');
        closeEditPlayerModal();
        loadUsersData();
        loadOverviewData();
    } else {
        showNotification(result?.message || 'Failed to update player.', 'error');
    }
}

// --- Delete Player ---

let pendingDeleteId = null;

function openDeleteConfirmModal(playerId) {
    pendingDeleteId = playerId;
    document.getElementById('userDetailModal').style.display = 'none';
    document.getElementById('editPlayerModal').style.display = 'none';

    // Find username from current table
    const nameEl = document.querySelector(`button[onclick="openDeleteConfirmModal('${playerId}')"]`)?.closest('tr')?.querySelector('td strong');
    document.getElementById('deletePlayerName').textContent = nameEl?.textContent || playerId;

    document.getElementById('confirmDeleteBtn').onclick = confirmDeletePlayer;
    document.getElementById('deleteConfirmModal').style.display = 'flex';
}

function closeDeleteConfirmModal() {
    document.getElementById('deleteConfirmModal').style.display = 'none';
    pendingDeleteId = null;
}

async function confirmDeletePlayer() {
    if (!pendingDeleteId) return;

    const result = await adminFetch(`/api/admin/players/${pendingDeleteId}`, { method: 'DELETE' });

    if (result && result.message) {
        showNotification('Player deleted successfully.', 'success');
        closeDeleteConfirmModal();
        loadUsersData();
        loadOverviewData();
    } else {
        showNotification('Failed to delete player.', 'error');
    }
}

// --- Leaderboard ---

async function loadLeaderboardData() {
    const data = await adminFetch('/api/admin/leaderboard?limit=50');
    const tbody = document.getElementById('leaderboardTableBody');
    if (!tbody) return;

    if (!data || !data.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No leaderboard entries yet.</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((entry, i) => {
        const p = entry.player_id || {};
        const rankIcon = i === 0 ? '<i class="fas fa-crown" style="color:#ffd700"></i>' : i === 1 ? '<i class="fas fa-medal" style="color:#c0c0c0"></i>' : i === 2 ? '<i class="fas fa-medal" style="color:#cd7f32"></i>' : `#${i + 1}`;
        return `<tr>
            <td>${rankIcon}</td>
            <td><strong>${escapeHtml(p.username || '—')}</strong></td>
            <td>${escapeHtml(p.email || '—')}</td>
            <td><span class="level-badge">Lv ${p.level ?? 0}</span></td>
            <td>${entry.score ?? 0}</td>
            <td>${entry.time_seconds ?? '—'}</td>
        </tr>`;
    }).join('');
}

// --- Settings ---

function loadSettingsData() {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
        try {
            const settings = JSON.parse(savedSettings);
            const siteTitle = document.getElementById('siteTitle');
            const maxUsers = document.getElementById('maxUsers');
            const passingScore = document.getElementById('passingScore');
            const maxAttempts = document.getElementById('maxAttempts');
            if (siteTitle) siteTitle.value = settings.siteTitle || 'CodeQuest Academy';
            if (maxUsers) maxUsers.value = settings.maxUsers || '1000';
            if (passingScore) passingScore.value = settings.passingScore || '70';
            if (maxAttempts) maxAttempts.value = settings.maxAttempts || '3';
        } catch (e) { console.error('Error loading settings:', e); }
    }
}

function handleLogout() {
    localStorage.removeItem('adminSession');
    sessionStorage.removeItem('adminSession');
    adminToken = null;
    window.location.href = 'admin.html';
}

function saveSettings() {
    const settings = {
        siteTitle: document.getElementById('siteTitle').value,
        maxUsers: document.getElementById('maxUsers').value,
        passingScore: document.getElementById('passingScore').value,
        maxAttempts: document.getElementById('maxAttempts').value,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showNotification('Settings saved successfully!', 'success');
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
        document.getElementById('siteTitle').value = 'CodeQuest Academy';
        document.getElementById('maxUsers').value = '1000';
        document.getElementById('passingScore').value = '70';
        document.getElementById('maxAttempts').value = '3';
        localStorage.removeItem('adminSettings');
        showNotification('Settings reset to defaults!', 'success');
    }
}

// =============================================
// QUESTIONS MANAGEMENT
// =============================================

let cachedQuestLevels = [];
let cachedModuleQuizzes = [];

// Undo state for deleted questions
let lastDeletedQuest = null; // { level, site, index, question }
let lastDeletedModule = null; // { moduleId, index, question }
let lastDeletedMusic = null; // { index, track }

// Pending delete callback for the question delete modal
let pendingDeleteCallback = null;

function openQuestionDeleteModal(title, message, preview, onConfirm) {
    document.getElementById('questionDeleteTitle').textContent = title || 'Confirm Deletion';
    document.getElementById('questionDeleteMessage').textContent = message || 'Are you sure you want to delete this item?';
    document.getElementById('questionDeletePreview').innerHTML = preview || '';
    pendingDeleteCallback = onConfirm;
    document.getElementById('questionDeleteModal').style.display = 'flex';
}

function closeQuestionDeleteModal() {
    document.getElementById('questionDeleteModal').style.display = 'none';
    pendingDeleteCallback = null;
}

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('confirmQuestionDeleteBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            if (typeof pendingDeleteCallback === 'function') {
                pendingDeleteCallback();
            }
            closeQuestionDeleteModal();
        });
    }
});

async function loadQuestionsData() {
    const questData = await adminFetch('/api/game-settings/quest');
    if (questData && !questData.parseError) {
        cachedQuestLevels = questData;
    }
    const moduleData = await adminFetch('/api/game-settings/modules');
    if (moduleData && !moduleData.parseError) {
        cachedModuleQuizzes = moduleData;
    }
}

// --- Quest Questions ---

function loadQuestQuestions() {
    const level = parseInt(document.getElementById('questLevelSelect').value);
    const site = parseInt(document.getElementById('questSiteSelect').value);
    const container = document.getElementById('questQuestionsList');

    const levelData = cachedQuestLevels.find(l => l.level === level);
    if (!levelData || !levelData.sites || !levelData.sites[site]) {
        container.innerHTML = '<p class="no-data">No questions found for this level/site. Add one below.</p>';
        return;
    }

    const questions = levelData.sites[site].questions || [];
    if (!questions.length) {
        container.innerHTML = '<p class="no-data">No questions yet. Click "Add Question" to create one.</p>';
        return;
    }

    renderQuestQuestionsList(questions, container);
}

function renderQuestQuestionsList(questions, container) {
    container.innerHTML = questions.map((q, i) => `
        <div class="question-card" data-index="${i}">
            <div class="question-card-header">
                <span class="question-number">Q${i + 1}</span>
                <div class="question-card-actions">
                    <button class="action-btn edit-btn" onclick="editQuestQuestion(${i})" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteQuestQuestion(${i})" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="question-card-body">
                <div class="question-field">
                    <label>Question (HTML):</label>
                    <textarea class="admin-textarea" data-field="q" rows="3">${escapeHtml(q.q)}</textarea>
                </div>
                <div class="question-field">
                    <label>Answer (string or JSON array):</label>
                    <input type="text" class="admin-input" data-field="a" value="${Array.isArray(q.a) ? escapeHtml(JSON.stringify(q.a)) : escapeHtml(q.a)}">
                </div>
                <div class="question-field">
                    <label>Hint:</label>
                    <input type="text" class="admin-input" data-field="h" value="${escapeHtml(q.h || '')}">
                </div>
            </div>
        </div>
    `).join('');
}

function addQuestQuestion() {
    const level = parseInt(document.getElementById('questLevelSelect').value);
    const site = parseInt(document.getElementById('questSiteSelect').value);

    // Ensure level exists
    let levelData = cachedQuestLevels.find(l => l.level === level);
    if (!levelData) {
        levelData = { level, name: '', sites: {} };
        cachedQuestLevels.push(levelData);
    }
    // Ensure site exists
    if (!levelData.sites[site]) {
        levelData.sites[site] = { questions: [] };
    }

    levelData.sites[site].questions.push({
        q: 'New question...',
        a: 'answer',
        h: 'Hint text'
    });

    loadQuestQuestions();
}

function deleteQuestQuestion(index) {
    const level = parseInt(document.getElementById('questLevelSelect').value);
    const site = parseInt(document.getElementById('questSiteSelect').value);
    const levelData = cachedQuestLevels.find(l => l.level === level);
    if (!levelData || !levelData.sites[site]) return;

    const question = levelData.sites[site].questions[index];
    if (!question) return;

    const preview = `<strong>Q:</strong> ${question.q ? question.q.replace(/<[^>]*>/g, ' ').substring(0, 120) : ''}<br><strong>A:</strong> ${Array.isArray(question.a) ? question.a.join(', ') : question.a}`;
    openQuestionDeleteModal(
        'Delete Quest Question',
        `Delete question #${index + 1} from Level ${level}, Site ${site}?`,
        preview,
        async function() {
            lastDeletedQuest = { level, site, index, question: JSON.parse(JSON.stringify(question)) };
            levelData.sites[site].questions.splice(index, 1);
            loadQuestQuestions();
            showUndoNotification('Quest question deleted.', 'undoDeleteQuestQuestion');

            const result = await adminFetch('/api/game-settings/quest', {
                method: 'PUT',
                body: JSON.stringify({ questLevels: cachedQuestLevels })
            });
            if (result && !result.parseError) {
                cachedQuestLevels = result.questLevels || cachedQuestLevels;
            }
        }
    );
}

async function undoDeleteQuestQuestion() {
    if (!lastDeletedQuest) return;
    const { level, site, index, question } = lastDeletedQuest;
    let levelData = cachedQuestLevels.find(l => l.level === level);
    if (!levelData) {
        levelData = { level, name: '', sites: {} };
        cachedQuestLevels.push(levelData);
    }
    if (!levelData.sites[site]) {
        levelData.sites[site] = { questions: [] };
    }
    levelData.sites[site].questions.splice(index, 0, question);
    lastDeletedQuest = null;
    loadQuestQuestions();

    // Persist undo to MongoDB
    const result = await adminFetch('/api/game-settings/quest', {
        method: 'PUT',
        body: JSON.stringify({ questLevels: cachedQuestLevels })
    });
    if (result && !result.parseError) {
        cachedQuestLevels = result.questLevels || cachedQuestLevels;
        showNotification('Question restored!', 'success');
    }
}

function editQuestQuestion(index) {
    // Read current values from the DOM for this card
    const level = parseInt(document.getElementById('questLevelSelect').value);
    const site = parseInt(document.getElementById('questSiteSelect').value);
    const levelData = cachedQuestLevels.find(l => l.level === level);
    if (!levelData || !levelData.sites[site]) return;

    const card = document.querySelector(`.question-card[data-index="${index}"]`);
    if (!card) return;

    const qVal = card.querySelector('[data-field="q"]').value;
    const aVal = card.querySelector('[data-field="a"]').value;
    const hVal = card.querySelector('[data-field="h"]').value;

    let parsedA;
    try {
        parsedA = JSON.parse(aVal);
        if (!Array.isArray(parsedA)) parsedA = aVal;
    } catch {
        parsedA = aVal;
    }

    levelData.sites[site].questions[index] = { q: qVal, a: parsedA, h: hVal };
    showNotification('Question updated locally. Click Save to persist.', 'info');
}

async function saveQuestQuestions() {
    // Sync all DOM edits first
    const cards = document.querySelectorAll('#questQuestionsList .question-card');
    const level = parseInt(document.getElementById('questLevelSelect').value);
    const site = parseInt(document.getElementById('questSiteSelect').value);
    const levelData = cachedQuestLevels.find(l => l.level === level);
    if (levelData && levelData.sites[site]) {
        cards.forEach((card, i) => {
            if (levelData.sites[site].questions[i]) {
                const qVal = card.querySelector('[data-field="q"]').value;
                const aVal = card.querySelector('[data-field="a"]').value;
                const hVal = card.querySelector('[data-field="h"]').value;
                let parsedA;
                try { parsedA = JSON.parse(aVal); if (!Array.isArray(parsedA)) parsedA = aVal; } catch { parsedA = aVal; }
                levelData.sites[site].questions[i] = { q: qVal, a: parsedA, h: hVal };
            }
        });
    }

    const result = await adminFetch('/api/game-settings/quest', {
        method: 'PUT',
        body: JSON.stringify({ questLevels: cachedQuestLevels })
    });
    if (result && !result.parseError) {
        cachedQuestLevels = result.questLevels || cachedQuestLevels;
        showNotification('Quest questions saved successfully!', 'success');
    } else {
        showNotification('Failed to save quest questions.', 'error');
    }
}

// --- Module Quiz Questions ---

function loadModuleQuestions() {
    const moduleId = parseInt(document.getElementById('moduleSelect').value);
    const container = document.getElementById('moduleQuestionsList');

    const moduleData = cachedModuleQuizzes.find(m => m.moduleId === moduleId);
    if (!moduleData || !moduleData.questions || !moduleData.questions.length) {
        container.innerHTML = '<p class="no-data">No questions found for this module. Add one below.</p>';
        return;
    }

    renderModuleQuestionsList(moduleData.questions, container);
}

function renderModuleQuestionsList(questions, container) {
    container.innerHTML = questions.map((q, i) => `
        <div class="question-card module-question-card" data-index="${i}">
            <div class="question-card-header">
                <span class="question-number">Q${i + 1}</span>
                <div class="question-card-actions">
                    <button class="action-btn edit-btn" onclick="editModuleQuestion(${i})" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteModuleQuestion(${i})" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="question-card-body">
                <div class="question-field">
                    <label>Question:</label>
                    <textarea class="admin-textarea" data-field="question" rows="2">${escapeHtml(q.question)}</textarea>
                </div>
                <div class="question-field">
                    <label>Options (one per line):</label>
                    <textarea class="admin-textarea" data-field="options" rows="4">${(q.options || []).map(o => escapeHtml(o)).join('\n')}</textarea>
                </div>
                <div class="question-field">
                    <label>Correct option index (0-based):</label>
                    <input type="number" class="admin-input" data-field="correct" value="${q.correct}" min="0">
                </div>
                <div class="question-field">
                    <label>Explanation:</label>
                    <input type="text" class="admin-input" data-field="explanation" value="${escapeHtml(q.explanation || '')}">
                </div>
            </div>
        </div>
    `).join('');
}

function addModuleQuestion() {
    const moduleId = parseInt(document.getElementById('moduleSelect').value);

    let moduleData = cachedModuleQuizzes.find(m => m.moduleId === moduleId);
    if (!moduleData) {
        moduleData = { moduleId, title: '', questions: [] };
        cachedModuleQuizzes.push(moduleData);
    }

    moduleData.questions.push({
        question: 'New question...',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 0,
        explanation: 'Answer: <strong>Option A</strong>'
    });

    loadModuleQuestions();
}

function deleteModuleQuestion(index) {
    const moduleId = parseInt(document.getElementById('moduleSelect').value);
    const moduleData = cachedModuleQuizzes.find(m => m.moduleId === moduleId);
    if (!moduleData) return;

    const question = moduleData.questions[index];
    if (!question) return;

    const preview = `<strong>Q:</strong> ${question.question || ''}<br><strong>Options:</strong> ${(question.options || []).join(' | ')}<br><strong>Correct:</strong> ${(question.options || [])[question.correct] || question.correct}`;
    openQuestionDeleteModal(
        'Delete Module Question',
        `Delete question #${index + 1} from Module ${moduleId}?`,
        preview,
        async function() {
            lastDeletedModule = { moduleId, index, question: JSON.parse(JSON.stringify(question)) };
            moduleData.questions.splice(index, 1);
            loadModuleQuestions();
            showUndoNotification('Module question deleted.', 'undoDeleteModuleQuestion');

            const result = await adminFetch('/api/game-settings/modules', {
                method: 'PUT',
                body: JSON.stringify({ moduleQuizzes: cachedModuleQuizzes })
            });
            if (result && !result.parseError) {
                cachedModuleQuizzes = result.moduleQuizzes || cachedModuleQuizzes;
            }
        }
    );
}

async function undoDeleteModuleQuestion() {
    if (!lastDeletedModule) return;
    const { moduleId, index, question } = lastDeletedModule;
    let moduleData = cachedModuleQuizzes.find(m => m.moduleId === moduleId);
    if (!moduleData) {
        moduleData = { moduleId, title: '', questions: [] };
        cachedModuleQuizzes.push(moduleData);
    }
    moduleData.questions.splice(index, 0, question);
    lastDeletedModule = null;
    loadModuleQuestions();

    // Persist undo to MongoDB
    const result = await adminFetch('/api/game-settings/modules', {
        method: 'PUT',
        body: JSON.stringify({ moduleQuizzes: cachedModuleQuizzes })
    });
    if (result && !result.parseError) {
        cachedModuleQuizzes = result.moduleQuizzes || cachedModuleQuizzes;
        showNotification('Module question restored!', 'success');
    }
}

function editModuleQuestion(index) {
    const moduleId = parseInt(document.getElementById('moduleSelect').value);
    const moduleData = cachedModuleQuizzes.find(m => m.moduleId === moduleId);
    if (!moduleData) return;

    const card = document.querySelector(`.module-question-card[data-index="${index}"]`);
    if (!card) return;

    const questionVal = card.querySelector('[data-field="question"]').value;
    const optionsVal = card.querySelector('[data-field="options"]').value.split('\n').filter(s => s.trim());
    const correctVal = parseInt(card.querySelector('[data-field="correct"]').value);
    const explanationVal = card.querySelector('[data-field="explanation"]').value;

    moduleData.questions[index] = {
        question: questionVal,
        options: optionsVal,
        correct: isNaN(correctVal) ? 0 : correctVal,
        explanation: explanationVal
    };
    showNotification('Question updated locally. Click Save to persist.', 'info');
}

async function saveModuleQuestions() {
    // Sync DOM edits first
    const cards = document.querySelectorAll('#moduleQuestionsList .module-question-card');
    const moduleId = parseInt(document.getElementById('moduleSelect').value);
    const moduleData = cachedModuleQuizzes.find(m => m.moduleId === moduleId);
    if (moduleData) {
        cards.forEach((card, i) => {
            if (moduleData.questions[i]) {
                const questionVal = card.querySelector('[data-field="question"]').value;
                const optionsVal = card.querySelector('[data-field="options"]').value.split('\n').filter(s => s.trim());
                const correctVal = parseInt(card.querySelector('[data-field="correct"]').value);
                const explanationVal = card.querySelector('[data-field="explanation"]').value;
                moduleData.questions[i] = {
                    question: questionVal,
                    options: optionsVal,
                    correct: isNaN(correctVal) ? 0 : correctVal,
                    explanation: explanationVal
                };
            }
        });
    }

    const result = await adminFetch('/api/game-settings/modules', {
        method: 'PUT',
        body: JSON.stringify({ moduleQuizzes: cachedModuleQuizzes })
    });
    if (result && !result.parseError) {
        cachedModuleQuizzes = result.moduleQuizzes || cachedModuleQuizzes;
        showNotification('Module questions saved successfully!', 'success');
    } else {
        showNotification('Failed to save module questions.', 'error');
    }
}

// =============================================
// MUSIC MANAGEMENT
// =============================================

let cachedMusicConfig = [];

async function loadMusicData() {
    const data = await adminFetch('/api/game-settings/music');
    if (data && !data.parseError) {
        cachedMusicConfig = data;
        renderMusicConfigList();
    } else {
        document.getElementById('musicConfigList').innerHTML = '<p class="no-data">Failed to load music config.</p>';
    }
}

function renderMusicConfigList() {
    const container = document.getElementById('musicConfigList');
    if (!cachedMusicConfig.length) {
        container.innerHTML = '<p class="no-data">No music tracks configured. Click "Add Music Track" to add one.</p>';
        return;
    }

    container.innerHTML = cachedMusicConfig.map((track, i) => `
        <div class="music-card" data-index="${i}">
            <div class="music-card-header">
                <span class="music-track-number"><i class="fas fa-music"></i> Track ${i + 1}</span>
                <div class="question-card-actions">
                    <button class="action-btn edit-btn" onclick="previewMusicTrack(${i})" title="Preview"><i class="fas fa-play"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteMusicEntry(${i})" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="music-card-body">
                <div class="question-field">
                    <label>Key (e.g. bg1, bg2, bg3):</label>
                    <input type="text" class="admin-input" data-field="key" value="${escapeHtml(track.key)}">
                </div>
                <div class="question-field">
                    <label>Label (display name):</label>
                    <input type="text" class="admin-input" data-field="label" value="${escapeHtml(track.label || '')}">
                </div>
                <div class="question-field">
                    <label>Music File Path (e.g. sound-fx/bg1.mp3):</label>
                    <input type="text" class="admin-input" data-field="file" value="${escapeHtml(track.file)}">
                </div>
                <div class="question-field">
                    <label>Pages (comma-separated, e.g. home.html,learn.html):</label>
                    <input type="text" class="admin-input" data-field="pages" value="${(track.pages || []).map(p => escapeHtml(p)).join(',')}">
                </div>
                <div class="question-field">
                    <label>Default Volume (0–100):</label>
                    <input type="number" class="admin-input" data-field="volume" value="${track.volume ?? 50}" min="0" max="100">
                </div>
            </div>
        </div>
    `).join('');
}

let musicPreviewPlayer = null;

function previewMusicTrack(index) {
    // Read from DOM
    syncMusicCardToCache(index);
    const track = cachedMusicConfig[index];
    if (!track) return;

    if (musicPreviewPlayer) {
        musicPreviewPlayer.pause();
        musicPreviewPlayer = null;
    }
    musicPreviewPlayer = new Audio(track.file);
    musicPreviewPlayer.volume = (track.volume ?? 50) / 100;
    musicPreviewPlayer.loop = true;
    musicPreviewPlayer.play().catch(() => {
        showNotification('Browser blocked autoplay. Click anywhere first.', 'error');
    });
    showNotification(`Playing: ${track.label || track.key}`, 'info');
}

function stopMusicPreview() {
    if (musicPreviewPlayer) {
        musicPreviewPlayer.pause();
        musicPreviewPlayer = null;
    }
}

function addMusicEntry() {
    cachedMusicConfig.push({
        key: 'bg_new',
        label: 'New Track',
        file: 'sound-fx/bg1.mp3',
        pages: [],
        volume: 50
    });
    renderMusicConfigList();
}

function deleteMusicEntry(index) {
    const track = cachedMusicConfig[index];
    if (!track) return;

    const preview = `<strong>Key:</strong> ${track.key}<br><strong>Label:</strong> ${track.label || '—'}<br><strong>File:</strong> ${track.file}<br><strong>Pages:</strong> ${(track.pages || []).join(', ') || '—'}<br><strong>Volume:</strong> ${track.volume ?? 50}`;
    openQuestionDeleteModal(
        'Delete Music Track',
        `Delete music track "${track.label || track.key}"?`,
        preview,
        async function() {
            lastDeletedMusic = { index, track: JSON.parse(JSON.stringify(track)) };
            cachedMusicConfig.splice(index, 1);
            renderMusicConfigList();
            showUndoNotification('Music track deleted.', 'undoDeleteMusicEntry');

            const result = await adminFetch('/api/game-settings/music', {
                method: 'PUT',
                body: JSON.stringify({ musicConfig: cachedMusicConfig })
            });
            if (result && !result.parseError) {
                cachedMusicConfig = result.musicConfig || cachedMusicConfig;
            }
        }
    );
}

async function undoDeleteMusicEntry() {
    if (!lastDeletedMusic) return;
    const { index, track } = lastDeletedMusic;
    cachedMusicConfig.splice(index, 0, track);
    lastDeletedMusic = null;
    renderMusicConfigList();

    // Persist undo to MongoDB
    const result = await adminFetch('/api/game-settings/music', {
        method: 'PUT',
        body: JSON.stringify({ musicConfig: cachedMusicConfig })
    });
    if (result && !result.parseError) {
        cachedMusicConfig = result.musicConfig || cachedMusicConfig;
        showNotification('Music track restored!', 'success');
    }
}

function syncMusicCardToCache(index) {
    const card = document.querySelector(`.music-card[data-index="${index}"]`);
    if (!card || !cachedMusicConfig[index]) return;
    cachedMusicConfig[index].key = card.querySelector('[data-field="key"]').value;
    cachedMusicConfig[index].label = card.querySelector('[data-field="label"]').value;
    cachedMusicConfig[index].file = card.querySelector('[data-field="file"]').value;
    cachedMusicConfig[index].pages = card.querySelector('[data-field="pages"]').value.split(',').map(s => s.trim()).filter(Boolean);
    cachedMusicConfig[index].volume = parseInt(card.querySelector('[data-field="volume"]').value) || 50;
}

async function saveMusicConfig() {
    // Sync all DOM edits to cache
    document.querySelectorAll('.music-card').forEach((card, i) => {
        syncMusicCardToCache(i);
    });

    const result = await adminFetch('/api/game-settings/music', {
        method: 'PUT',
        body: JSON.stringify({ musicConfig: cachedMusicConfig })
    });
    if (result && !result.parseError) {
        cachedMusicConfig = result.musicConfig || cachedMusicConfig;
        showNotification('Music config saved successfully!', 'success');
    } else {
        showNotification('Failed to save music config.', 'error');
    }
}

// --- Utilities ---

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    const iconMap = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
    notification.innerHTML = `<i class="fas fa-${iconMap[type] || 'info-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    }, 3000);
}

function showUndoNotification(message, undoFnName) {
    const notification = document.createElement('div');
    notification.className = 'admin-notification info undo-notification';
    notification.innerHTML = `
        <i class="fas fa-trash"></i>
        <span>${message}</span>
        <button class="undo-btn" onclick="${undoFnName}(); this.closest('.undo-notification').remove();">Undo</button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    }, 8000);
}
