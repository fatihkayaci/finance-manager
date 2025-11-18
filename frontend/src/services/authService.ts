import { api } from './api';
import type { AuthResponse, LoginData, RegisterData } from '../types';

// ============================================
// LOGIN FONKSİYONU
// ============================================
export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', loginData);
  
  // Token'ı kaydet
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  
  return response;
};

// ============================================
// REGISTER FONKSİYONU
// ============================================
export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', registerData);
  
  // Token'ı kaydet
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  
  return response;
};

// ============================================
// LOGOUT FONKSİYONU
// ============================================
export const logout = (): void => {
  localStorage.removeItem('token');
};