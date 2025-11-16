# 💰 Kasa Yönetimi Sistemi

Gelir ve gider takibi için profesyonel bir web uygulaması.

## 🚀 Teknolojiler

- **Frontend:** React + TypeScript + Vite
- **Routing:** React Router DOM
- **Styling:** Vanilla CSS
- **Backend:** Node.js + Express + PostgreSQL (ayrı repository)

## 📁 Proje Yapısı
```
src/
├── components/          # Tüm bileşenler
│   ├── common/          # Ortak bileşenler (Button, Card, Input)
│   ├── layout/          # Layout bileşenleri (Sidebar, Header)
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── auth/            # Giriş/Kayıt bileşenleri
│   ├── transactions/    # Gelir/Gider bileşenleri
│   ├── categories/      # Kategori bileşenleri
│   └── reports/         # Rapor bileşenleri
│
├── pages/               # Sayfa bileşenleri
│   ├── auth/
│   ├── DashboardPage.tsx
│   ├── IncomePage.tsx
│   ├── ExpensePage.tsx
│   ├── CategoryPage.tsx
│   ├── ReportsPage.tsx
│   └── BudgetPage.tsx
│
├── types/               # TypeScript tip tanımları
│   └── index.ts         # Tüm interface'ler
│
├── services/            # API servisleri
│   ├── api.ts           # Temel API yapılandırması
│   ├── authService.ts   # Kimlik doğrulama işlemleri
│   ├── transactionService.ts
│   └── categoryService.ts
│
├── hooks/               # Özel React hook'ları
│   ├── useAuth.ts
│   ├── useTransactions.ts
│   └── useCategories.ts
│
├── context/             # React Context (Durum yönetimi)
│   └── AuthContext.tsx
│
├── utils/               # Yardımcı fonksiyonlar
│   ├── formatters.ts    # Para formatı, tarih formatı vb.
│   └── constants.ts     # Sabit değerler
│
├── styles/              # Global CSS dosyaları
│   └── globals.css
│
├── App.tsx              # Ana uygulama + Yönlendirme
└── main.tsx             # Giriş noktası
```

## 🎯 Mimari Prensipler

### 1. Bileşen Ayrımı
- Her bileşen kendi klasöründe
- Bileşen + CSS birlikte
- Tek sorumluluk prensibi

### 2. Tip Güvenliği
- Tüm tipler `types/index.ts` dosyasında
- Her fonksiyon/bileşen tiplendirilmiş
- Generic'ler ile esnek yapı

### 3. Servis Katmanı
- API çağrıları bileşenlerden ayrı
- Tek bir `api.ts` temel yapılandırması
- Her özellik için ayrı servis dosyası

### 4. Yönlendirme Yapısı
- İç içe rotalar ile ortak layout
- `Layout.tsx` tüm sayfaları sarar
- `<Outlet />` ile dinamik içerik

## 🔑 Önemli Dosyalar

### `types/index.ts`
Tüm TypeScript tip/interface tanımları:
- User, Transaction, Category, Budget
- API istek/yanıt tipleri
- Form veri tipleri

### `services/api.ts`
Merkezi API yapılandırması:
- Temel URL ayarı
- Token yönetimi
- HTTP metodları (get, post, put, delete)
- Hata yakalama

### `App.tsx`
Ana yönlendirme yapısı:
- React Router yapılandırması
- İç içe rotalar
- Layout sarmalayıcı

### `components/layout/Layout.tsx`
Ortak layout yapısı:
- Sidebar + Header + İçerik
- `<Outlet />` ile dinamik sayfa render

## 🛠️ Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production için derle
npm run build
```

## 📦 Ortam Değişkenleri

`.env` dosyası oluşturun:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📋 Yapılacaklar

- [ ] Kategori sayfasını tamamla
- [ ] Dashboard sayfasını tamamla
- [ ] Gelir/Gider sayfalarını tamamla
- [ ] Raporlar sayfasını tamamla
- [ ] Kimlik doğrulama sistemini entegre et
- [ ] Backend bağlantısını kur

## 🎓 Öğrenme Notları

### Klasör Yapısı Mantığı

#### `components/`
Yeniden kullanılabilir UI parçaları. Her bileşen:
- Kendi klasöründe
- `.tsx` + `.css` dosyaları birlikte
- Props ile özelleştirilebilir

#### `pages/`
Rotalara karşılık gelen tam sayfalar:
- Sadece sayfa yapısı
- Bileşenleri birleştirir
- İş mantığı yok

#### `services/`
Backend ile iletişim:
- API çağrıları
- Veri çekme
- Hata yönetimi

#### `types/`
TypeScript tip tanımları:
- Interface'ler
- Type'lar
- Enum'lar (gelecekte)

#### `hooks/`
Özel React hook'ları:
- Durum yönetimi
- Yan etkiler
- Yeniden kullanılabilir mantık

## 🔄 Veri Akışı
```
Kullanıcı Eylemi (Buton Tıklama)
    ↓
Bileşen (onClick işleyicisi)
    ↓
Servis (API çağrısı)
    ↓
Backend API
    ↓
Servis (Yanıt)
    ↓
Bileşen (Durum güncelleme)
    ↓
UI Yeniden Render
```

## 📚 Kaynaklar

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Dokümantasyonu](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite Dokümantasyonu](https://vitejs.dev/)

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Özellik dalınızı oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Harika özellik ekle'`)
4. Dalınıza push edin (`git push origin feature/harika-ozellik`)
5. Pull Request açın

## 📄 Lisans

MIT

---

💡 **Not:** Bu proje eğitim amaçlı geliştirilmektedir.