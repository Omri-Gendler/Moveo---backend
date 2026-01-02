const express = require('express')
const router = express.Router()
const UserPreferences = require('../models/UserPreferences')
const authMiddleware = require('../middleware/auth')

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId

    let preferences = await UserPreferences.findOne({ userId })
    
    if (!preferences) {
      preferences = await UserPreferences.create({ userId })
    }

    res.json({
      success: true,
      preferences
    })

  } catch (error) {
    console.error('Error fetching preferences:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching preferences',
      error: error.message
    })
  }
})

router.put('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const updates = req.body

    delete updates.userId
    delete updates._id

    const preferences = await UserPreferences.findOneAndUpdate(
      { userId },
      { ...updates, userId },
      { upsert: true, new: true, runValidators: true }
    )

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      preferences
    })

  } catch (error) {
    console.error('Error updating preferences:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating preferences',
      error: error.message
    })
  }
})

router.patch('/:field', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const { field } = req.params
    const { value } = req.body

    const updateObj = { [field]: value }
    
    const preferences = await UserPreferences.findOneAndUpdate(
      { userId },
      updateObj,
      { upsert: true, new: true, runValidators: true }
    )

    res.json({
      success: true,
      message: `${field} updated successfully`,
      preferences
    })

  } catch (error) {
    console.error('Error updating preference field:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating preference',
      error: error.message
    })
  }
})

module.exports = router
