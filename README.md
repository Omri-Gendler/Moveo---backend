<div align="center">

# 🚀 AI Crypto Advisor - Backend API

### *Intelligent Cryptocurrency Advisory Platform*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

The server-side application for the AI Crypto Advisor dashboard. This REST API handles user authentication, data persistence (preferences, votes), and secure communication with the MongoDB database.

[Features](#-features) • [Installation](#️-installation--local-setup) • [API Endpoints](#-api-endpoints) • [Deployment](#-deployment) • [Database Access](#-db-access-for-reviewers)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 **Secure Authentication**
- JWT-based token authentication
- Bcrypt password encryption
- Protected API routes

</td>
<td width="50%">

### 📊 **Real-time Data**
- Live cryptocurrency prices
- Crypto news aggregation
- AI-powered insights

</td>
</tr>
<tr>
<td width="50%">

### 👤 **User Management**
- User registration & login
- Personalized preferences
- Feedback tracking system

</td>
<td width="50%">

### ⚡ **Performance**
- Intelligent caching
- Optimized API calls
- Error handling & fallbacks

</td>
</tr>
</table>

---

## 🛠 Tech Stack

<div align="center">

| Category | Technology |
|----------|-----------|
| **Runtime** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) |
| **Framework** | ![Express](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square) |
| **Authentication** | ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) |
| **Security** | ![bcryptjs](https://img.shields.io/badge/-bcryptjs-338844?style=flat-square) ![CORS](https://img.shields.io/badge/-CORS-FF6C37?style=flat-square) |
| **External APIs** | CoinGecko • CryptoPanic • Hugging Face AI |

</div>

---

## ⚙️ Installation & Local Setup

### Prerequisites
```
✓ Node.js (v18 or higher)
✓ MongoDB Atlas account
✓ Git installed
```

### 🚀 Quick Start

<details>
<summary><b>1. Clone the repository</b></summary>

```bash
git clone https://github.com/Omri-Gendler/Moveo---backend.git
cd Moveo---backend
```
</details>

<details>
<summary><b>2. Install dependencies</b></summary>

```bash
npm install
```
</details>

<details>
<summary><b>3. Environment Variables</b></summary>

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=<YOUR_ADMIN_CONNECTION_STRING>

# Authentication
JWT_SECRET=your_super_secret_key_here

# External APIs
NEWS_API_KEY=<YOUR_CRYPTOPANIC_KEY>
HF_API_KEY=<YOUR_HUGGINGFACE_KEY>
```

> **Note:** Never commit the `.env` file to version control
</details>

<details>
<summary><b>4. Run the server</b></summary>

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` 🎉
</details>

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user info | ✅ |

<details>
<summary><b>Example: Register User</b></summary>

```json
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```
</details>

### 📊 Dashboard

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/dashboard` | Fetch crypto data, news & AI insights | ❌ |

<details>
<summary><b>Example: Get Dashboard Data</b></summary>

```json
GET /api/dashboard

Response:
{
  "news": [...],      // Latest crypto news
  "coins": [...],     // Top 10 crypto prices
  "aiInsight": "...", // AI-generated advice
  "meme": {...}       // Random crypto meme
}
```
</details>

### 💬 Feedback

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/feedback` | Submit user vote (up/down) | ✅ |
| `GET` | `/api/feedback` | Get user's feedback history | ✅ |

### ⚙️ Preferences

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/preferences` | Get user preferences | ✅ |
| `PUT` | `/api/preferences` | Update user preferences | ✅ |

### 🏥 Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/health` | Server status check | ❌ |

---

## 🚀 Deployment

### Live Application

<div align="center">

[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

**🌐 Backend URL:** `https://moveo-backend.onrender.com`

**📦 GitHub Repository:** [Omri-Gendler/Moveo---backend](https://github.com/Omri-Gendler/Moveo---backend)

</div>

### Deployment Configuration

The application uses `render.yaml` for automatic deployment configuration. All environment variables are securely stored in Render's dashboard.

> **⚠️ Free Tier Note:** The service may spin down after 15 minutes of inactivity and take 30-60 seconds to restart.

---

## 🔐 DB Access for Reviewers

<div align="center">

### MongoDB Atlas - Read-Only Access

For verification purposes, here is a **read-only** connection string to the MongoDB database. You can use **MongoDB Compass** or any MongoDB client to verify stored data.

</div>

```text
mongodb+srv://moveo_guest:Moveo_Boost2026@stations.yvgiuub.mongodb.net/test?appName=stations
```

<div align="center">

| Database | Collections |
|----------|------------|
| **test** | users, userpreferences, feedbacks |

**Instructions:**
1. Copy the connection string above
2. Open MongoDB Compass or your preferred client
3. Paste the connection string
4. Explore the data structure and entries

</div>