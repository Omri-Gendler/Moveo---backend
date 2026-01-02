const axios = require('axios')

const getAiInsight = async (newsHeadlines, topCoinChange) => {
  const prompt = `
    You are a Crypto Advisor.
    Based on this news: "${newsHeadlines}"
    And Bitcoin change (24h): ${topCoinChange}%
    
    Give a short, 2-sentence witty investment advice for a beginner.
  `
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    )
    
    const text = response.data[0]?.generated_text || "HODL is the best strategy today!"
    return text.replace(prompt, '').trim()

  } catch (error) {
    console.error('AI Error:', error.message)
    return "Market is volatile. Stay safe!"
  }
}

module.exports = { getAiInsight }