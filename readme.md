# 💰 Kasa (Cash Management) - Full Stack Application

Modern finance management application built with Node.js, Express, TypeScript backend and React, TypeScript frontend.

---

## 🚀 Technologies

### **Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcryptjs

### **Frontend:**
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **HTTP Client:** Fetch API (Native)
- **State Management:** React Hooks (useState)

---

## 📁 Project Structure

```
kasa-app/
│
├── backend/                    # Backend API
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── dev.db              # SQLite database
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts     # Prisma client
│   │   │
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript type definitions
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts          # JWT token operations
│   │   │   └── password.ts     # Password hashing
│   │   │
│   │   ├── repositories/
│   │   │   └── userRepository.ts    # Database operations
│   │   │
│   │   ├── services/
│   │   │   └── authService.ts       # Business logic
│   │   │
│   │   ├── controllers/
│   │   │   └── authController.ts    # HTTP handlers
│   │   │
│   │   ├── routes/
│   │   │   └── authRoutes.ts        # API endpoints
│   │   │
│   │   ├── app.ts              # Express configuration
│   │   └── server.ts           # Server entry point
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # Frontend React App
    ├── src/
    │   ├── components/
    │   │   └── auth/
    │   │       ├── LoginForm.tsx
    │   │       └── RegisterForm.tsx
    │   │
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── LoginPage.tsx
    │   │   │   └── RegisterPage.tsx
    │   │   └── DashboardPage.tsx
    │   │
    │   ├── services/
    │   │   ├── api.ts              # HTTP request helper
    │   │   └── authService.ts      # Auth API calls
    │   │
    │   ├── types/
    │   │   └── index.ts            # TypeScript interfaces
    │   │
    │   ├── App.tsx                 # Main app component
    │   └── main.tsx                # Entry point
    │
    ├── .env
    ├── package.json
    └── vite.config.ts
```

---

## 🏗️ Architecture

### **Backend (Layered Architecture):**

```
Request → Route → Controller → Service → Repository → Database
                                    ↓
Response ← Controller ← Service ← Repository ← Database
```

**Layers:**
- **Routes:** Define API endpoints
- **Controllers:** Handle HTTP requests (req, res)
- **Services:** Business logic
- **Repositories:** Database operations (Prisma queries)

### **Frontend (Component-Based):**

```
User → Page → Form Component → API Service → Backend
                     ↓
User ← Page ← Form Component ← API Response ← Backend
```

**Layers:**
- **Pages:** Main page components (Login, Register, Dashboard)
- **Components:** Reusable UI parts (LoginForm, RegisterForm)
- **Services:** Backend API calls (api.ts, authService.ts)
- **Types:** TypeScript type definitions

---

## 🔧 Installation

### **1. Clone the Project**
```bash
git clone <repo-url>
cd kasa-app
```

### **2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**`.env` file:**
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"

JWT_SECRET=kasa_app_super_secret_key_2025
JWT_EXPIRE=7d
```

**Create database:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

**Run backend:**
```bash
npm run dev
```

**Backend:** http://localhost:3000

---

### **3. Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**`.env` file:**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Run frontend:**
```bash
npm run dev
```

**Frontend:** http://localhost:5173

---

## 📡 API Endpoints

### **Authentication**

#### **POST /api/auth/register**
Register new user

**Request:**
```json
{
  "username": "ahmet",
  "email": "ahmet@gmail.com",
  "password": "123456"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "ahmet",
      "email": "ahmet@gmail.com"
    }
  }
}
```

---

#### **POST /api/auth/login**
User login

**Request:**
```json
{
  "email": "ahmet@gmail.com",
  "password": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "ahmet",
      "email": "ahmet@gmail.com"
    }
  }
}
```

---

## 🗄️ Database Schema

### **User Model**
```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String   # Hashed with bcrypt
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
### **Category Model**
- Relation: One-to-Many (User -> Categories)
- Unique Constraint: A user cannot have two categories with the same name.
```

---

## 🔐 Security

### **Backend:**
- **Password Hashing:** Passwords are hashed using bcryptjs
- **JWT Token:** Bearer token authentication
- **Salt:** Random salt for each password (stored in hash)
- **Token Expiry:** Tokens expire after 7 days
- **CORS:** Enabled for frontend communication

### **Frontend:**
- **Token Storage:** Stored in localStorage
- **Automatic Token Injection:** Token automatically added to every API request
- **Error Handling:** Try-catch blocks for error management

---

## 🎨 Frontend Features

### **Pages:**
- ✅ **Login Page** - User login
- ✅ **Register Page** - New user registration
- ✅ **Dashboard Page** - Main page (with token verification)

### **Components:**
- ✅ **LoginForm** - Email/password form
- ✅ **RegisterForm** - Username/email/password form

### **Services:**
- ✅ **api.ts** - Generic HTTP request handler
  - GET, POST, PUT, DELETE methods
  - Automatic token injection
  - Error handling
  
  ### **Authentication Flow Completed:**
  - **AuthContext:** Manages global user state and authentication status.
  - **Protected Route:** Redirects unauthenticated users to login page.
  - **Persistency:** Keeps user logged in on page refresh using localStorage check.
  
- ✅ **authService.ts** - Authentication API calls
  - login()
  - register()
  - logout()

### **State Management:**
- React Hooks (useState)
- Token management with localStorage

### **Routing:**
- React Router DOM v6
- Route definitions:
  - `/` → `/login` redirect
  - `/login` → Login page
  - `/register` → Register page
  - `/dashboard` → Dashboard page

---

## 🧪 Testing

### **Backend Testing (Thunder Client / Postman / curl):**

```bash
# Health check
curl http://localhost:3000

# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@gmail.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```

### **Frontend Testing:**

1. **Register Test:**
   - http://localhost:5173/register
   - Fill form → "Kayıt Ol"
   - Auto redirect to `/login`

2. **Login Test:**
   - http://localhost:5173/login
   - Fill form → "Giriş Yap"
   - Auto redirect to `/dashboard`

3. **Dashboard Test:**
   - Token should be displayed
   - "Çıkış Yap" button should work

---

## 📋 Roadmap (To-Do)

### Backend:
- [x] User authentication (Register/Login)
- [x] JWT token system
- [x] Password hashing
- [x] Auth middleware (Protected routes) ✅
- [x] Category CRUD (Create, Read, Delete) ✅
- [ ] Transaction CRUD
- [ ] Budget system
- [ ] Reports

### Frontend:
- [x] Login page
- [x] Register page
- [x] Dashboard page
- [x] API service layer
- [x] Token management (localStorage)
- [x] AuthContext (Global state)
- [x] Protected routes (Token verification)
- [x] Category management (Add/Remove/List) ✅
- [ ] Transaction management
- [ ] Reports
- [ ] Budget tracking

---

## 🚦 Usage

### **1. Start Backend:**
```bash
cd backend
npm run dev
```

### **2. Start Frontend:**
```bash
cd frontend
npm run dev
```

### **3. Open Application:**
```
http://localhost:5173
```

### **4. Register:**
- Go to `/register` page
- Fill the form
- Click "Kayıt Ol" button

### **5. Login:**
- Go to `/login` page
- Enter email and password
- Click "Giriş Yap" button
- You will be redirected to dashboard automatically

---

## 📚 Scripts

### **Backend:**
```bash
npm run dev      # Development mode (ts-node-dev)
npm run build    # TypeScript build
npm start        # Production mode
```

### **Frontend:**
```bash
npm run dev      # Development mode (Vite)
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 🤝 Learning Notes

### **React Concepts:**
- **useState:** Component state management
- **Props:** Data transfer between components
- **useNavigate:** Page navigation
- **onChange:** Capture input changes
- **onSubmit:** Capture form submission

### **TypeScript Concepts:**
- **Interface:** Type definitions (similar to DTO)
- **Generic Types:** Type safety with `<T>`
- **Type-only imports:** `import type { ... }`

### **API Concepts:**
- **Fetch API:** Native HTTP requests
- **Authorization Header:** `Bearer <token>` format
- **localStorage:** Token storage
- **Try-catch-finally:** Error handling

### **Routing Concepts:**
- **BrowserRouter:** URL management
- **Routes:** Route definitions
- **Route:** Single route
- **Navigate:** Automatic redirect

---

## 🐛 Known Issues

1. **TypeScript jwt.sign() warning:** 
   - Backend `tsconfig.json` → `module: "NodeNext"`
   - Works fine but shows red underline (ignore it)

2. **CORS error:**
   - Make sure backend has `app.use(cors())`

3. **Token persists in localStorage:**
   - For production, use httpOnly cookies for better security

---

## 💡 Important Concepts Learned

### **Bearer Token Authentication:**
- `Bearer` is not random, it's an HTTP standard (RFC 6750)
- Backend expects: `Authorization: Bearer <token>`
- Token is automatically injected into every API request

### **Spread Operator (`...`):**
```typescript
const config = {
  ...options,          // Spreads all properties from options
  headers: {
    ...options?.headers  // Spreads headers specifically
  }
}
```

### **localStorage:**
- Browser storage (persists after page reload)
- Stores key-value pairs as strings
- Not secure (vulnerable to XSS attacks)
- Good for learning projects

### **Try-Catch-Finally:**
```typescript
try {
  // Code that might throw error
} catch (err) {
  // Handle error
} finally {
  // Always runs (even if error occurs)
}
```

---

## 📄 License

MIT

---

## 📧 Contact

For questions: [GitHub Issues]

---

**Last Updated:** November 18, 2025  
**Version:** 1.0.0  
**Status:** ✅ Auth system completed, frontend setup done

---

## 🎓 Project Purpose

This is a **learning project** to understand:
- Full-stack development
- TypeScript on both frontend and backend
- React hooks and state management
- RESTful API design
- JWT authentication
- Layered architecture
- Component-based UI design

**Teacher-Student approach:** Code is heavily commented and documented for learning purposes.