import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <Outlet />  {/* ← Sayfa içeriği buraya gelecek */}
        </main>
      </div>
    </div>
  );
}