// leaderboard-logic.js - Complete updated version
document.addEventListener("DOMContentLoaded", () => {
    initLeaderboard();
});

const API_BASE = window.API_BASE_URL || 'http://localhost:5000';

async function initLeaderboard() {
    const container = document.getElementById('leaderboard-content');
    if (!container) return;
    
    container.innerHTML = "";

    const token = localStorage.getItem('authToken');

    if (!token) {
        container.innerHTML = '<div class="text-center py-4 text-warning">Login first to view leaderboard.</div>';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/leaderboard`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include'
        });

        const board = await response.json();
        if (!response.ok) {
            throw new Error(board.message || 'Unable to fetch leaderboard');
        }

        const currentPlayerId = localStorage.getItem('playerId');
        
        // Sort by time (lower is better)
        const players = (Array.isArray(board) ? board : [])
            .map((entry) => ({
                name: entry.player_id?.username || entry.username || 'Unknown Player',
                time: Number(entry.time_seconds) || Number(entry.score) || 999999,
                playerId: entry.player_id?.id || entry.player_id
            }))
            .filter(p => p.time > 0 && p.time < 999999);

        players.sort((a, b) => a.time - b.time);
        renderPlayers(container, players, currentPlayerId);
    } catch (err) {
        container.innerHTML = `<div class="text-center py-4 text-danger">${err.message}</div>`;
    }
}

function renderPlayers(container, players, currentPlayerId) {
    if (players.length === 0) {
        container.innerHTML = '<div class="text-center py-4 text-muted">No times recorded yet. Complete the game to appear on leaderboard!</div>';
        return;
    }

    players.forEach((player, index) => {
        const rank = index + 1;
        const row = document.createElement('div');
        row.className = 'lb-row lb-player-row';
        
        if (player.playerId === currentPlayerId) {
            row.classList.add('current-player-row');
            row.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
            row.style.border = '1px solid gold';
        }

        const minutes = Math.floor(player.time / 60);
        const seconds = player.time % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        let rankDisplay = rank;
        if (rank === 1) rankDisplay = "🥇";
        else if (rank === 2) rankDisplay = "🥈";
        else if (rank === 3) rankDisplay = "🥉";

        row.innerHTML = `
            <span class="lb-col-rank">${rankDisplay}</span>
            <span class="lb-col-name text-uppercase">${escapeHtml(player.name)}</span>
            <span class="lb-col-score text-warning fw-bold">⏱️ ${formattedTime}</span>
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

    if (!token) {
        console.log('No auth token, cannot submit time');
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
                player_id: playerId,
                username: playerName,
                email: playerEmail,
                time_seconds: timeSeconds,
                score: timeSeconds
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit time');
        }
        
        console.log('Time submitted successfully:', timeSeconds, 'seconds');
        return true;
    } catch (err) {
        console.error('Error submitting time:', err);
        return false;
    }
}