# 💰 Kasa (Finans Yönetimi) - Full Stack Uygulama

Node.js, Express, TypeScript backend ve React, TypeScript frontend ile geliştirilmiş modern finans yönetim uygulaması.

---

## 🚀 Teknolojiler

### **Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Dil:** TypeScript
- **Veritabanı:** SQLite
- **ORM:** Prisma
- **Kimlik Doğrulama:** JWT (JSON Web Token)
- **Şifre Hashleme:** bcryptjs

### **Frontend:**
- **Framework:** React 18
- **Dil:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **HTTP İstemcisi:** Fetch API (Native)
- **State Yönetimi:** React Hooks (useState)

---

## 📁 Proje Yapısı

```
kasa-app/
│
├── backend/                    # Backend API
│   ├── prisma/
│   │   ├── schema.prisma       # Veritabanı şeması
│   │   └── dev.db              # SQLite veritabanı
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts     # Prisma client
│   │   │
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript tip tanımları
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts          # JWT token işlemleri
│   │   │   └── password.ts     # Şifre hashleme
│   │   │
│   │   ├── repositories/
│   │   │   └── userRepository.ts    # Veritabanı işlemleri
│   │   │
│   │   ├── services/
│   │   │   └── authService.ts       # İş mantığı
│   │   │
│   │   ├── controllers/
│   │   │   └── authController.ts    # HTTP işleyiciler
│   │   │
│   │   ├── routes/
│   │   │   └── authRoutes.ts        # API endpoint'leri
│   │   │
│   │   ├── app.ts              # Express yapılandırması
│   │   └── server.ts           # Server başlangıç noktası
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # Frontend React Uygulaması
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
    │   │   ├── api.ts              # HTTP istek yardımcısı
    │   │   └── authService.ts      # Auth API çağrıları
    │   │
    │   ├── types/
    │   │   └── index.ts            # TypeScript interface'leri
    │   │
    │   ├── App.tsx                 # Ana uygulama component'i
    │   └── main.tsx                # Giriş noktası
    │
    ├── .env
    ├── package.json
    └── vite.config.ts
```

---

## 🏗️ Mimari Yapısı

### **Backend (Katmanlı Mimari):**

```
İstek → Route → Controller → Service → Repository → Veritabanı
                                    ↓
Yanıt ← Controller ← Service ← Repository ← Veritabanı
```

**Katmanlar:**
- **Routes:** API endpoint'lerini tanımlar
- **Controllers:** HTTP isteklerini yönetir (req, res)
- **Services:** İş mantığını içerir
- **Repositories:** Veritabanı işlemlerini yapar (Prisma sorguları)

### **Frontend (Component Tabanlı):**

```
Kullanıcı → Sayfa → Form Component → API Service → Backend
                         ↓
Kullanıcı ← Sayfa ← Form Component ← API Yanıtı ← Backend
```

**Katmanlar:**
- **Pages:** Ana sayfa component'leri (Login, Register, Dashboard)
- **Components:** Yeniden kullanılabilir UI parçaları (LoginForm, RegisterForm)
- **Services:** Backend API çağrıları (api.ts, authService.ts)
- **Types:** TypeScript tip tanımları

---

## 🔧 Kurulum

### **1. Projeyi Klonla**
```bash
git clone <repo-url>
cd kasa-app
```

### **2. Backend Kurulumu**

```bash
cd backend

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
cp .env.example .env
```

**`.env` dosyası:**
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"

JWT_SECRET=kasa_app_super_secret_key_2025
JWT_EXPIRE=7d
```

**Veritabanını oluştur:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

**Backend'i çalıştır:**
```bash
npm run dev
```

**Backend:** http://localhost:3000

---

### **3. Frontend Kurulumu**

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
cp .env.example .env
```

**`.env` dosyası:**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Frontend'i çalıştır:**
```bash
npm run dev
```

**Frontend:** http://localhost:5173

---

## 📡 API Endpoint'leri

### **Kimlik Doğrulama**

#### **POST /api/auth/register**
Yeni kullanıcı kaydı

