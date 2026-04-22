# ⚔️ Combat Coders Frontend

This document explains the implemented frontend features and how they map to the project use case and ERD.

---

## Frontend Implementation

The frontend is built using static pages (`HTML`), styling (`CSS` + `Bootstrap`), and client-side logic (`JavaScript`).

### 1) Authentication and Session Handling
- Login and registration UI are implemented in `login.html` with logic in `js/login.js`.
- The frontend calls backend authentication endpoints:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/google`
- On successful login, token and basic player identity are saved in `localStorage` (`authToken`, `userName`, `userEmail`).
- Basic validation and error handling are shown through modals.

### 2) Game Navigation and Core Flow
- Main menu and page navigation are handled in `js/script.js`.
- Game progression UI is centered in `play.html` with flow logic in `js/level1-logic.js`.
- The player moves through event cards (`chest`, `room`, `battle`, `boss`) based on current site/state.
- Character choice is read from `localStorage` and applied during gameplay.

### 3) Battle and Question Mechanics
- Battle UI and logic are implemented in `js/battle1-logic.js`.
- Question prompts, answer checking, hint display, and heart reduction are implemented on the frontend.
- Regular battles and boss battles are handled with different target win conditions.
- Win/lose state modals and retry flow are included.

### 4) Rewards and Resource UI
- Chest and room rewards are implemented in `js/chest1-logic.js` and `js/room1-logic.js`.
- Reward events update resource counters in the UI:
  - Chest: `+1 hint`
  - Room: `+1 heart`
- Resource values are reflected immediately through status updates.

### 5) Leaderboard Integration
- Leaderboard page (`leaderboard.html`) fetches and renders ranking data via `js/leaderboard-logic.js`.
- Uses authenticated requests (`Bearer` token from `localStorage`) to call:
  - `GET /api/leaderboard`
- Entries are sorted by score and displayed with rank formatting.

### 6) UX and Settings
- Shared styles are consolidated in `css/style.css`.
- Audio preference controls (SFX/Music) are persisted in `localStorage`.
- Profile overlay controls and quality-of-life interactions (scroll-to-top, transitions) are implemented.

---

## Alignment With Use Case and ERD

The frontend implementation aligns with the game system use case by covering the main user actions and by consuming backend APIs that correspond to ERD entities.

### Use Case to Frontend Mapping
- **Register/Login Player**
  - Implemented through auth modals and API calls in `js/login.js`.
- **Play Through Game Events**
  - Implemented in `js/level1-logic.js` using site-based event progression.
- **Answer Coding Challenges**
  - Implemented in `js/battle1-logic.js` with battle questions and answer checking.
- **Gain Rewards (Hints/Hearts)**
  - Implemented in reward modals and resource updates (`js/chest1-logic.js`, `js/room1-logic.js`).
- **View Leaderboard**
  - Implemented in `js/leaderboard-logic.js` with live API fetch and rendering.

### ERD Entity Alignment (Frontend Perspective)
- **Player**
  - Represented by login/register identity and local session state.
- **Progress**
  - Frontend game-site progression and state transitions model player advancement.
- **Battle / Attempt / Enemy / Boss / FinalBattle**
  - Frontend battle screens, answer submission behavior, and win/lose conditions mirror combat entities.
- **Chest / Room / Hint / Heart**
  - Reward event screens and counters directly represent these resource entities.
- **Leaderboard**
  - Dedicated leaderboard page renders score-based ranking from backend data.
- **Path**
  - Card progression logic maps to path-based movement through game sites.

## Current Scope Notes

- Frontend currently includes end-to-end UI flow for auth, gameplay events, and leaderboard viewing.
- Some account-recovery UI is present, but password reset API integration is marked as pending backend support.
- API host is configurable through `window.API_BASE_URL` (fallback: `http://localhost:5000`).

---
### TEAM PLASMA

<p align="left">
  <img src="https://github.com/user-attachments/assets/cad78808-049c-447f-a4f3-d21918007390" alt="combatcoders-logo" width="20%" height="auto" />
</p>

Combat Coders Project (BSIT-2A)
---
