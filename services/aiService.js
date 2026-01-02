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
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    )
    
    const text = response.data[0]?.generated_text || "HODL is the best strategy today!"
    const insight = text.replace(prompt, '').trim()
    
    cache.data = insight
    cache.lastUpdated = now
    cache.lastPrompt = cacheKey
    
    return insight

  } catch (error) {
    console.error('AI Error:', error.message)
    const fallback = "Market is volatile. Stay safe!"
    if (!cache.data) {
      cache.data = fallback
      cache.lastUpdated = now
    }
    return cache.data || fallback
  }
}

module.exports = { getAiInsight }