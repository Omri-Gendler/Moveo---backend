

---

## 🤖 AI Tools Disclosure

During development, **GitHub Copilot** was used as a coding assistant to enhance productivity and code quality.

### How AI Was Used:
- ✅ Code completion and boilerplate generation
- ✅ Error handling patterns and best practices
- ✅ Documentation and inline comments
- ✅ API integration templates
- ✅ Schema design suggestions

### Developer's Role:
- 🎯 **Architecture Design:** All system architecture and design decisions made independently
- 🎯 **Business Logic:** Core application logic implemented manually
- 🎯 **Code Review:** All AI suggestions reviewed and modified for project requirements
- 🎯 **Debugging:** Performance optimization and bug fixes handled manually
- 🎯 **Integration:** External API integrations configured and tested independently

**Impact:** AI tools accelerated development by ~30% while maintaining code quality and project-specific customization.

---

## 📄 Project Structure

```
Moveo-backend/
├── 📁 config/
│   └── database.js         # MongoDB connection setup
├── 📁 data/
│   └── memes.json         # Static meme data
├── 📁 middleware/
│   └── auth.js            # JWT authentication middleware
├── 📁 models/
│   ├── User.js            # User schema
│   ├── UserPreferences.js # Preferences schema
│   └── Feedback.js        # Feedback schema
├── 📁 routes/
│   ├── auth.js            # Authentication endpoints
│   ├── dashboard.js       # Dashboard aggregation
│   ├── preferences.js     # User preferences CRUD
│   └── feedback.js        # Feedback management
├── 📁 services/
│   ├── aiService.js       # Hugging Face AI integration
│   ├── cryptoService.js   # CoinGecko API
│   ├── newsService.js     # CryptoPanic API
│   └── memeService.js     # Meme data service
├── 📄 .env                # Environment variables (not in git)
├── 📄 .gitignore         # Git ignore rules
├── 📄 package.json       # Dependencies
├── 📄 render.yaml        # Render deployment config
└── 📄 server.js          # Application entry point
```

---

## 🔧 Development Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Install dependencies
npm install
```

---

## 🛡️ Security Features

- 🔒 **Password Hashing:** bcryptjs with salt rounds
- 🔑 **JWT Authentication:** Secure token-based auth
- 🌐 **CORS Configuration:** Cross-origin security
- ✅ **Input Validation:** express-validator for sanitization
- 🚫 **Environment Protection:** Sensitive data in environment variables

---

## 📊 External APIs Used

| API | Purpose | Rate Limit | Caching |
|-----|---------|------------|---------|
| **CoinGecko** | Real-time crypto prices | 50 calls/min | 5 minutes |
| **CryptoPanic** | Crypto news feed | 1000 calls/day | 10 minutes |
| **Hugging Face** | AI text generation | 30 calls/min | 30 minutes |

---

## 🐛 Error Handling

The application implements comprehensive error handling:
- ✅ Graceful API fallbacks with default data
- ✅ Validation errors with descriptive messages
- ✅ Database connection error recovery
- ✅ 404 handling for undefined routes
- ✅ Global error middleware for unexpected errors

---

## 📈 Performance Optimizations

- ⚡ **Multi-level Caching:** Separate cache strategies per API
- ⚡ **Parallel Requests:** Promise.all for concurrent data fetching
- ⚡ **Smart Cache Keys:** Context-aware cache invalidation
- ⚡ **Connection Pooling:** MongoDB connection optimization

---

<div align="center">

## 📝 License

This project is part of an educational assignment for **Moveo**.

---

### 👨‍💻 Developed with ❤️ for Moveo Backend Assessment

**Made by:** Omri Gendler

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com/Omri-Gendler)

---

**⭐ If you found this project helpful, please consider giving it a star!**

</div>
