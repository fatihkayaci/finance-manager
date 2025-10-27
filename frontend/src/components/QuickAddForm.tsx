import { useState } from 'react';
import './QuickAddForm.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TransactionType {
  id: number;
  date: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
  type: string;
}

interface QuickAddFormProps {
  type?: "income" | "expense";
  onAdd: (income: TransactionType) => void;
}

export default function QuickAddForm({ type = "income", onAdd }: QuickAddFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Restoran',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    console.log('📤 Gönderiliyor:', formData);

    try {
      const response = await fetch(`${API_BASE_URL}/income`, {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date
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
        category: 'Restoran',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      onAdd(createdIncome);

    } catch (error) {
      console.error('❌ Hata:', error);
    }
  };
  
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
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Restoran">Restoran Satışları</option>
              <option value="Online">Online Sipariş</option>
              <option value="Paket Servis">Paket Servis</option>
              <option value="Catering">Catering</option>
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
              required
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