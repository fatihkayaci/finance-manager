import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCategories, createCategory, deleteCategory } from '../services/categoryService';
import type { Category } from '../types';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  
  // --- STATE'LER (Durumlar) ---
  // Kategorileri tutan liste
  const [categories, setCategories] = useState<Category[]>([]);
  // Sayfa yükleniyor mu?
  const [loading, setLoading] = useState(true);
  // Form inputları
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');

  // --- 1. SAYFA AÇILINCA ÇALIŞIR ---
  useEffect(() => {
    fetchCategories();
  }, []);

  // API'den verileri çeken fonksiyon
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. KATEGORİ EKLEME ---
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfa yenilenmesin
    if (!newCatName.trim()) return;

    try {
      const res = await createCategory({ name: newCatName, type: newCatType });
      if (res.success) {
        // Listeye yeni geleni ekle (Tekrar API çekmeye gerek yok, optimizasyon)
        setCategories([res.data, ...categories]); 
        setNewCatName(''); // Kutuyu temizle
      }
    } catch (error) {
      alert('Ekleme başarısız oldu!');
    }
  };

  // --- 3. KATEGORİ SİLME ---
  const handleDelete = async (id: number) => {
    if (!confirm('Silmek istediğine emin misin?')) return;

    try {
      await deleteCategory(id);
      // UI'dan da kaldır
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      alert('Silinemedi!');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Üst Bar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
        <h1>💰 Kasa Yönetimi</h1>
        <div>
          <span style={{ marginRight: '10px' }}>Hoşgeldin, <b>{user?.username}</b></span>
          <button onClick={logout} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Çıkış</button>
        </div>
      </header>

      {/* Ekleme Formu */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>➕ Yeni Kategori Ekle</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Kategori adı (Örn: Market, Maaş)"
            style={{ flex: 1, padding: '8px' }}
          />
          <select 
            value={newCatType} 
            onChange={(e) => setNewCatType(e.target.value as 'INCOME' | 'EXPENSE')}
            style={{ padding: '8px' }}
          >
            <option value="EXPENSE">Gider (Harcama)</option>
            <option value="INCOME">Gelir (Kazanç)</option>
          </select>
          <button type="submit" style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer' }}>Ekle</button>
        </form>
      </div>

      {/* Liste */}
      <h3 style={{ marginTop: '30px' }}>📂 Kategorilerim</h3>
      
      {loading ? <p>Yükleniyor...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.length === 0 && <p style={{ color: '#888' }}>Henüz kategori yok.</p>}
          
          {categories.map((cat) => (
            <li key={cat.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee',
              background: cat.type === 'INCOME' ? '#e8f5e9' : '#ffebee' // Gelir yeşil, Gider kırmızı ton
            }}>
              <div>
                <strong>{cat.name}</strong>
                <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '10px' }}>
                  ({cat.type === 'INCOME' ? 'Gelir' : 'Gider'})
                </span>
              </div>
              <button 
                onClick={() => handleDelete(cat.id)}
                style={{ background: 'transparent', border: '1px solid #ccc', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px' }}
              >
                Sil 🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};