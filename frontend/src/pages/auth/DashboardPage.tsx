export const DashboardPage = () => {
  
  // Token'ı kontrol et
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Hoş geldin! 🎉</p>
      
      {token && (
        <div>
          <p>Token mevcut: {token.substring(0, 20)}...</p>
          <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      )}
    </div>
  );
};