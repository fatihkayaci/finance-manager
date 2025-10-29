import './TransactionList.css';
import EditModal from './EditModal';
import {useState} from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface transactionData {
  id: number;
  date: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod?: string;   // ← YENİ
  commission?: number;      // ← YENİ
}

interface TransactionListProps {
  data: transactionData[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedData: any) => void;
  type: "income" | "expense";
}

export default function TransactionList({ data, onDelete, onUpdate, type }: TransactionListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<transactionData | null>(null);

  const handleDelete = async (id: number) => {
    console.log('📤 siliniyor:', id);
    try {
      const response = await fetch(`${API_BASE_URL}/${type}/${id}`, {
        method: 'DELETE',
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('API hatası');
      }
      console.log("silindi!");
      onDelete(id);
    } catch (error) {
      console.error('❌ Hata:', error);
    }
  }

  const handleSave = async (id: number, updatedData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${type}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        throw new Error('API hatası');
      }
      
      const result = await response.json(); // ← Backend'den dönen güncel veriyi al
      console.log('✅ Güncellendi:', result);

      const dateObj = new Date(result.date);

      const formatted = {
        ...result, // ← Backend'den gelen veriyi kullan (commission dahil)
        dateISO: dateObj.toISOString().split('T')[0],
        date: dateObj.toLocaleDateString('tr-TR', { 
          day: 'numeric', 
          month: 'long' 
        })
      };

      onUpdate(id, formatted);
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('❌ Hata:', error);
    }
  }

  const handleUpdate = async (id: number) => {
    const transaction = data.find(t => t.id === id);
    setSelectedTransaction(transaction || null);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <div className="table-title-section">
            <span className="table-icon">📋</span>
            <h3 className="table-title">{type === "income"? "Gelir": "Gider"} Listesi</h3>
          </div>

          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">Tarih Aralığı</label>
              <select className="filter-select">
                <option>Bugün</option>
                <option>Bu Hafta</option>
                <option>Bu Ay</option>
                <option>Bu Yıl</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Kategori</label>
              <select className="filter-select">
                <option>Tümü</option>
                <option>Restoran</option>
                <option>Paket Servis</option>
                <option>Online</option>
                <option>Catering</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sıralama</label>
              <select className="filter-select">
                <option>En Yeni</option>
                <option>En Eski</option>
                <option>En Yüksek Tutar</option>
                <option>En Düşük Tutar</option>
              </select>
            </div>
          </div>
        </div>

        <table className="income-table">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Açıklama</th>
              <th>Kategori</th>
              <th>Ödeme</th> {/* ← YENİ KOLON */}
              <th>Tutar</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="date-cell">{transaction.date}</div>
                  </td>
                  <td className="description-cell">{transaction.description}</td>
                  <td>
                    <span className={`category-badge category-${transaction.category.toLowerCase()}`}>
                      {transaction.category}
                    </span>
                  </td>
                  
                  {/* ✨ YENİ: Ödeme Yöntemi */}
                  <td>
                    <span className="payment-badge">
                      {transaction.paymentMethod === 'Kredi Kartı' && '💳'}
                      {transaction.paymentMethod === 'Nakit' && '💵'}
                      {transaction.paymentMethod === 'Banka Transferi' && '🏦'}
                      {' '}{transaction.paymentMethod || 'Nakit'}
                    </span>
                  </td>

                  {/* ✨ YENİ: Net Tutar + Komisyon Bilgisi */}
                  <td className="amount-cell">
                    <div>₺{transaction.amount.toFixed(2)}</div>
                    {transaction.commission && transaction.commission > 0 && (
                      <div className="commission-info">
                        <small>
                          (Brüt: ₺{(transaction.amount + transaction.commission).toFixed(2)})
                        </small>
                        <br />
                        <small className="commission-text">
                          Komisyon: -₺{transaction.commission.toFixed(2)}
                        </small>
                      </div>
                    )}
                  </td>

                  <td className="actions-cell">
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => handleUpdate(transaction.id)}
                    >
                      ✏️ Düzenle
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      🗑️ Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                  {/* ↑ 5'ten 6'ya değiştirdik (yeni kolon eklendi) */}
                  Henüz gelir kaydı yok
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination-container">
          <div className="pagination-info">
            Toplam 156 gelir kaydından 1-5 arası gösteriliyor
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Önceki</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-dots">...</span>
            <button className="pagination-btn">16</button>
            <button className="pagination-btn">Sonraki</button>
          </div>
        </div>
      </div>

      <EditModal 
        isOpen={isModalOpen}
        data={selectedTransaction}
        onClose={() => setIsModalOpen(false)}
        onSave={(updatedData) => {
          if (selectedTransaction) {
            handleSave(selectedTransaction.id, updatedData);
          }
        }}
      />
    </>
  );
}