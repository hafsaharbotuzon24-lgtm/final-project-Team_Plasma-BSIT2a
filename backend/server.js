require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const { setServers } = require('dns');

connectDB();

app.use(cors({
  origin: "*",
  credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/players', require('./routes/playerRoutes'));
app.use('/api/battles', require('./routes/battleRoutes'));
app.use('/api/attempts', require('./routes/attemptRoutes'));
app.use('/api/paths', require('./routes/pathRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/enemies', require('./routes/enemyRoutes'));
app.use('/api/bosses', require('./routes/bossRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));
app.use('/api/hints', require('./routes/hintRoutes'));
app.use('/api/hearts', require('./routes/heartRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});