import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
// 1. İsim çakışmasını önlemek için 'as loginAPI' diyoruz
import { login as loginAPI } from '../../services/authService'; 
import type { LoginData } from '../../types';
// 2. Context Hook'unu import ediyoruz
import { useAuth } from '../../context/AuthContext'; 

export const LoginPage = () => {
  
  // 3. Context'ten 'login' fonksiyonunu alıyoruz
  const { login } = useAuth(); 

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (loginData: LoginData) => {
    try {
      setIsLoading(true);
      setError('');

      // 4. Backend'e istek atıyoruz (loginAPI ismini kullandık)
      const response = await loginAPI(loginData);

      console.log('API Cevabı:', response);

      // EĞER RESPONSE YAPIN README'DEKİ GİBİYSE:
      // response.data.token ve response.data.user şeklinde gelmeli.
      // API yapına göre burayı kontrol etmen gerekebilir.
      
      if (response.data && response.data.token) {
          // 5. İŞTE EKSİK OLAN PARÇA BU! 
          // Context'i güncelliyoruz. Artık uygulama giriş yaptığını biliyor.
          login(response.data.token, response.data.user);
          
          console.log('Context güncellendi, yönlendiriliyor...');
          
          // 6. Şimdi güvenle yönlendirebilirsin
          navigate('/dashboard'); 
      } else {
          setError('Giriş başarılı ama veri eksik geldi.');
      }

    } catch (err) {
      console.error("Login Hatası:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
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