**İstek:**
```json
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
Kullanıcı girişi

**İstek:**
```json
{
  "email": "ahmet@gmail.com",
  "password": "123456"
}
```

**Yanıt (200 OK):**
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

## 🗄️ Veritabanı Şeması

### **User Modeli**
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

---

## 🔐 Güvenlik

### **Backend:**
- **Şifre Hashleme:** Şifreler bcryptjs kullanılarak hashlenip saklanır
- **JWT Token:** Bearer token kimlik doğrulama
- **Salt:** Her şifre için rastgele salt (hash içinde saklanır)
- **Token Süresi:** Token'lar 7 gün sonra otomatik geçersiz olur
- **CORS:** Frontend iletişimi için CORS aktif

### **Frontend:**
- **Token Saklama:** localStorage'da saklanır
- **Otomatik Token Ekleme:** Her API isteğine otomatik olarak header'a eklenir
- **Hata Yönetimi:** Try-catch blokları ile hata yönetimi

---

## 🎨 Frontend Özellikleri

### **Sayfalar:**
- ✅ **Login Sayfası** - Kullanıcı girişi
- ✅ **Register Sayfası** - Yeni kullanıcı kaydı
- ✅ **Dashboard Sayfası** - Ana sayfa (token kontrolü ile)

### **Component'ler:**
- ✅ **LoginForm** - Email/şifre formu
- ✅ **RegisterForm** - Kullanıcı adı/email/şifre formu

### **Servisler:**
- ✅ **api.ts** - Genel HTTP istek işleyicisi
  - GET, POST, PUT, DELETE metodları
  - Otomatik token ekleme
  - Hata yönetimi
  
- ✅ **authService.ts** - Kimlik doğrulama API çağrıları
  - login()
  - register()
  - logout()

### **State Yönetimi:**
- React Hooks (useState)
- localStorage ile token yönetimi

### **Routing:**
- React Router DOM v6
- Route tanımları:
  - `/` → `/login` yönlendirme
  - `/login` → Login sayfası
  - `/register` → Register sayfası
  - `/dashboard` → Dashboard sayfası

---

## 🧪 Test

### **Backend Testi (Thunder Client / Postman / curl):**

```bash
# Health check
curl http://localhost:3000

# Kayıt
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@gmail.com","password":"123456"}'

