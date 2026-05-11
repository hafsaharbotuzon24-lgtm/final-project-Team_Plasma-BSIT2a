// leaderboard-logic.js - Complete updated version
document.addEventListener("DOMContentLoaded", () => {
    initLeaderboard();
});

var API_BASE = window.API_BASE || window.API_BASE_URL || 'http://localhost:5000';

async function initLeaderboard() {
    const adventureEl = document.getElementById('leaderboard-content');
    const questEl = document.getElementById('quest-leaderboard-content');
    if (!adventureEl && !questEl) return;

    const emptyMsg = '<div class="text-center py-4 text-warning">Login first to view leaderboard.</div>';

    if (adventureEl) adventureEl.innerHTML = '';
    if (questEl) questEl.innerHTML = '';

    const token = localStorage.getItem('authToken');

    if (!token) {
        if (adventureEl) adventureEl.innerHTML = emptyMsg;
        if (questEl) questEl.innerHTML = emptyMsg;
        return;
    }

    const currentPlayerId = localStorage.getItem('playerId');

    // Fetch adventure leaderboard (includes unranked players)
    if (adventureEl) {
        try {
            const response = await fetch(`${API_BASE}/api/leaderboard/adventure`, {
                headers: { Authorization: `Bearer ${token}` },
                credentials: 'include'
            });

            const board = await response.json();
            if (!response.ok) {
                throw new Error(board.message || 'Unable to fetch leaderboard');
            }

            const players = Array.isArray(board) ? board : [];
            renderAdventurePlayers(adventureEl, players, currentPlayerId);
        } catch (err) {
            adventureEl.innerHTML = `<div class="text-center py-4 text-danger">${escapeHtml(err.message)}</div>`;
        }
    }

    // Fetch quest leaderboard
    if (questEl) {
        try {
            const response = await fetch(`${API_BASE}/api/leaderboard/quest`, {
                headers: { Authorization: `Bearer ${token}` },
                credentials: 'include'
            });

            const questBoard = await response.json();
            if (!response.ok) {
                throw new Error(questBoard.message || 'Unable to fetch quest leaderboard');
            }

            const questPlayers = Array.isArray(questBoard) ? questBoard : [];
            renderQuestPlayers(questEl, questPlayers, currentPlayerId);
        } catch (err) {
            questEl.innerHTML = `<div class="text-center py-4 text-danger">${escapeHtml(err.message)}</div>`;
        }
    }
}

function rankBadgeUrls(rank) {
    let rankImgSrc = 'img/standardRank.png';
    let rankAlt = `#${rank}`;
    if (rank === 1) {
        rankImgSrc = 'img/rank1.png';
        rankAlt = 'Rank 1';
    } else if (rank === 2) {
        rankImgSrc = 'img/rank2.png';
        rankAlt = 'Rank 2';
    } else if (rank === 3) {
        rankImgSrc = 'img/rank3.png';
        rankAlt = 'Rank 3';
    }
    return { rankImgSrc, rankAlt };
}

function renderAdventurePlayers(container, players, currentPlayerId) {
    if (players.length === 0) {
        container.innerHTML = '<div class="text-center py-4 text-muted">No players found.</div>';
        return;
    }

    players.forEach((player, index) => {
        const rank = index + 1;
        const row = document.createElement('div');
        row.className = 'lb-row lb-player-row';

        if (String(player._id) === String(currentPlayerId)) {
            row.classList.add('current-player-row');
            row.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
            row.style.border = '1px solid gold';
        }

        const hasTime = player.hasTime !== false && player.time > 0;
        let scoreDisplay;
        if (hasTime) {
            const minutes = Math.floor(player.time / 60);
            const seconds = player.time % 60;
            scoreDisplay = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else {
            scoreDisplay = '<span style="color:#64748b;">— no time —</span>';
            row.style.opacity = '0.7';
        }

        const { rankImgSrc, rankAlt } = rankBadgeUrls(rank);

        row.innerHTML = `
            <span class="lb-col-rank lb-col-rank-img-wrap">
              <span class="lb-rank-num">${rank}</span>
              <img class="lb-rank-img" src="${rankImgSrc}" alt="${rankAlt}" width="48" height="48" loading="lazy">
            </span>
            <span class="lb-col-name text-uppercase">${escapeHtml(player.username)}</span>
            <span class="lb-col-score text-warning fw-bold">${scoreDisplay}</span>
        `;

        container.appendChild(row);
    });
}

function renderQuestPlayers(container, players, currentPlayerId) {
    if (players.length === 0) {
        container.innerHTML = '<div class="text-center py-4 text-muted">No players found.</div>';
        return;
    }

    players.forEach((player, index) => {
        const rank = index + 1;
        const row = document.createElement('div');
        row.className = 'lb-row lb-player-row';

        if (String(player._id) === String(currentPlayerId)) {
            row.classList.add('current-player-row');
            row.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
            row.style.border = '1px solid gold';
        }

        const { rankImgSrc, rankAlt } = rankBadgeUrls(rank);
        const hasLevels = player.completedLevels > 0;

        let scoreDisplay;
        if (hasLevels) {
            scoreDisplay = `🏆 ${player.completedLevels} level${player.completedLevels !== 1 ? 's' : ''}`;
        } else {
            scoreDisplay = '<span style="color:#64748b;">— 0 levels —</span>';
            row.style.opacity = '0.7';
        }

        row.innerHTML = `
            <span class="lb-col-rank lb-col-rank-img-wrap">
              <span class="lb-rank-num">${rank}</span>
              <img class="lb-rank-img" src="${rankImgSrc}" alt="${rankAlt}" width="48" height="48" loading="lazy">
            </span>
            <span class="lb-col-name text-uppercase">${escapeHtml(player.username)}</span>
            <span class="lb-col-score text-warning fw-bold">${scoreDisplay}</span>
        `;

        container.appendChild(row);
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function submitGameCompletionTime(timeSeconds) {
    const token = localStorage.getItem('authToken');
    const playerName = localStorage.getItem('playerUserName') || 'CombatCoder_01';
    const playerEmail = localStorage.getItem('playerEmail') || 'player@plasma.com';
    const playerId = localStorage.getItem('playerId');

    console.log('Submitting to leaderboard:', { playerId, playerName, timeSeconds, hasToken: !!token });

    if (!token) {
        console.error('No auth token, cannot submit time');
        return false;
    }

    if (!timeSeconds || timeSeconds <= 0) {
        console.error('Invalid time:', timeSeconds);
        return false;
    }

    try {
        const response = await fetch(`${API_BASE}/api/leaderboard/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                time_seconds: Number(timeSeconds),
                score: Number(timeSeconds)
            })
        });

        const data = await response.json();
        console.log('Leaderboard submit response:', response.status, data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to submit time');
        }

        console.log('Time submitted successfully:', timeSeconds, 'seconds');
        return true;
    } catch (err) {
        console.error('Error submitting time:', err);
        return false;
    }
}
