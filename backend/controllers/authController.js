const Player = require('../models/Player');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Player.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const player = await Player.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json(player);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const player = await Player.findOne({ email });
    if (!player) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: player._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, player });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};