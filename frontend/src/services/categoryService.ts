import { api } from './api'; // Senin daha önce yazdığın, token ekleyen fetch yapısı
import type { Category, CreateCategoryData, ApiResponse } from '../types';

// Tüm kategorileri getir
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  // api.get fonksiyonu, otomatik olarak Token'ı header'a ekliyor (api.ts sayesinde)
  return await api.get<ApiResponse<Category[]>>('/categories');
};

// Yeni kategori ekle
export const createCategory = async (data: CreateCategoryData): Promise<ApiResponse<Category>> => {
  return await api.post<ApiResponse<Category>>('/categories', data);
};

// Sil
export const deleteCategory = async (id: number): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/categories/${id}`);
};