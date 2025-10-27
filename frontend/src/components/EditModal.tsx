import './EditModal.css';
import { useState, useEffect } from "react";
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; // Düzenlenecek transaction
  onSave: (updatedData: any) => void;
}

export default function EditModal({ isOpen, onClose, data, onSave }: EditModalProps) {
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    useEffect(() => {
        if (data) {
            setAmount(data.amount);
            setCategory(data.category);
            setDescription(data.description);
            setDate(data.dateISO);
        }
    }, [data]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  // Sayfanın yenilenmesini engelle
        
        onSave({
            amount,
            category,
            description,
            date
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
                        <label>Tutar (₺)</label>
                        <input 
                        type="number" 
                        placeholder="0.00" 
                        value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
                    </div>

                    <div className="form-group">
                        <label>Kategori</label>
                        <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option>Restoran</option>
                        <option>Online</option>
                        <option>Catering</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Açıklama</label>
                        <input 
                        type="text" 
                        placeholder="gelir açıklaması..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label>Tarih</label>
                        <input type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}/>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>İptal</button>
                        <button type="submit" className="btn-save" onClick={onSave}>Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
}