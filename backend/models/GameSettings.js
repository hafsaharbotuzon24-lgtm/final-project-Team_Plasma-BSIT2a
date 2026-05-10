const mongoose = require('mongoose');

const questQuestionSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: mongoose.Schema.Types.Mixed, required: true }, 
  h: { type: String, default: '' }
}, { _id: false });

// site/stage within a level (1–5)
const questSiteSchema = new mongoose.Schema({
  questions: [questQuestionSchema]
}, { _id: false });

// full quest level (e.g. Level 1 – Forest)
const questLevelSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  name: { type: String, default: '' },
  sites: {
    1: questSiteSchema,
    2: questSiteSchema,
    3: questSiteSchema,
    4: questSiteSchema,
    5: questSiteSchema
  }
}, { _id: false });

// Module quiz question
const moduleQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correct: { type: Number, required: true },
  explanation: { type: String, default: '' }
}, { _id: false });

// learning module with quiz
const moduleQuizSchema = new mongoose.Schema({
  moduleId: { type: Number, required: true },
  title: { type: String, default: '' },
  questions: [moduleQuestionSchema]
}, { _id: false });

// Music config
const musicConfigSchema = new mongoose.Schema({
  key: { type: String, required: true },       
  label: { type: String, default: '' },         
  file: { type: String, required: true },       
  pages: [{ type: String }],                    
  volume: { type: Number, default: 50, min: 0, max: 100 }
}, { _id: false });

// Main GameSettings document
const gameSettingsSchema = new mongoose.Schema({
  // Quest mode questions per level
  questLevels: [questLevelSchema],

  // Module quiz questions
  moduleQuizzes: [moduleQuizSchema],

  // Music configuration
  musicConfig: [musicConfigSchema],

  // General game settings
  siteTitle: { type: String, default: 'CodeQuest Academy' },
  maxUsers: { type: Number, default: 1000 },
  passingScore: { type: Number, default: 70, min: 0, max: 100 },
  maxAttempts: { type: Number, default: 3, min: 1, max: 10 },

  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GameSettings', gameSettingsSchema);
