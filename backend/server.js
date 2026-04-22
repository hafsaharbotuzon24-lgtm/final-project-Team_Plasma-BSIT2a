require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();
const { setServers } = require('dns');

connectDB();

app.use(helmet());

app.use(cors({
  origin: "*",
  credentials: true
}));


app.use(express.json());

// Global XSS sanitization middleware
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    const sanitizeObject = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = xss(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      }
    };
    sanitizeObject(req.body);
  }
  next();
});

// Rate limiting middleware - Auth endpoints (strict: 5 requests per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login/register attempts, please try again later',
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

// Rate limiting middleware - General API (moderate: 100 requests per 15 minutes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply auth rate limiter to auth routes
app.use('/api/auth', authLimiter);

app.use('/api/players', apiLimiter, require('./routes/playerRoutes'));
app.use('/api/battles', apiLimiter, require('./routes/battleRoutes'));
app.use('/api/attempts', apiLimiter, require('./routes/attemptRoutes'));
app.use('/api/paths', apiLimiter, require('./routes/pathRoutes'));
app.use('/api/rooms', apiLimiter, require('./routes/roomRoutes'));
app.use('/api/enemies', apiLimiter, require('./routes/enemyRoutes'));
app.use('/api/bosses', apiLimiter, require('./routes/bossRoutes'));
app.use('/api/progress', apiLimiter, require('./routes/progressRoutes'));
app.use('/api/leaderboard', apiLimiter, require('./routes/leaderboardRoutes'));
app.use('/api/hints', apiLimiter, require('./routes/hintRoutes'));
app.use('/api/hearts', apiLimiter, require('./routes/heartRoutes'));
app.use('/api/chests', apiLimiter, require('./routes/chestRoutes'));
app.use('/api/final-battle', apiLimiter, require('./routes/finalBattleRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});