import { api } from './api';
import type { Transaction, CreateTransactionData, ApiResponse } from '../types';

// İşlemleri Getir
export const getTransactions = async (): Promise<ApiResponse<Transaction[]>> => {
  return await api.get<ApiResponse<Transaction[]>>('/transactions');
};

// Yeni İşlem Ekle
export const createTransaction = async (data: CreateTransactionData): Promise<ApiResponse<Transaction>> => {
  return await api.post<ApiResponse<Transaction>>('/transactions', data);
};

// İşlem Sil
export const deleteTransaction = async (id: number): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/transactions/${id}`);
};