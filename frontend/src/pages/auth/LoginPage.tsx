import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { login } from '../../services/authService';
import type { LoginData } from '../../types';

export const LoginPage = () => {
  
  // State'ler
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Sayfa yönlendirme için (login olduktan sonra dashboard'a gideceğiz)
  const navigate = useNavigate();

  // Form gönderildiğinde çalışacak fonksiyon
  const handleLogin = async (loginData: LoginData) => {
    try {
      setIsLoading(true);  // Loading başladı
      setError('');        // Eski hataları temizle

      // Backend'e istek at (authService kullanıyoruz)
      const response = await login(loginData);

      console.log('Login başarılı:', response);

      // TODO: Context'e kullanıcıyı kaydet
      // TODO: Dashboard'a yönlendir
      // navigate('/dashboard');

      console.log('Login başarılı:', response);
      navigate('/dashboard'); 

    } catch (err) {
      // Hata olursa
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setIsLoading(false); // Loading bitti
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Giriş Yap</h1>
      
      <LoginForm 
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Hesabın yok mu? <a href="/register">Kayıt Ol</a>
      </p>
    </div>
  );
};