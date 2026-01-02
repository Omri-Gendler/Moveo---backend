const express = require('express')
const router = express.Router()
const Feedback = require('../models/Feedback')
const authMiddleware = require('../middleware/auth')

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { section, vote } = req.body
    const userId = req.user.userId

    if (!section || !['news', 'prices', 'insight', 'meme'].includes(section)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid section'
      })
    }

    if (vote === null || vote === undefined) {
      await Feedback.findOneAndDelete({ userId, section })
      return res.json({
        success: true,
        message: 'Feedback removed'
      })
    }

    if (!['up', 'down'].includes(vote)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vote value'
      })
    }

    const feedback = await Feedback.findOneAndUpdate(
      { userId, section },
      { userId, section, vote, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    res.json({
      success: true,
      message: 'Feedback saved',
      feedback
    })

  } catch (error) {
    console.error('Error saving feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error saving feedback',
      error: error.message
    })
  }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const feedbacks = await Feedback.find({ userId })

    const feedbackMap = {}
    feedbacks.forEach(f => {
      feedbackMap[f.section] = f.vote
    })

    res.json({
      success: true,
      feedback: feedbackMap
    })

  } catch (error) {
    console.error('Error fetching feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message
    })
  }
})

module.exports = router
