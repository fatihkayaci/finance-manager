// components/layout/Sidebar.tsx

import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/income', icon: '💰', label: 'Gelirler' },
    { path: '/expense', icon: '💸', label: 'Giderler' },
    { path: '/categories', icon: '📑', label: 'Kategoriler' },
    { path: '/reports', icon: '📋', label: 'Raporlar' },
    { path: '/budget', icon: '🎯', label: 'Bütçe Planı' },
  ];

  return (
    <aside className="sidebar">
      {/* Logo & Başlık */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">💰</div>
          <h1 className="sidebar-title">Kasa Yönetimi</h1>
        </div>
        <p className="sidebar-subtitle">Mali Takip</p>
      </div>

      {/* Menü */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}