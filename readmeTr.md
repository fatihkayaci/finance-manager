# 💰 Kasa Backend API

Kasa (Para Yönetimi) uygulamasının backend API'si. Node.js, Express, TypeScript ve Prisma ile geliştirilmiştir.

## 🚀 Teknolojiler

- **Çalışma Ortamı:** Node.js
- **Framework:** Express.js
- **Dil:** TypeScript
- **Veritabanı:** SQLite
- **ORM:** Prisma
- **Kimlik Doğrulama:** JWT (JSON Web Token)
- **Şifre Hashleme:** bcryptjs

## 📁 Proje Yapısı
```
backend/
├── prisma/
│   ├── schema.prisma       # Veritabanı şeması
│   └── dev.db              # SQLite veritabanı
│
├── src/
│   ├── config/
│   │   └── database.ts     # Prisma istemcisi
│   │
│   ├── types/
│   │   └── index.ts        # TypeScript tip tanımları
│   │
│   ├── utils/
│   │   ├── jwt.ts          # JWT token işlemleri
│   │   └── password.ts     # Şifre hashleme işlemleri
│   │
│   ├── repositories/
│   │   └── userRepository.ts    # Veritabanı işlemleri
│   │
│   ├── services/
│   │   └── authService.ts       # İş mantığı
│   │
│   ├── controllers/
│   │   └── authController.ts    # HTTP istek yöneticileri
│   │
│   ├── routes/
│   │   └── authRoutes.ts        # API uç noktaları
│   │
│   ├── app.ts              # Express uygulama yapılandırması
│   └── server.ts           # Sunucu başlangıç noktası
│
├── .env                    # Ortam değişkenleri
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Katmanlı Mimari
```
İstek → Route → Controller → Service → Repository → Veritabanı
                                    ↓
Yanıt ← Controller ← Service ← Repository ← Veritabanı
```

### **Katmanlar:**

- **Routes:** API uç noktalarını tanımlar
- **Controllers:** HTTP isteklerini yönetir (req, res)
- **Services:** İş mantığını içerir (business logic)
- **Repositories:** Veritabanı işlemlerini yapar (Prisma sorguları)

## 🔧 Kurulum

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Ortam Değişkenleri

`.env` dosyası oluştur:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"

JWT_SECRET=super_gizli_jwt_anahtari_uretimde_degistir
JWT_EXPIRE=7d
```

### 3. Veritabanını Oluştur
```bash
# Prisma migration çalıştır
npx prisma migrate dev --name init

# Prisma Client oluştur
npx prisma generate
```

### 4. Sunucuyu Başlat
```bash
# Geliştirme modu
npm run dev

# Üretim derlemesi
npm run build
npm start
```

## 📡 API Uç Noktaları

### **Kimlik Doğrulama**

#### Kayıt Ol
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "ahmet",
  "email": "ahmet@gmail.com",
  "password": "123456"
}
```

**Yanıt (201 Created):**
```json
{
  "success": true,
  "message": "Kullanıcı başarıyla kaydedildi",
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

#### Giriş Yap
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmet@gmail.com",
  "password": "123456"
}
```

**Yanıt (200 OK):**
```json
{
  "success": true,
  "message": "Giriş başarılı",
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

## 🗄️ Veritabanı Şeması

### **Kullanıcı Modeli**
```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String   # bcrypt ile hashlenmiş
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔐 Güvenlik

- **Şifre Hashleme:** bcryptjs ile şifreler hashlenip saklanır
- **JWT Token:** Kullanıcı doğrulama için JWT token kullanılır
- **Salt:** Her şifre için rastgele salt oluşturulur (hash içinde saklanır)
- **Token Süresi:** Token'lar 7 gün sonra otomatik geçersiz olur

## 📋 Yapılacaklar

- [x] Kullanıcı kimlik doğrulama (Kayıt/Giriş)
- [x] JWT token sistemi
- [x] Şifre hashleme
- [ ] Kimlik doğrulama middleware'i (Korumalı rotalar)
- [ ] Kategori CRUD
- [ ] İşlem CRUD
- [ ] Bütçe sistemi
- [ ] Raporlar

## 🧪 Test

API'yi test etmek için Thunder Client, Postman veya curl kullanabilirsiniz:
```bash
# Sağlık kontrolü
curl http://localhost:3000

# Kayıt ol
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@gmail.com","password":"123456"}'

# Giriş yap
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```

## 📚 Komutlar
```bash
npm run dev      # Geliştirme modu (ts-node-dev)
npm run build    # TypeScript derlemesi
npm start        # Üretim modu
```

## 🤝 Geliştirme Notları

### **TypeScript Yapılandırması**
- ES2020 hedef
- NodeNext modül sistemi
- Katı tip kontrolü devre dışı (öğrenme aşaması)

### **Prisma**
- SQLite veritabanı (dosya tabanlı)
- Otomatik oluşturulan TypeScript tipleri
- Şema değişiklikleri için migration sistemi

### **Express Middleware'leri**
- CORS etkin (frontend iletişimi)
- JSON body parser
- Controller'larda hata yakalama

## 📄 Lisans

MIT

---

💡 **Not:** Bu proje eğitim amaçlı geliştirilmektedir.