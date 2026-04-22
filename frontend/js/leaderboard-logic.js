document.addEventListener("DOMContentLoaded", () => {
    initLeaderboard();
});

const API_BASE = window.API_BASE_URL || 'http://localhost:5000';

async function initLeaderboard() {
    const container = document.getElementById('leaderboard-content');
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

        const players = (Array.isArray(board) ? board : []).map((entry) => ({
            name: entry.player_id?.username || 'Unknown Player',
            score: Number(entry.score) || 0
        }));

        players.sort((a, b) => b.score - a.score);
        renderPlayers(container, players);
    } catch (err) {
        container.innerHTML = `<div class="text-center py-4 text-danger">${err.message}</div>`;
    }
}

function renderPlayers(container, players) {
    players.forEach((player, index) => {
        const rank = index + 1;
        const row = document.createElement('div');
        row.className = 'lb-row lb-player-row';

        // Add medal emojis for the top 3
        let rankDisplay = rank;
        if (rank === 1) rankDisplay = "🥇";
        else if (rank === 2) rankDisplay = "🥈";
        else if (rank === 3) rankDisplay = "🥉";

        row.innerHTML = `
            <span class="lb-col-rank">${rankDisplay}</span>
            <span class="lb-col-name text-uppercase">${player.name}</span>
            <span class="lb-col-score text-success fw-bold">${player.score.toLocaleString()}</span>
        `;
        
        container.appendChild(row);
    });
}