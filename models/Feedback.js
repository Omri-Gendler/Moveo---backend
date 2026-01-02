const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  section: {
    type: String,
    required: true,
    enum: ['news', 'prices', 'insight', 'meme']
  },
  vote: {
    type: String,
    enum: ['up', 'down', null],
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

feedbackSchema.index({ userId: 1, section: 1 }, { unique: true })

module.exports = mongoose.model('Feedback', feedbackSchema)
