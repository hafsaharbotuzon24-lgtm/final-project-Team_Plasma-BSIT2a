const Player = require('../models/Player');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client();

function signToken(playerId) {
  return jwt.sign({ id: playerId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // Sanitize inputs to prevent XSS
    username = xss(username);
    email = xss(email);

    // Check if email already exists
    const existingUser = await Player.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password and create player
    const hashedPassword = await bcrypt.hash(password, 10);

    const player = await Player.create({
      username,
      email,
      password: hashedPassword
    });

    const token = signToken(player._id);
    const safePlayer = player.toObject();
    delete safePlayer.password;
    res.status(201).json({ message: "User registered successfully", token, player: safePlayer });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { identifier, password } = req.body;
    identifier = xss(identifier);

    const isEmail = identifier.includes('@');
    const query = isEmail ? { email: identifier.toLowerCase() } : { username: identifier };

    const player = await Player.findOne(query);
    if (!player) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = signToken(player._id);

    const safePlayer = player.toObject();
    delete safePlayer.password;
    res.json({ token, player: safePlayer });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ message: 'GOOGLE_CLIENT_ID is not configured on the server' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const emailVerified = payload?.email_verified;
    const name = payload?.name;

    if (!email || !emailVerified) {
      return res.status(400).json({ message: 'Google email is not verified' });
    }

    const safeUsernameBase = String(name || email.split('@')[0] || 'player')
      .trim()
      .slice(0, 20)
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    let player = await Player.findOne({ email: email.toLowerCase() });
    if (!player) {
      // Ensure unique username
      let username = safeUsernameBase || 'player';
      let attempt = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // try a few variations
        const candidate = attempt === 0 ? username : `${username}_${attempt}`;
        // eslint-disable-next-line no-await-in-loop
        const exists = await Player.findOne({ username: candidate });
        if (!exists) {
          username = candidate;
          break;
        }
        attempt += 1;
        if (attempt > 50) {
          return res.status(500).json({ message: 'Unable to allocate username' });
        }
      }

      const randomPassword = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      player = await Player.create({
        username,
        email: email.toLowerCase(),
        password: hashedPassword
      });
    }

    const token = signToken(player._id);
    const safePlayer = player.toObject();
    delete safePlayer.password;
    res.json({ token, player: safePlayer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};