const memes = require('../data/memes.json')

let cache = { meme: null, lastUpdated: 0 }
const CACHE_DURATION = 5 * 60 * 1000 

const getRandomMeme = () => {
    const now = Date.now()
    
    if (cache.meme && (now - cache.lastUpdated < CACHE_DURATION)) {
        console.log('Serving Meme from Cache 😂')
        return cache.meme
    }

    if (!memes || memes.length === 0) {
        return {
            url: "https://i.imgflip.com/4t0m5.jpg",
            caption: "Crypto market in a nutshell",
            title: "Default Crypto Meme"
        }
    }

    const randomIndex = Math.floor(Math.random() * memes.length)
    const selectedMeme = memes[randomIndex]
    
    cache.meme = selectedMeme
    cache.lastUpdated = now
    
    console.log('📸 New meme selected:', selectedMeme.title)
    return selectedMeme
}

module.exports = { getRandomMeme }