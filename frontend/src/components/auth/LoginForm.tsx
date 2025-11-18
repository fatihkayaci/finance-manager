import { useState } from 'react';
import type { LoginData } from '../../types';

// Props tipi (Parent'tan ne alacak?)
interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  
  // State'ler (form verilerini tutuyoruz)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form gönderildiğinde
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    
    // Parent'a veriyi gönder
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@email.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Şifre:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          required
        />
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
};