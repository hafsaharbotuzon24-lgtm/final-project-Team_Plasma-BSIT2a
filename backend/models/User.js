const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hearts: {
    type: Number,
    default: 3
  },
  hints: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);