# Giriş
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```

### **Frontend Testi:**

1. **Kayıt Testi:**
   - http://localhost:5173/register
   - Formu doldur → "Kayıt Ol"
   - Otomatik `/login`'e yönlendir

2. **Giriş Testi:**
   - http://localhost:5173/login
   - Formu doldur → "Giriş Yap"
   - Otomatik `/dashboard`'a yönlendir

3. **Dashboard Testi:**
   - Token gösterilmeli
   - "Çıkış Yap" butonu çalışmalı

---

## 📋 Yol Haritası (Yapılacaklar)

### **Backend:**
- [x] Kullanıcı kimlik doğrulama (Register/Login)
- [x] JWT token sistemi
- [x] Şifre hashleme
- [ ] Auth middleware (Korumalı route'lar)
- [ ] Kategori CRUD
- [ ] İşlem (Transaction) CRUD
- [ ] Bütçe sistemi
- [ ] Raporlar

### **Frontend:**
- [x] Login sayfası
- [x] Register sayfası
- [x] Dashboard sayfası
- [x] API servis katmanı
- [x] Token yönetimi (localStorage)
- [ ] AuthContext (Global state)
- [ ] Korumalı route'lar (Token kontrolü)
- [ ] Kategori yönetimi
- [ ] İşlem yönetimi
- [ ] Raporlar
- [ ] Bütçe takibi

---

## 🚦 Kullanım

### **1. Backend'i Başlat:**
```bash
cd backend
npm run dev
```

### **2. Frontend'i Başlat:**
```bash
cd frontend
npm run dev
```

### **3. Uygulamayı Aç:**
```
http://localhost:5173
```

### **4. Kayıt Ol:**
- `/register` sayfasına git
- Formu doldur
- "Kayıt Ol" butonuna bas

### **5. Giriş Yap:**
- `/login` sayfasına git
- Email ve şifre gir
- "Giriş Yap" butonuna bas
- Otomatik olarak dashboard'a yönlendirileceksin

---

## 📚 Script'ler

### **Backend:**
```bash
npm run dev      # Geliştirme modu (ts-node-dev)
npm run build    # TypeScript build
npm start        # Production modu
```

### **Frontend:**
```bash
npm run dev      # Geliştirme modu (Vite)
npm run build    # Production build
npm run preview  # Production build önizleme
```

---

## 🤝 Öğrenme Notları

### **React Kavramları:**
- **useState:** Component state yönetimi
- **Props:** Component'ler arası veri aktarımı
- **useNavigate:** Sayfa yönlendirme
- **onChange:** Input değişikliklerini yakalama
- **onSubmit:** Form gönderimini yakalama

### **TypeScript Kavramları:**
- **Interface:** Tip tanımları (DTO benzeri)
- **Generic Types:** `<T>` ile tip güvenliği
- **Type-only imports:** `import type { ... }`

### **API Kavramları:**
- **Fetch API:** Native HTTP istekleri
- **Authorization Header:** `Bearer <token>` formatı
- **localStorage:** Token saklama
- **Try-catch-finally:** Hata yönetimi

### **Routing Kavramları:**
- **BrowserRouter:** URL yönetimi
- **Routes:** Route tanımları
- **Route:** Tek bir route
- **Navigate:** Otomatik yönlendirme

---

## 🐛 Bilinen Sorunlar

1. **TypeScript jwt.sign() uyarısı:** 
   - Backend `tsconfig.json` → `module: "NodeNext"`
   - Çalışıyor ama altı kırmızı (görmezden gel)

2. **CORS hatası:**
   - Backend'de `app.use(cors())` olduğundan emin ol

3. **Token localStorage'da kalıyor:**
   - Production için daha güvenli httpOnly cookie kullan

---

## 💡 Öğrenilen Önemli Kavramlar

### **Bearer Token Kimlik Doğrulama:**
- `Bearer` rastgele değil, HTTP standardı (RFC 6750)
- Backend şunu bekler: `Authorization: Bearer <token>`
- Token otomatik olarak her API isteğine eklenir

### **Spread Operatörü (`...`):**
```typescript
const config = {
  ...options,          // options'taki tüm özellikleri yay
  headers: {
    ...options?.headers  // Özellikle header'ları yay
  }
}
```

### **localStorage:**
- Tarayıcı depolama alanı (sayfa yenilense bile kalır)
- Anahtar-değer çiftlerini string olarak saklar
- Güvenli değil (XSS saldırılarına açık)
- Öğrenme projeleri için iyi

### **Try-Catch-Finally:**
```typescript
try {
  // Hata verebilecek kod
} catch (err) {
  // Hatayı yakala
} finally {
  // Her zaman çalışır (hata olsa bile)
}
```

---

## 📄 Lisans

MIT

---

## 📧 İletişim

Sorular için: [GitHub Issues]

---

**Son Güncelleme:** 18 Kasım 2025  
**Versiyon:** 1.0.0  
**Durum:** ✅ Auth sistemi tamamlandı, frontend kurulumu yapıldı

---

## 🎓 Proje Amacı

Bu bir **öğrenme projesi** ve şunları anlamak için yapıldı:
- Full-stack geliştirme
- Frontend ve backend'de TypeScript
- React hooks ve state yönetimi
- RESTful API tasarımı
- JWT kimlik doğrulama
- Katmanlı mimari
- Component tabanlı UI tasarımı

**Öğretmen-Öğrenci yaklaşımı:** Kod, öğrenme amaçlı olarak detaylı şekilde yorumlanmış ve belgelenmiştir.

---

## 🔄 Akışlar

### **Kayıt Akışı:**
```
1. Kullanıcı formu doldurur
2. RegisterForm → handleSubmit
3. RegisterPage → handleRegister
4. authService.register() → Backend'e istek
5. Backend → Şifreyi hashle, veritabanına kaydet
6. Backend → JWT token oluştur
7. Frontend → Token'ı localStorage'a kaydet
8. Frontend → /login sayfasına yönlendir
```

### **Giriş Akışı:**
```
1. Kullanıcı email/şifre girer
2. LoginForm → handleSubmit
3. LoginPage → handleLogin
4. authService.login() → Backend'e istek
5. Backend → Email kontrol et, şifre doğrula
6. Backend → JWT token oluştur
7. Frontend → Token'ı localStorage'a kaydet
8. Frontend → /dashboard sayfasına yönlendir
```

### **API İstek Akışı (Token ile):**
```
1. Kullanıcı bir işlem yapar (örn: kategori ekle)
2. api.post('/categories', data) çağrılır
3. api.ts → localStorage'dan token'ı alır
4. api.ts → Header'a ekler: Authorization: Bearer <token>
5. fetch() → Backend'e istek gönderir
6. Backend → Token'ı kontrol eder
7. Backend → İşlemi yapar, yanıt döner
8. Frontend → Yanıtı işler, kullanıcıya gösterir
```

---

## 📖 Detaylı Açıklamalar

### **Neden Katmanlı Mimari?**

**Backend'de:**
- **Separation of Concerns:** Her katmanın tek bir sorumluluğu var
- **Maintainability:** Kodu güncellemek kolay
- **Testability:** Her katmanı ayrı test edebilirsin
- **Scalability:** Büyük projelerde yönetimi kolay

**Frontend'de:**
- **Reusability:** Component'leri başka yerlerde kullanabilirsin
- **Organization:** Kod daha düzenli
- **Team Work:** Farklı kişiler farklı component'ler üzerinde çalışabilir

---

### **Neden TypeScript?**

- **Tip Güvenliği:** Hataları runtime'dan önce yakala
- **IntelliSense:** VS Code otomatik tamamlama
- **Refactoring:** Kod değiştirmek daha güvenli
- **Documentation:** Tip tanımları canlı dokümantasyon gibi

---

### **Neden React Hooks?**

- **Basit:** Class component'lerden daha kolay
- **Modern:** React'in önerdiği yöntem
- **Performans:** Daha performanslı
- **Functional:** Fonksiyonel programlama prensipleri

---

### **Neden JWT?**

- **Stateless:** Server'da session saklamaya gerek yok
- **Scalable:** Mikroservis mimarisine uygun
- **Cross-domain:** Farklı domain'lerde kullanılabilir
- **Mobile-friendly:** Mobil uygulamalarda kolay

---

## 🎯 Sonraki Adımlar

### **Kısa Vadeli (1-2 hafta):**
1. AuthContext ekle (global kullanıcı state'i)
2. Protected routes ekle (token kontrolü)
3. Kategori CRUD sistemi
4. İşlem (Transaction) CRUD sistemi

### **Orta Vadeli (1 ay):**
1. Dashboard istatistikleri
2. Grafik ve raporlar
3. Bütçe takip sistemi
4. Bildirim sistemi

### **Uzun Vadeli (2-3 ay):**
1. Export/Import (Excel, PDF)
2. Çoklu para birimi
3. Profil yönetimi
4. Dark mode

---

## 🌟 İyi Pratikler

### **Backend:**
- ✅ Şifreleri asla düz metin olarak saklama
- ✅ Environment variable'ları kullan
- ✅ Error handling yap
- ✅ Validation yap (email formatı, şifre uzunluğu)
- ✅ Logging ekle
- ✅ Rate limiting ekle (DDoS koruması)

### **Frontend:**
- ✅ Token'ı güvenli şekilde sakla
- ✅ Sensitive bilgileri console.log'a yazma
- ✅ Loading state'leri göster
- ✅ Error mesajları kullanıcı dostu olsun
- ✅ Form validation ekle
- ✅ Responsive design yap

---

## 🔍 Debugging İpuçları

### **Backend:**
```typescript
// Console log ekle
console.log('Request body:', req.body);
console.log('Token:', token);

// Prisma sorguları
console.log('User found:', user);
```

### **Frontend:**
```typescript
// Console log ekle
console.log('Form data:', loginData);
console.log('API response:', response);

// Network tab'ı kontrol et (F12 → Network)
// Request headers'ı kontrol et
// Response body'yi kontrol et
```

---

## ✨ Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır! Büyük değişiklikler için önce issue açın.

---

## 🙏 Teşekkürler

Bu proje öğrenme amaçlı yapılmıştır. Sorularınız veya önerileriniz için issue açabilirsiniz.

**Mutlu Kodlamalar! 🚀**