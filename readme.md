# 📚 User & Book Management Application

A full-stack **Node.js** web application for managing users and books with a **SQLite database**, built using **Express.js** for the backend and **vanilla JavaScript** for the frontend.  
Developed as part of the **EPITA Bachelor in Computer Science — S3, Advanced Web Development course**.

---

## ✨ Features

### 📖 Books Management
- Browse all books with automatic 3‑second refresh
- Full CRUD operations (Create, Read, Update, Delete)
- Responsive card-based grid layout with hover effects

### 👤 User Management
- Manage users with full CRUD operations
- API key authentication for `/users` endpoints
- Email uniqueness validation

### 🗄 Database
- SQLite persistent storage
- Automatic schema creation on startup
- Development seed data

### 🔌 API
- RESTful endpoints for books and users
- CORS enabled for cross-origin requests
- Comprehensive error handling

### 🎨 Frontend
- Responsive design (desktop, tablet, mobile)
- Real-time auto-refresh
- Clean, minimal UI

---

## 🛠 System Requirements

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js     | v22.14.0+ | Required |
| npm         | Latest | Comes with Node.js |
| SQLite      | 3.x | Usually pre-installed |
| OS          | Windows/Mac/Linux | Compatible |

---

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/TATCHIwillyjunior/Node_JS_App.git
cd "Node Js App"
```

### 2. Install Dependencies
```bash
npm install
```
Installs:
- express (web framework)
- cors (cross-origin support)
- better-sqlite3 (database)
- nodemon (development auto-reload)

### 3. Configure Environment
```bash
cp .env.example .env
```
Edit `.env`:
```
PORT=3000
NODE_ENV=development
DATABASE_URL=./database.sqlite
API_KEY=Your_Choicen_Key
JWT_SECRET=Your_Choicen_secret_key
JWT_EXPIRES_IN=24h
```

### 4. Start Backend
```bash
npm run dev
```
Expected output:
```
✅ Server listening on http://localhost:3000
📊 Database path: ./database.sqlite
📝 Seeding books...
✅ Database initialization complete
```
<img width="1357" height="702" alt="image" src="https://github.com/user-attachments/assets/37e7d1c6-e51a-40aa-a8da-7d0b570dd329" />


### 5. Start Frontend
```bash
# Option A: Simple HTTP server
npx http-server public -c-1 -p 8080

# Option B: Live reload
npx live-server public --port=8080
```
<img width="1374" height="866" alt="image" src="https://github.com/user-attachments/assets/8a4eee6f-f24a-42b7-a1f8-a08728a088fa" />



### 6. Open Application
Visit:
```
http://localhost:8080
```
✅ Books will auto-load after 3 seconds!

---

## 📁 Project Structure

```
Node Js App/
├── src/                # Backend
│   ├── config/         # Env & DB setup
│   ├── models/         # Book & User schemas
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   └── index.js        # Express entry point
│
├── public/             # Frontend
│   ├── index.html
│   ├── src/
│   │   ├── main.js     # Frontend logic
│   │   └── api.js      # API client
│   └── styles/
│       └── globals.css # Styling
│
├── .env                # Local environment
├── .env.example        # Template
├── package.json
├── database.sqlite     # SQLite DB
└── README.md
```

---

## 🔌 API Documentation

### Base URL
- Development: `http://localhost:3000`

### Books Endpoints (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/books` | Get all books |
| GET    | `/books/:id` | Get book by ID |
| POST   | `/books` | Create book |
| PUT    | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |

### Users Endpoints (Protected)
⚠️ Requires API Key (`X-API-Key` header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/users` | Get all users |
| GET    | `/users/:id` | Get user by ID |
| POST   | `/users` | Create user |
| PUT    | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

---

## 🎨 Frontend Features
- Auto-load books after 3 seconds
- Manual refresh button
- Responsive card grid (desktop, tablet, mobile)
- Book cards show title, author, year, genre
- Hover effects for better UX

---

## 🔐 Security
- API Key protection for `/users`
- Email uniqueness validation
- Input validation for required fields

---

## 📦 NPM Scripts
```bash
npm run dev     # Development with nodemon
npm start       # Production
```

---

## 🚢 Deployment (Render)
1. Connect GitHub repo to Render
2. Configure service:
   - Build Command: `npm install`
   - Start Command: `node src/index.js`
3. Add environment variables in Render dashboard
4. Deploy 🚀

⚠️ Note: SQLite resets on redeploy. Use PostgreSQL or another persistent DB for production.

---

## 🐛 Troubleshooting
- **No books showing?** Ensure backend and frontend servers are running, DB exists, and API returns data.
- **401 Unauthorized on /users?** Check API key in `.env` and request headers.
- **Port in use?** Kill process using port 3000 before restarting.
  
---

## 🤝 Contributing
1. Fork the repo  
2. Create a feature branch  
3. Commit changes  
4. Push branch  
5. Open a Pull Request  

