// services/api.ts

// Backend URL'ini .env'den al
const API_BASE_URL = 'https://cash-app-backend-wg7y.onrender.com/api';
// ============================================
// HELPER FUNCTION - HTTP İSTEĞİ YAPAN FONKSİYON
// ============================================
async function request<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<T> {
  
  // Token varsa header'a ekle
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // Hata kontrolü
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Bir hata oluştu');
  }

  return response.json();
}

// ============================================
// EXPORT EDİLEN METHODLAR
// ============================================
export const api = {
  // GET isteği
  get: <T>(endpoint: string) => 
    request<T>(endpoint, { method: 'GET' }),

  // POST isteği
  post: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // PUT isteği
  put: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // DELETE isteği
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};