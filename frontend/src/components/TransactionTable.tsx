import './TransactionTable.css';

interface Transaction {
  id: number;
  date: string;
  category: Category;
  categoryIcon: string;
  description: string;
  paymentMethod: string;
  paymentIcon: string;
  amount: number;
  type: 'income' | 'expense';
}
interface Category {
  id: number;
  name: string;
  icon: string;
  type?: string;
  color: string;
}
interface Props{
  data: Transaction[];
}

export default function TransactionTable({data} : Props) {

  const totalRecords = data.length;
  console.log(data);
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
            {data.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>
                  <span className="category-cell">
                    {transaction.category?.icon} {transaction.category?.name}
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