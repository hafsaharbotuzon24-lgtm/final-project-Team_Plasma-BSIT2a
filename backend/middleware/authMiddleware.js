const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Player = require('../models/Player');

const protect = async (req, res, next) => {
  try {
    const authHeader = String(req.headers.authorization || '');
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token is empty' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const player = await Player.findById(decoded.id).select('_id username email level');

    if (!player) {
      return res.status(401).json({ message: 'Not authorized, player not found' });
    }

    req.player = {
      id: String(player._id),
      username: player.username,
      email: player.email,
      level: player.level
    };

    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Not authorized, token expired' });
    }
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    message: errors.array()[0].msg,
    errors: errors.array()
  });
};

module.exports = {
  protect,
  handleValidationErrors
};
