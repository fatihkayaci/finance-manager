// Backend'den gelen User tipini tanımlıyoruz
export interface User {
  id: number;
  username: string;
  email: string;
}

// Login/Register formlarında kullanacağız
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Backend'den dönen response tipi
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}
// 1. Kategori Modeli (Backend'den gelen veri)
export interface Category {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE'; // Sadece bu iki değer olabilir
  userId: number;
}

// 2. Yeni Kategori Eklerken Göndereceğimiz Veri
export interface CreateCategoryData {
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

// 3. API Cevaplarının Genel Kalıbı
// (Backend'deki res.json({ success: true, data: ... }) yapısı)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
export interface Transaction {
  id: number;
  description: string;
  amount: string; // Backend'den string olarak gelebilir (Decimal)
  type: 'INCOME' | 'EXPENSE';
  date: string;
  categoryId: number;
  category?: Category; // İlişkili kategori bilgisi (Opsiyonel)
}

// 4. Yeni İşlem Oluşturma Verisi
export interface CreateTransactionData {
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  categoryId: number;
}