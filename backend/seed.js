require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();
const mongoose = require("mongoose");

const { setServers } = require('dns');

// Models
const Player = require("./models/Player");
const Path = require("./models/Path");
const Room = require("./models/Room");
const Battle = require("./models/Battle");
const Attempt = require("./models/Attempt");
const Enemy = require("./models/Enemy");
const Chest = require("./models/Chest");
const Hint = require("./models/Hint");
const Heart = require("./models/Heart");
const FinalBattle = require("./models/FinalBattle");
const Boss = require("./models/Boss");
const Progress = require("./models/Progress");
const Leaderboard = require("./models/Leaderboard");

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // CLEAR DATABASE
    await Promise.all([
      Player.deleteMany(),
      Path.deleteMany(),
      Room.deleteMany(),
      Battle.deleteMany(),
      Attempt.deleteMany(),
      Enemy.deleteMany(),
      Chest.deleteMany(),
      Hint.deleteMany(),
      Heart.deleteMany(),
      FinalBattle.deleteMany(),
      Boss.deleteMany(),
      Progress.deleteMany(),
      Leaderboard.deleteMany()
    ]);

    console.log("Database cleared");

    // PLAYER
    const player = await Player.create({
      username: "testplayer",
      email: "test@test.com",
      password: "hashedpassword123",
      hearts: 3,
      hints: 1,
      level: 1
    });

    // PATH
    const path = await Path.create({
      path_name: "Beginner Path",
      difficulty_level: 1,
      player_id: player._id
    });

    // ROOM
    const room = await Room.create({
      path_id: path._id,
      storyline: "You enter the debugging dungeon..."
    });

    // BATTLE
    const battle = await Battle.create({
      player_id: player._id,
      path_id: path._id,
      description: "console.log battle",
      reward_hearts: 1,
      reward_hints: 1
    });

    // ENEMY
    const enemy = await Enemy.create({
      battle_id: battle._id,
      enemy_name: "Syntax Bug",
      enemy_health: 100
    });

    // HEART (reward system)
    await Heart.create({
      enemy_id: enemy._id,
      cost: 10
    });

    // CHEST
    const chest = await Chest.create({
      path_id: path._id
    });

    // HINT
    await Hint.create({
      chest_id: chest._id,
      hint_text: "Check your semicolons!",
      cost: 5
    });

    // FINAL BATTLE
    const finalBattle = await FinalBattle.create({
      battle_id: battle._id,
      room_id: room._id,
      chest_id: chest._id,
      score: 0
    });

    // BOSS
    await Boss.create({
      finalBattle_id: finalBattle._id,
      boss_name: "Logic Overlord",
      boss_health: 500
    });

    // ATTEMPT
    const attempt = await Attempt.create({
      player_id: player._id,
      battle_id: battle._id,
      input_answer: "console.log('hello')",
      is_correct: true,
      hearts_lost: 0
    });

    // PROGRESS
    await Progress.create({
      player_id: player._id,
      attempt_id: attempt._id,
      completed: true,
      earned_hearts: 1,
      earned_hints: 1
    });

    // LEADERBOARD
    await Leaderboard.create({
      player_id: player._id,
      score: 100,
      rank_number: 1
    });

    console.log("DATABASE SEEDED SUCCESSFULLY!");
    process.exit();

  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seedData();