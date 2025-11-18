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