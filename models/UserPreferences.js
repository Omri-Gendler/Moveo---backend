const mongoose = require('mongoose')

const userPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  favoriteCoins: {
    type: [String],
    default: ['bitcoin', 'ethereum', 'cardano']
  },
  newsCategories: {
    type: [String],
    default: ['market', 'technology', 'regulation']
  },
  riskTolerance: {
    type: String,
    enum: ['conservative', 'moderate', 'aggressive'],
    default: 'moderate'
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'dark'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

userPreferencesSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('UserPreferences', userPreferencesSchema)
