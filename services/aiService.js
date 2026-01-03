const axios = require('axios')

let cache = { data: null, lastUpdated: 0, lastPrompt: '' }
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

const getAiInsight = async (newsHeadlines, topCoinChange) => {
  const prompt = `
    You are a Crypto Advisor.
    Based on this news: "${newsHeadlines}"
    And Bitcoin change (24h): ${topCoinChange}%
    
    Give a short, 2-sentence witty investment advice for a beginner.
  `
  
  const now = Date.now()
  // Cache based on similar market conditions (rounded to nearest 5%)
  const cacheKey = Math.round(topCoinChange / 5) * 5
  
  if (cache.data && (now - cache.lastUpdated < CACHE_DURATION) && cache.lastPrompt === cacheKey) {
    console.log('Serving AI Insight from Cache 🤖')
    return cache.data
  }

  try {
    console.log('🤖 Requesting AI insight...')
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { 
        inputs: `Summarize this crypto market situation in one encouraging sentence: ${newsHeadlines}. Bitcoin is ${topCoinChange > 0 ? 'up' : 'down'} ${Math.abs(topCoinChange)}%.`,
        parameters: { max_length: 50, min_length: 20 }
      },
      { 
        headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
        timeout: 30000
      }
    )
    
    console.log('AI Response:', JSON.stringify(response.data))
    const text = response.data[0]?.summary_text || response.data[0]?.generated_text || "Stay informed and HODL wisely!"
    const insight = text.trim()
    
    cache.data = insight
    cache.lastUpdated = now
    cache.lastPrompt = cacheKey
    console.log('✅ AI insight generated')
    
    return insight

  } catch (error) {
    console.error('❌ AI Error:', error.response?.data || error.message)
    const fallback = "Market is volatile. Stay safe and HODL!"
    if (!cache.data) {
      cache.data = fallback
      cache.lastUpdated = now
    }
    return cache.data
  }
}

module.exports = { getAiInsight }