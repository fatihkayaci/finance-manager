// TransactionTable.tsx
import './TransactionTable.css';

interface Transaction {
  id: number;
  date: string;
  category: string;
  categoryIcon: string;
  description: string;
  paymentMethod: string;
  paymentIcon: string;
  amount: number;
  type: 'income' | 'expense';
}

export default function TransactionTable() {
  // Örnek veri
  const transactions: Transaction[] = [
    {
      id: 1,
      date: '03.11.2025',
      category: 'Restoran',
      categoryIcon: '🍽️',
      description: 'Öğle Yemeği',
      paymentMethod: 'Kredi Kartı',
      paymentIcon: '💳',
      amount: 250.00,
      type: 'expense'
    },
    {
      id: 2,
      date: '02.11.2025',
      category: 'Maaş',
      categoryIcon: '💼',
      description: 'Aylık Maaş',
      paymentMethod: 'Banka Transferi',
      paymentIcon: '🏦',
      amount: 15000.00,
      type: 'income'
    },
    {
      id: 3,
      date: '01.11.2025',
      category: 'Market',
      categoryIcon: '🛒',
      description: 'Haftalık Alışveriş',
      paymentMethod: 'Nakit',
      paymentIcon: '💵',
      amount: 450.00,
      type: 'expense'
    },
    {
      id: 4,
      date: '01.11.2025',
      category: 'Ulaşım',
      categoryIcon: '🚗',
      description: 'Benzin',
      paymentMethod: 'Kredi Kartı',
      paymentIcon: '💳',
      amount: 350.00,
      type: 'expense'
    },
    {
      id: 5,
      date: '30.10.2025',
      category: 'Eğlence',
      categoryIcon: '🎬',
      description: 'Sinema',
      paymentMethod: 'Nakit',
      paymentIcon: '💵',
      amount: 180.00,
      type: 'expense'
    },
    {
      id: 6,
      date: '29.10.2025',
      category: 'Restoran',
      categoryIcon: '🍽️',
      description: 'Akşam Yemeği',
      paymentMethod: 'Kredi Kartı',
      paymentIcon: '💳',
      amount: 420.00,
      type: 'expense'
    },
    {
      id: 7,
      date: '28.10.2025',
      category: 'Market',
      categoryIcon: '🛒',
      description: 'Günlük Alışveriş',
      paymentMethod: 'Nakit',
      paymentIcon: '💵',
      amount: 120.00,
      type: 'expense'
    },
    {
      id: 8,
      date: '27.10.2025',
      category: 'Freelance',
      categoryIcon: '💻',
      description: 'Web Tasarım Projesi',
      paymentMethod: 'Banka Transferi',
      paymentIcon: '🏦',
      amount: 3500.00,
      type: 'income'
    },
  ];

  const totalRecords = 1234; // Backend'den gelecek

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>📋 Detaylı İşlem Listesi</h3>
        <span className="table-info">Toplam {totalRecords} kayıt bulundu</span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>Açıklama</th>
              <th>Ödeme Yöntemi</th>
              <th>Tutar</th>
              <th>Tip</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>
                  <span className="category-cell">
                    {transaction.categoryIcon} {transaction.category}
                  </span>
                </td>
                <td>{transaction.description}</td>
                <td>
                  <span className="payment-cell">
                    {transaction.paymentIcon} {transaction.paymentMethod}
                  </span>
                </td>
                <td className={`amount-${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </td>
                <td>
                  <span className={`badge badge-${transaction.type}`}>
                    {transaction.type === 'income' ? 'Gelir' : 'Gider'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Backend'den gelince eklenecek */}
      <div className="pagination">
        <span className="pagination-info">Sayfa 1 / 124</span>
      </div>
    </div>
  );
}