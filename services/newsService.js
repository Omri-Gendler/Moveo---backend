const axios = require('axios')

let cache = { data: null, lastUpdated: 0 }
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

const getCryptoNews = async (filter = 'hot') => {
  const now = Date.now()
  if (cache.data && (now - cache.lastUpdated < CACHE_DURATION)) {
    console.log('Serving News from Cache 📰')
    return cache.data
  }

  try {
    const response = await axios.get('https://cryptopanic.com/api/free/v1/posts/', {
      params: {
        auth_token: process.env.NEWS_API_KEY,
        filter: filter,
        public: true
      }
    })
    cache.data = response.data.results
    cache.lastUpdated = now
    return cache.data
  } catch (error) {
    console.error('CryptoPanic Error:', error.message)
    
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/news')
      const newsData = response.data.data.slice(0, 10).map((item, index) => ({
        id: index + 1,
        title: item.title,
        url: item.url,
        source: { title: item.news_site }
      }))
      cache.data = newsData
      cache.lastUpdated = now
      return newsData
    } catch (fallbackError) {
      console.error('Fallback news error:', fallbackError.message)
      const fallbackNews = [
        { id: 1, title: 'Bitcoin Reaches New All-Time High', source: { title: 'CryptoNews' }, url: '#' },
        { id: 2, title: 'Ethereum Upgrade Successfully Deployed', source: { title: 'CoinDesk' }, url: '#' },
        { id: 3, title: 'Major Institution Adopts Crypto Payments', source: { title: 'Bloomberg' }, url: '#' }
      ]
      if (!cache.data) {
        cache.data = fallbackNews
        cache.lastUpdated = now
      }
      return cache.data || fallbackNews
    }
  }
}

module.exports = { getCryptoNews }