# 💰 Kasa Backend API

Kasa (Cash Management) uygulamasının backend API'si. Node.js, Express, TypeScript ve Prisma ile geliştirilmiştir.

## 🚀 Teknolojiler

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcryptjs

## 📁 Proje Yapısı
```
backend/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── dev.db              # SQLite database
│
├── src/
│   ├── config/
│   │   └── database.ts     # Prisma client
│   │
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   │
│   ├── utils/
│   │   ├── jwt.ts          # JWT token operations
│   │   └── password.ts     # Password hashing operations
│   │
│   ├── repositories/
│   │   └── userRepository.ts    # Database operations
│   │
│   ├── services/
│   │   └── authService.ts       # Business logic
│   │
│   ├── controllers/
│   │   └── authController.ts    # HTTP request handlers
│   │
│   ├── routes/
│   │   └── authRoutes.ts        # API endpoints
│   │
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
│
├── .env                    # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Katmanlı Mimari
```
Request → Route → Controller → Service → Repository → Database
                                    ↓
Response ← Controller ← Service ← Repository ← Database
```

### **Katmanlar:**

- **Routes:** API endpoint'lerini tanımlar
- **Controllers:** HTTP isteklerini yönetir (req, res)
- **Services:** İş mantığını içerir (business logic)
- **Repositories:** Database işlemlerini yapar (Prisma queries)

## 🔧 Kurulum

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Environment Variables

`.env` dosyası oluştur:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

### 3. Database Oluştur
```bash
# Prisma migration çalıştır
npx prisma migrate dev --name init

# Prisma Client generate et
npx prisma generate
```

### 4. Server'ı Başlat
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📡 API Endpoints

### **Authentication**

#### Register (Kayıt Ol)
```http
POST /api/auth/register
Content-Type: application/json

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

#### Login (Giriş Yap)
```http
POST /api/auth/login
Content-Type: application/json

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
```

## 🔐 Güvenlik

- **Password Hashing:** bcryptjs ile şifreler hashlenip saklanır
- **JWT Token:** Kullanıcı doğrulama için JWT token kullanılır
- **Salt:** Her şifre için rastgele salt oluşturulur (hash içinde saklanır)
- **Token Expiry:** Token'lar 7 gün sonra otomatik geçersiz olur

## 📋 Yapılacaklar

- [x] User authentication (Register/Login)
- [x] JWT token sistemi
- [x] Password hashing
- [ ] Auth middleware (Protected routes)
- [ ] Category CRUD
- [ ] Transaction CRUD
- [ ] Budget sistemi
- [ ] Reports

## 🧪 Test

API'yi test etmek için Thunder Client, Postman veya curl kullanabilirsiniz:
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

## 📚 Scripts
```bash
npm run dev      # Development mode (ts-node-dev)
npm run build    # TypeScript build
npm start        # Production mode
```

## 🤝 Geliştirme Notları

### **TypeScript Konfigürasyonu**
- ES2020 target
- NodeNext module system
- Strict type checking disabled (learning phase)

### **Prisma**
- SQLite database (file-based)
- Auto-generated TypeScript types
- Migration system for schema changes

### **Express Middlewares**
- CORS enabled (frontend communication)
- JSON body parser
- Error handling in controllers

## 📄 License

MIT
