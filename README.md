# EasyTicket

**EasyTicket** is a fullstack IT ticket management application designed. It provides complete user and ticket CRUD, secure authentication, and a modern, responsive interface.

---

## 📦 Tech Stack

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Frontend   | React 19, Redux Toolkit, React Router DOM v7+, MUI |
| Backend    | Node.js, Express, Mongoose, JWT, Redis        |
| Database   | MongoDB                                            |
| Deployment | Nginx, PM2, SSL (Let's Encrypt)                    |

---

## 🚀 Features

- JWT authentication with automatic refresh
- Full CRUD for users and tickets
- Modal forms for create/update actions
- Detailed ticket views
- Clean and responsive UI

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/lavv425/easy-ticket-epicode.git
cd easy-ticket
```

### 2. Install Frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend dependencies
```bash
cd ../backend # or cd backend if you are already in the ./ path
npm install
```

### 4. Backend Setup
- Create a `.env` file in the `backend` directory with the following content (or use the `.env.example` file as a template):
```
EXPRESS_SERVER_PORT=30001
JWT_SECRET=your_jwt_secret
MONGO_HOST=your_mongo_db_host
MONGO_PORT=your_mongo_db_port
MONGO_USER=your_mongo_db_user
MONGO_PASSWORD=your_mongo_db_password
MONGO_DATABASE=your_mongo_db_database
BASE_USER_PASSWORD=your_base_user_password
```

## ✅ Start the application

#### Starting theFrontend
```bash
cd frontend
npm run dev
```

This will start the frontend development server, accessible at **http://localhost:30000**.

#### Backend
```bash
cd backend
npm run dev
```

This will start the backend development server, accessible at **http://localhost:30001**.


## 🌐 Access the application

Go to **http://localhost:30000** in your browser to access the application with:
- Username: `base.user`
- Password: `base-user-password that you set in the .env file`
