import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  // 1. Context'ten kullanıcı verisini ve çıkış fonksiyonunu çekiyoruz
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
        marginBottom: '20px'
      }}>
        <h1>💰 Kasa App</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Kullanıcı adını gösteriyoruz */}
          <span>Hoşgeldin, <b>{user?.username}</b></span>
          
          {/* Çıkış Butonu */}
          <button 
            onClick={logout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </header>

      <main>
        <h2>Genel Durum</h2>
        <p>Burada hesap özetleri ve grafikler yer alacak...</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginTop: '20px' 
        }}>
          {/* Örnek Kartlar */}
          <div style={cardStyle}>
            <h3>Toplam Bakiye</h3>
            <p style={{ fontSize: '24px', color: 'green' }}>₺ 0.00</p>
          </div>
          <div style={cardStyle}>
            <h3>Gelirler</h3>
            <p style={{ fontSize: '24px', color: 'blue' }}>₺ 0.00</p>
          </div>
          <div style={cardStyle}>
            <h3>Giderler</h3>
            <p style={{ fontSize: '24px', color: 'red' }}>₺ 0.00</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Basit bir stil objesi
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};