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
    const response = await axios.get('https://cryptopanic.com/api/developer/v2/posts/', {
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
    const fallbackNews = [
      { id: 1, title: 'Bitcoin Surges Past $90,000 Mark', source: { title: 'CoinTelegraph' }, url: 'https://cointelegraph.com' },
      { id: 2, title: 'Ethereum 2.0 Staking Reaches New Milestone', source: { title: 'CoinDesk' }, url: 'https://coindesk.com' },
      { id: 3, title: 'Major Banks Announce Crypto Custody Services', source: { title: 'Bloomberg Crypto' }, url: 'https://bloomberg.com/crypto' },
      { id: 4, title: 'DeFi Protocol Launches New Yield Farming Program', source: { title: 'DeFi Pulse' }, url: 'https://defipulse.com' },
      { id: 5, title: 'Regulatory Framework Proposed for Digital Assets', source: { title: 'Reuters' }, url: 'https://reuters.com' }
    ]
    
    if (!cache.data) {
      cache.data = fallbackNews
      cache.lastUpdated = now
    }
    return cache.data
  }
}

module.exports = { getCryptoNews }