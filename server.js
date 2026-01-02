require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')

const authRoutes = require('./routes/auth')
const feedbackRoutes = require('./routes/feedback')
const preferencesRoutes = require('./routes/preferences')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/preferences', preferencesRoutes)
app.use('/api/dashboard', require('./routes/dashboard'))

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})