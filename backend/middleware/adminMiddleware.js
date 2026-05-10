const jwt = require('jsonwebtoken');
const Player = require('../models/Player');

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;

const adminProtect = async (req, res, next) => {
  try {
    const authHeader = String(req.headers.authorization || '');
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token is empty' });
    }

    const decoded = jwt.verify(token, ADMIN_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    req.admin = {
      id: decoded.id,
      username: decoded.username,
      role: 'admin'
    };

    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Not authorized, token expired' });
    }
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { adminProtect };
