import { useState, useEffect } from 'react';
import './QuickAddForm.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TransactionType {
  id: number;
  date: string;
  createdAt: string;
  time?: string;
  description: string;
  categoryId: number;
  amount: number;
  type: string;
  paymentMethod?: string;
}
interface Category {
  id: number;
  name: string;
  icon: string;
  type?: string;
  color: string;
}
interface QuickAddFormProps {
  type?: "income" | "expense";
  onAdd: (income: TransactionType) => void;
}

export default function QuickAddForm({ type = "income", onAdd }: QuickAddFormProps) {
  
  const [category, setCategory] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    amount: '',
    categoryId: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Nakit'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('📤 Gönderiliyor:', formData);

    try {
      const response = await fetch(`${API_BASE_URL}/${type}`, {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          categoryId: formData.categoryId,
          description: formData.description,
          date: formData.date,
          paymentMethod: formData.paymentMethod // ← YENİ
        })
      });

      if (!response.ok) {
        throw new Error('API hatası');
      }

      const createdIncome = await response.json();
      console.log('✅ Başarılı:', createdIncome);

      // Formu temizle
      setFormData({
        amount: '',
        categoryId: 0,
        description: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'Nakit'
      });
      onAdd(createdIncome);

    } catch (error) {
      console.error('❌ Hata:', error);
    }
  };
  
  useEffect(() => {
      fetch(`${API_BASE_URL}/category/${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCategory(data);
      })
      .catch(error => {
        console.error('❌ Hata:', error);
      });
    }, [type]);
  return (
    <>
      <div className="quick-add-container">
        <div className="form-header">
          <span className="form-icon">⚡</span>
          <h3 className="form-title">Hızlı {type === "income"? "Gelir": "Gider"} Ekleme</h3>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          
          <div className="form-group">
            <label className="form-label">Tutar (₺)</label>
            <input 
              type="number" 
              placeholder="0.00"
              className="form-input"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kategori</label>
            <select 
              className="form-select"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
            >
              <option value="">Kategori Seçin</option>
              {category.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Ödeme Yöntemi</label>
            <select 
              className="form-select"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            >
              <option value="Nakit">💵 Nakit</option>
              <option value="Kredi Kartı">💳 Kredi Kartı</option>
              <option value="Banka Transferi">🏦 Banka Transferi</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Açıklama</label>
            <input 
              type="text" 
              placeholder={`${type === "income"? "Gelir": "Gider"} açıklaması...`}
              className="form-input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tarih</label>
            <input 
              type="date" 
              className="form-date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <button 
            type="submit"
            className="btn-submit" 
            style={type === "income" 
              ? { backgroundColor: "#22c55e" } 
              : { backgroundColor: "#ef4444" }
            }
          >
            Ekle
          </button>
        </form>
      </div>
    </>
  );
}