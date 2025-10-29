import './EditModal.css';
import { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onSave: (updatedData: any) => void;
}

export default function EditModal({ isOpen, onClose, data, onSave }: EditModalProps) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Nakit');

  useEffect(() => {
    if (data) {
      // Brüt tutarı göster (komisyon eklenerek)
      const displayAmount = data.paymentMethod === 'Kredi Kartı' 
        ? data.amount + (data.commission || 0)  // Net + Komisyon = Brüt
        : data.amount;
      
      setAmount(displayAmount);
      setCategory(data.category);
      setDescription(data.description);
      setDate(data.dateISO);
      setPaymentMethod(data.paymentMethod || 'Nakit');
    }
  }, [data]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      amount,
      category,
      description,
      date,
      paymentMethod
    });
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Gelir Düzenle</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Brüt Tutar (₺)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* 💳 Kredi Kartı seçiliyse komisyon bilgisini göster */}
          {paymentMethod === 'Kredi Kartı' && amount > 0 && (
            <div className="info-box">
              <p>💰 Net Tutar: <strong>{(amount * 0.8).toFixed(2)}₺</strong></p>
              <p>💳 Komisyon: <strong>{(amount * 0.2).toFixed(2)}₺</strong></p>
            </div>
          )}

          <div className="form-group">
            <label>Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Restoran</option>
              <option>Online</option>
              <option>Catering</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ödeme Yöntemi</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Nakit">💵 Nakit</option>
              <option value="Kredi Kartı">💳 Kredi Kartı</option>
              <option value="Banka Transferi">🏦 Banka Transferi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Açıklama</label>
            <input 
              type="text" 
              placeholder="gelir açıklaması..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tarih</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              İptal
            </button>
            <button type="submit" className="btn-save">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}