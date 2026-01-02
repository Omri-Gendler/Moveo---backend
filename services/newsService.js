const axios = require('axios')

const getCryptoNews = async (filter = 'hot') => {
  try {
    const response = await axios.get('https://cryptopanic.com/api/v1/posts/', {
      params: {
        auth_token: process.env.NEWS_API_KEY,
        filter: filter, // 'hot', 'rising', 'bullish'
        kind: 'news',
        public: true
      }
    })
    return response.data.results
  } catch (error) {
    console.error('CryptoPanic Error:', error.message)
    return []
  }
}

module.exports = { getCryptoNews }