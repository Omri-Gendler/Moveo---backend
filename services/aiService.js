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
        timeout: 10000 // Reduced timeout from 30s to 10s
      }
    )
    
    console.log('AI Response received:', response.status)
    
    // Handle different response formats
    let insight = null
    if (Array.isArray(response.data) && response.data.length > 0) {
      insight = response.data[0]?.summary_text || response.data[0]?.generated_text
    } else if (response.data?.summary_text) {
      insight = response.data.summary_text
    } else if (response.data?.generated_text) {
      insight = response.data.generated_text
    }
    
    if (insight && insight.trim().length > 10) {
      cache.data = insight.trim()
      cache.lastUpdated = now
      cache.lastPrompt = cacheKey
      console.log('✅ AI insight generated successfully')
      return cache.data
    }
    
    throw new Error('No valid AI response received')

  } catch (error) {
    console.error('❌ AI Error:', error.response?.status, error.response?.data || error.message)
    
    // Return cached data if available and recent
    if (cache.data && (now - cache.lastUpdated < 60 * 60 * 1000)) { // 1 hour
      console.log('⚠️ Using cached AI insight due to API error')
      return cache.data
    }
    
    // Generate smart contextual fallback based on actual news and market
    console.log('📝 Generating contextual insight...')
    let fallback
    
    const newsKeywords = newsHeadlines.toLowerCase()
    const absChange = Math.abs(topCoinChange)
    
    // Analyze news sentiment
    if (newsKeywords.includes('surge') || newsKeywords.includes('rally') || newsKeywords.includes('breaks')) {
      fallback = `Market momentum is building with Bitcoin ${topCoinChange > 0 ? 'up' : 'showing resilience'} ${absChange.toFixed(1)}%. Stay informed, consider your risk tolerance, and remember to take profits when appropriate.`
    } else if (newsKeywords.includes('crash') || newsKeywords.includes('plunge') || newsKeywords.includes('falls')) {
      fallback = `Market volatility detected with Bitcoin ${topCoinChange < 0 ? 'down' : 'adjusting'} ${absChange.toFixed(1)}%. This could present buying opportunities for long-term believers. Always DYOR!`
    } else if (newsKeywords.includes('regulation') || newsKeywords.includes('sec') || newsKeywords.includes('government')) {
      fallback = `Regulatory news in focus. Bitcoin ${topCoinChange > 0 ? 'up' : 'down'} ${absChange.toFixed(1)}%. Stay updated on policy changes - they often create both risks and opportunities.`
    } else {
      // Market condition based fallback
      if (topCoinChange > 5) {
        fallback = `Bitcoin surging ${topCoinChange.toFixed(1)}%! Strong momentum observed. Consider securing some profits while staying positioned for further gains. Remember: what goes up can correct.`
      } else if (topCoinChange < -5) {
        fallback = `Bitcoin down ${absChange.toFixed(1)}% - potential accumulation zone for patient investors. Market dips historically present opportunities. Invest what you can afford to lose!`
      } else {
        fallback = `Market is stable with Bitcoin ${topCoinChange > 0 ? '+' : ''}${topCoinChange.toFixed(1)}%. Perfect time to research, plan your strategy, and wait for clear signals. Patience pays in crypto!`
      }
    }
    
    cache.data = fallback
    cache.lastUpdated = now
    cache.lastPrompt = cacheKey
    return fallback
  }
}

module.exports = { getAiInsight }