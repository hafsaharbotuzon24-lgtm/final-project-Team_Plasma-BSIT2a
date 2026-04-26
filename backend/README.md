# ⚔️ Combat Coders Backend

This is the backend server for the **Combat Coders Game**, built using **Node.js, Express.js, and MongoDB**. It handles authentication, game logic, player progress, and data storage.

---

# TECH STACK

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt (password hashing)

---

# Features:

* JWT Authentication (Login/Register)
* Player management
* Battle system
* Attempt checking (game logic)
* Progress tracking
* Leaderboard system
* Hint & Heart system
* Response compression + response-time headers
* Short-lived response caching for GET APIs
* Query tuning with selective population and indexes

## Folder Structure:

```
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
├── seed.js
└── server.js
```

---

# API ROUTES

## Authentication
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/auth/register           | Register user        |
| POST   | /api/auth/login              | Login user           |

## Attempts
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/attempts                | Submit Attempt       |

## Players
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/players                 | Create Player        |
| GET    | /api/players                 | Get all Player       |
| GET    | /api/players/me              | Get My Player        |
| GET    | /api/players/:id             | Get a Player         |
| PUT    | /api/players/:id             | Update Player        |

## Battles
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/battles                 | Create Battle        |
| GET    | /api/players/:id             | Get Battles          |

## Bosses
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/bosses                  | Create Boss          |
| GET    | /api/bosses/:id              | Get Boss             |

## Chests
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/chests                  | Create Chest         |
| GET    | /api/chests/path/:pathId     | Get Chest by Path    |
| GET    | /api/chests/:id              | Get Chest            |

## Enemy
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/enemies                 | Create Enemy         |
| GET    | /api/enemies/battle/:battleId| Get Enemies by Battle    |

## Final Battle
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/final-battle                | Create Final Battle         |
| GET    | /api/final-battle/battle/:battleId| Get Final Battle    |

## Hearts
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| GET   | /api/hearts/enemy/:enemyId          | Get Heart Rewards         |

## Hints
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| GET   | /api/hints/chest/:chestId             | Get Hints by Chest         |

## Leaderboard
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| GET    | /api/leaderboard     | Get Leaderboard    |

## Paths
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/paths                  | Create Path         |
| GET    | /api/paths    | Get Path    |

## Progress
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/progress                  | Create Progress        |
| GET    | /api/progress/player/:playerId     | Get Progress by Player    |

---

# CURRENT MODELS

| Model        | Description                          |
|--------------|--------------------------------------|
| Player       | Stores player accounts and stats     |
| Battle       | Game challenges or questions         |
| Attempt      | Player answers per battle            |
| Path         | Sequence of game rooms               |
| Room         | Individual game stage                |
| Enemy        | Basic opponents in rooms             |
| Boss         | Strong enemy at level end            |
| FinalBattle  | Main endgame challenge               |
| Chest        | Rewards container                   |
| Progress     | Player game advancement              |
| Leaderboard  | Player rankings by score             |
| Hint         | Clues for battles                   |
| Heart        | Player life system                  |

---

# DATABASE CONNECTION SETUP

## 📁 `/config/db.js`

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

```
MONGO_URI=mongodb_connection_string
JWT_SECRET=secret_key
PORT=5000
```

---

# HOW TO RUN THE SERVER LOCALLY

## 1. Install dependencies

```
npm install
```

## 2. Start the server

```
npm run dev
```
---

## 3. Measure API performance quickly

Run a simple benchmark (warmup + repeated requests):

```
npm run benchmark
```

Optional environment variables:

```
BENCH_BASE_URL=http://127.0.0.1:5000
BENCH_ENDPOINTS=/api,/api/leaderboard
BENCH_ITERATIONS=40
BENCH_WARMUP=8
BENCH_BEARER_TOKEN=your_jwt_token
```

The benchmark prints average, p95, min/max latency, plus cache HIT/MISS counts.
---

## Server will run on:

```
http://localhost:5000
```

---

# TEAM PLASMA

<p align="left">
  <img src="https://github.com/user-attachments/assets/cad78808-049c-447f-a4f3-d21918007390" alt="combatcoders-logo" width="20%" height="auto" />
</p>

Combat Coders Project (BSIT-2A)

---
