# ⚔️ Combat Coders Backend

This is the backend server for the **Combat Coders Game**, built using **Node.js, Express.js, and MongoDB**. It handles authentication, game logic, player progress, and data storage.

---

# Features:

* JWT Authentication (Login/Register)
* Player management
* Battle system
* Attempt checking (game logic)
* Progress tracking
* Leaderboard system
* Hint & Heart system

## Folder Structure:

/backend 
├── /config 
│   └── db.js 
├── /controllers 
│    ├── attemptController.js
│    ├── authController.js 
│    ├── battleController.js
│    ├── bossController.js 
│    ├── chestController.js
│    ├── enemyController.js 
│    ├── finalBattleController.js 
│    ├── heartController.js 
│    ├── hintController.js 
│    ├── leaderboardController.js 
│    ├── pathController.js 
│    ├── playerController.js 
│    ├── progressController.js 
│    └── roomController.js 
├── /middleware
│    └── authMiddleware.js 
├── /models 
│    ├── Attempt.js 
│    ├── Battle.js 
│    ├── Boss.js 
│    ├── Chest.js 
│    ├── Enemy.js 
│    ├── FinalBattle.js 
│    ├── Heart.js 
│    ├── Hint.js 
│    ├── Leaderboard.js 
│    ├── Path.js 
│    ├── Player.js 
│    ├── Progress.js 
│    └── Room.js 
├── /routes 
│    ├── authRoutes.js 
│    ├── playerRoutes.js 
│    ├── battleRoutes.js 
│    ├── attemptRoutes.js 
│    ├── pathRoutes.js 
│    ├── roomRoutes.js 
│    ├── enemyRoutes.js 
│    ├── bossRoutes.js 
│    ├── progressRoutes.js 
│    ├── leaderboardRoutes.js 
│    ├── hintRoutes.js 
│    └── heartRoutes.js 
├── .env
├── .gitignore
├── package-lock.json 
├── package.json 
└── server.js

---

# API ROUTES

## Authentication 
| POST | /api/auth/register |
| POST | /api/auth/login |

## Player

| GET    /api/players |
| GET    /api/players/:id |
| PUT    /api/players/:id |

## Battles

| POST   /api/battles |
| GET    /api/battles/player/:playerId |

## Attempts (Gameplay)

| POST   /api/attempts |

## Paths & Rooms

| GET    /api/paths |
| POST   /api/paths |

| GET    /api/rooms/path/:pathId |
| POST   /api/rooms |

## Enemies & Boss

| POST   /api/enemies |
| GET    /api/enemies/battle/:battleId |

| POST   /api/bosses |
| GET    /api/bosses/:id |

## Progress

| POST   /api/progress |
| GET    /api/progress/player/:playerId |

## Leaderboard

| GET    /api/leaderboard |

## Hint System

| GET    /api/hints/chest/:chestId |

## Heart System

| GET |   /api/hearts/enemy/:enemyId |

---

# CURRENT MODELS

* Player
* Battle
* Attempt
* Path
* Room
* Enemy
* Boss
* FinalBattle
* Chest
* Progress
* Leaderboard
* Hint
* Heart

---

# DATABASE CONNECTION SETUP

## 📁 `/config/db.js`

Handles MongoDB connection using Mongoose.

```js
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

module.exports = connectDB;
```

---

## 📁 `.env`

Create a `.env` file in `/backend`:

```
MONGO_URI=mongodb_connection_string
JWT_SECRET=secret_key
PORT=5000
```

---

# ▶️ HOW TO RUN THE SERVER LOCALLY

## 1. Install dependencies

```
npm install
```

## 2. Start the server

```
npm run dev
```

or

```
node server.js
```

---

## 🌐 Server will run on:

```
http://localhost:5000
```

---

# ⚠️ NOTES

* If you see `Cannot GET /`, it is normal (no root route defined)
* Make sure MongoDB is connected before testing routes
* Use Postman or frontend to test API endpoints
* Protected routes require JWT token:

```
Authorization: Bearer <token>
```

---

# 🎮 PROJECT FLOW

```
Frontend → Express API → MongoDB
```

* Frontend sends requests
* Backend handles logic and authentication
* MongoDB stores game data

---

# 🛠️ TECH STACK

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt (password hashing)

---

# 🔥 FUTURE IMPROVEMENTS

* Code execution engine (coding challenges)
* Multiplayer battles
* Real-time leaderboard
* React frontend integration

---

# 👨‍💻 AUTHOR

Combat Coders Project (BSIT)

---
