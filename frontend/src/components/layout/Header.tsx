// components/layout/Header.tsx

import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Hoş geldiniz</p>
        </div>
        <div className="header-right">
          <button className="notification-btn">🔔</button>
          <div className="user-avatar">K</div>
        </div>
      </div>
    </header>
  );
}