import Logo from './Logo'
import './SideBar.css'
import { Link, useLocation } from 'react-router-dom'

function SideBar() {
    const location = useLocation();
    return (
        <div className="sidebar">
            <div className="logo">
                <Logo />
            </div>
            <nav className="nav-menu">
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'nav-item active' : 'nav-item'}>
                    <div className="nav-icon">📊</div>
                    <span>Dashboard</span>
                </Link>
                <Link to="/income" className={location.pathname === '/income' ? 'nav-item active' : 'nav-item'}>
                    <div className="nav-icon">💰</div>
                    <span>Gelirler</span>
                </Link>
                <Link to="/expense" className={location.pathname === '/expense' ? 'nav-item active' : 'nav-item'}>
                    <div className="nav-icon">💸</div>
                    <span>Giderler</span>
                </Link>
                <Link to="/reports" className={location.pathname === '/reports' ? 'nav-item active' : 'nav-item'}>
                    <div className="nav-icon">📈</div>
                    <span>Raporlar</span>
                </Link>
                <Link to="/categories" className={location.pathname === '/categories' ? 'nav-item active' : 'nav-item'}>
                    <div className="nav-icon">📋</div>
                    <span>Kategoriler</span>
                </Link>
                <Link to="/budgetplan" className={location.pathname === '/budgetplan' ? 'nav-item active' : 'nav-item'}>
                    <div className="nav-icon">🎯</div>
                    <span>Bütçe Planı</span>
                </Link>
                <Link to="/settings" className={location.pathname === '/settings' ? 'nav-item active' : 'nav-item'}>
                    <div className="nav-icon">⚙️</div>
                    <span>Ayarlar</span>
                </Link>
            </nav>
        </div>
    )
}

export default SideBar