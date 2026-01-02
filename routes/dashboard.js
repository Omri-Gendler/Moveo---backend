const express = require('express')
const router = express.Router()
const { getCryptoNews } = require('../services/newsService')
const { getCryptoPrices } = require('../services/cryptoService')
const { getAiInsight } = require('../services/aiService')
const memes = require('../data/memes.json')

router.get('/', async (req, res) => {
    try {
        const [rawNews, rawCoins] = await Promise.all([
            getCryptoNews(),
            getCryptoPrices()
        ])


        const formattedNews = rawNews.slice(0, 5).map(article => ({
            id: article.id,
            title: article.title,
            source: article.source.title || article.domain,
            url: article.url
        }))

        const formattedCoins = rawCoins.map(coin => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h
        }))

        const newsSummary = formattedNews.map(n => n.title).join('. ')
        const topCoinChange = formattedCoins[0]?.change24h || 0

        const aiInsight = await getAiInsight(newsSummary, topCoinChange)

        const randomMeme = memes[Math.floor(Math.random() * memes.length)]

        res.json({
            news: formattedNews,
            coins: formattedCoins,
            aiInsight: aiInsight,
            meme: randomMeme.url
        })

    } catch (err) {
        console.error('Error in dashboard route:', err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router