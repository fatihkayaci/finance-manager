import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCategories, createCategory, deleteCategory } from '../services/categoryService';
import { getTransactions, createTransaction, deleteTransaction } from '../services/transactionService'; // Yeni import
import type { Category, Transaction } from '../types';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  
  // --- STATE'LER ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // İşlemler listesi
  const [loading, setLoading] = useState(true);

  // Kategori Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');

  // İşlem Form State (YENİ)
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Bugünün tarihi
  const [selectedCatId, setSelectedCatId] = useState<string>(''); // Seçilen kategori ID'si
  const [transType, setTransType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');

  // --- BAŞLANGIÇ (Verileri Çek) ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Promise.all ile ikisini aynı anda çekiyoruz (Hız için)
      const [catRes, transRes] = await Promise.all([
        getCategories(),
        getTransactions()
      ]);

      if (catRes.success) setCategories(catRes.data);
      if (transRes.success) setTransactions(transRes.data);

    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- KATEGORİ İŞLEMLERİ ---
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      const res = await createCategory({ name: newCatName, type: newCatType });
      if (res.success) {
        setCategories([res.data, ...categories]);
        setNewCatName('');
      }
    } catch (error) { alert('Kategori eklenemedi'); }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    try {
      await deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) { alert('Silinemedi'); }
  };

  // --- İŞLEM (TRANSACTION) EKLEME ---
  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !selectedCatId) {
      alert("Lütfen tutar ve kategori seçin!");
      return;
    }

    try {
      const res = await createTransaction({
        description,
        amount: parseFloat(amount),
        date,
        type: transType,
        categoryId: parseInt(selectedCatId)
      });

      if (res.success) {
        setTransactions([res.data, ...transactions]); // Listeye ekle
        setAmount('');
        setDescription('');
      }
    } catch (error) {
      alert('İşlem eklenemedi!');
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!confirm('Bu işlemi silmek istiyor musun?')) return;
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) { alert('Silinemedi'); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#333' }}>💰 Kasa App</h1>
        <div>
          <span style={{ marginRight: '15px' }}>👤 {user?.username}</span>
          <button onClick={logout} style={styles.logoutBtn}>Çıkış</button>
        </div>
      </header>

      {/* --- ANA IZGARA (GRID) --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* SOL KOLON: FORM ALANI */}
        <div>
          {/* 1. İŞLEM EKLEME FORMU */}
          <div style={styles.card}>
            <h3>💸 Yeni İşlem Ekle</h3>
            <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Gelir/Gider Seçimi */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button"
                  onClick={() => setTransType('EXPENSE')}
                  style={{ ...styles.typeBtn, background: transType === 'EXPENSE' ? '#ffebee' : '#eee', border: transType === 'EXPENSE' ? '1px solid red' : 'none', color: transType === 'EXPENSE' ? 'red' : 'black' }}
                >
                  Gider
                </button>
                <button 
                  type="button"
                  onClick={() => setTransType('INCOME')}
                  style={{ ...styles.typeBtn, background: transType === 'INCOME' ? '#e8f5e9' : '#eee', border: transType === 'INCOME' ? '1px solid green' : 'none', color: transType === 'INCOME' ? 'green' : 'black' }}
                >
                  Gelir
                </button>
              </div>

              <input type="number" placeholder="Tutar (TL)" value={amount} onChange={e => setAmount(e.target.value)} style={styles.input} />
              <input type="text" placeholder="Açıklama (Opsiyonel)" value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={styles.input} />
              
              {/* Kategori Seçimi (Sadece seçilen türe uygun olanları gösterelim) */}
              <select value={selectedCatId} onChange={e => setSelectedCatId(e.target.value)} style={styles.input}>
                <option value="">-- Kategori Seç --</option>
                {categories
                  .filter(c => c.type === transType) // Sadece Gelir ise Gelir kategorileri
                  .map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <button type="submit" style={styles.submitBtn}>Kaydet</button>
            </form>
          </div>

          {/* 2. KATEGORİ EKLEME (KÜÇÜK FORM) */}
          <div style={{ ...styles.card, marginTop: '20px' }}>
            <h4>➕ Hızlı Kategori Ekle</h4>
            <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '5px' }}>
              <input type="text" placeholder="Kategori adı" value={newCatName} onChange={e => setNewCatName(e.target.value)} style={{...styles.input, flex:1}} />
              <select value={newCatType} onChange={e => setNewCatType(e.target.value as any)} style={styles.input}>
                <option value="EXPENSE">Gider</option>
                <option value="INCOME">Gelir</option>
              </select>
              <button type="submit" style={{...styles.submitBtn, width: 'auto'}}>Ekle</button>
            </form>
          </div>
        </div>

        {/* SAĞ KOLON: LİSTELER */}
        <div>
          {/* SON İŞLEMLER LİSTESİ */}
          <h3>📋 Son İşlemler</h3>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {loading ? <p>Yükleniyor...</p> : transactions.map(t => (
              <div key={t.id} style={styles.transactionItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   {/* Renkli Yuvarlak Simge */}
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', 
                    background: t.type === 'INCOME' ? '#e8f5e9' : '#ffebee',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    {t.type === 'INCOME' ? '💰' : '💸'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{t.category?.name || 'Genel'}</div>
                    <div style={{ fontSize: '12px', color: '#777' }}>{t.description || t.date.split('T')[0]}</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: t.type === 'INCOME' ? 'green' : 'red' 
                  }}>
                    {t.type === 'INCOME' ? '+' : '-'}{parseFloat(t.amount).toFixed(2)} ₺
                  </span>
                  <button onClick={() => handleDeleteTransaction(t.id)} style={styles.deleteBtn}>🗑️</button>
                </div>
              </div>
            ))}
             {transactions.length === 0 && !loading && <p>Henüz işlem yok.</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- CSS STYLES (JS OBJECT) ---
const styles: any = {
  card: { background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', outline: 'none' },
  submitBtn: { padding: '10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  logoutBtn: { background: '#ff4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
  typeBtn: { flex: 1, padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  transactionItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'white', borderRadius: '8px', marginBottom: '10px', border: '1px solid #eee' },
  deleteBtn: { background: 'transparent', border: 'none', cursor: 'pointer' }
};