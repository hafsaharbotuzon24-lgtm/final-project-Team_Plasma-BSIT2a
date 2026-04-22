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

// If deployed behind a proxy (Render/Heroku/Nginx), this makes req.ip accurate.
if (process.env.NODE_ENV === 'production' || String(process.env.TRUST_PROXY || '').toLowerCase() === 'true') {
  app.set('trust proxy', 1);
}

app.use(helmet());

const allowedOrigins = (process.env.FRONTEND_URLS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

const corsOrigins = allowedOrigins.length ? allowedOrigins : defaultOrigins;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests without browser origin header (Postman/cURL).
    if (!origin) return callback(null, true);
    try {
      const url = new URL(origin);
      const isLocalhost =
        url.hostname === 'localhost' ||
        url.hostname === '127.0.0.1' ||
        url.hostname === '[::1]';

      // Dev-friendly: allow any local port. Production should use FRONTEND_URLS.
      if (isLocalhost) return callback(null, true);
    } catch (_) {
      // ignore parse errors and fall back to explicit allowlist
    }

    if (corsOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true
}));

// Return a clear error when CORS blocks a request
app.use((err, req, res, next) => {
  if (err && String(err.message || '').startsWith('Not allowed by CORS')) {
    return res.status(403).json({ message: err.message });
  }
  next(err);
});


app.use(express.json());

// Basic health routes (so opening http://127.0.0.1:5000 doesn't show "Cannot GET /")
app.get('/', (req, res) => {
  res.status(200).send('Combat Coders backend is running. Try /api/auth or other /api routes.');
});

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Combat Coders API is running',
    timestamp: new Date().toISOString()
  });
});

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
  max: Number(
    process.env.AUTH_RATE_LIMIT_MAX ??
    (process.env.NODE_ENV === 'production' ? 20 : 200)
  ),
  message: 'Too many login/register attempts, please try again later',
  // Avoid locking out users due to normal successful flows (e.g. register -> login).
  skipSuccessfulRequests: true,
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

// His sir hehe
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