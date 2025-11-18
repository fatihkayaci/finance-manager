import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { register } from '../../services/authService';
import type { RegisterData } from '../../types';

export const RegisterPage = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (registerData: RegisterData) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await register(registerData);

      console.log('Kayıt başarılı:', response);

      alert('Kayıt başarılı! Token: ' + response.data.token);
      
      // Login sayfasına yönlendir
      navigate('/login');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Kayıt olurken bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Kayıt Ol</h1>
      
      <RegisterForm 
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
      />

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Zaten hesabın var mı? <a href="/login">Giriş Yap</a>
      </p>
    </div>
  );
};