// App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import  DashboardPage  from './pages/DashboardPage';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ana sayfa → Login'e yönlendir */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login sayfası */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;