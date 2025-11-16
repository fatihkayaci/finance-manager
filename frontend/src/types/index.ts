// ============================================
// KULLANICI TİPLERİ
// ============================================
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// ============================================
// KATEGORİ TİPLERİ
// ============================================
export interface Category {
  id: number;
  name: string;
  icon: string;
  color: 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'pink';
  type: 'income' | 'expense';
  userId: number;
}

export interface CreateCategoryData {
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

// ============================================
// TRANSACTION (GELİR/GİDER) TİPLERİ
// ============================================
export interface Transaction {
  id: number;
  amount: number;
  description: string;
  categoryId: number;
  category?: Category;  // İlişkili kategori bilgisi (opsiyonel)
  type: 'income' | 'expense';
  paymentMethod: 'Nakit' | 'Kredi Kartı' | 'Banka Transferi';
  date: string;
  createdAt: string;
  userId: number;
}

export interface CreateTransactionData {
  amount: number;
  description: string;
  categoryId: number;
  type: 'income' | 'expense';
  paymentMethod: string;
  date: string;
}

// ============================================
// BÜTÇE TİPLERİ
// ============================================
export interface Budget {
  id: number;
  categoryId: number;
  category?: Category;
  limit: number;
  month: string;  // "2025-01"
  userId: number;
}

export interface CreateBudgetData {
  categoryId: number;
  limit: number;
  month: string;
}

// ============================================
// API RESPONSE TİPLERİ
// ============================================
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}