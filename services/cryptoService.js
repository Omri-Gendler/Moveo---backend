const axios = require('axios')

let cache = { data: null, lastUpdated: 0 }
const CACHE_DURATION = 5 * 60 * 1000 

const getCryptoPrices = async () => {
  const now = Date.now()
  if (cache.data && (now - cache.lastUpdated < CACHE_DURATION)) {
    console.log('Serving Crypto from Cache 📦')
    return cache.data
  }

  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false
      }
    })
    
    cache.data = response.data
    cache.lastUpdated = now
    return response.data
  } catch (error) {
    console.error('CoinGecko Error:', error.message)
    return [] 
  }
}

module.exports = { getCryptoPrices }