import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// 1. ReactNode tipini import ediyoruz
import { type ReactNode } from 'react'; 

interface ProtectedRouteProps {
  children: ReactNode; 
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Kontrol ediliyor...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. TypeScript burada hata verirse children'ı <> fragment içine alabiliriz
  return <>{children}</>;
};