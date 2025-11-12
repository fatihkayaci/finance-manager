import './CategorySummary.css';

interface Transaction {
  id: number;
  amount: number;
  category: {
    icon: string;
    name: string;
    color: string;
    type: 'income' | 'expense';
  };
  type: 'income' | 'expense';
  description: string;
  paymentMethod: string;
  date: string;
}

interface CategorySummaryProps {
  data: Transaction[];
}
export default function CategorySummary({data} : CategorySummaryProps) {

  const expenses = data.filter(cat => cat.type == "expense");
  const incomes = data.filter(cat => cat.type == "income");

  const groupedIncomes = incomes.reduce((acc, curr) => {
      const categoryName = curr.category.name;
    

      const existing = acc.find(item => item.category.name === categoryName);
      if (existing) {
        existing.amount += curr.amount;
      } else {
        acc.push({...curr});
      }
      
      return acc;
    }, [] as Transaction[]);

    const groupedExpenses = expenses.reduce((acc, curr) => {
      const categoryName = curr.category.name;
      const existing = acc.find(item => item.category.name === categoryName);
      
      if (existing) {
        existing.amount += curr.amount;
      } else {
        acc.push({...curr});
      }
      
      return acc;
    }, [] as Transaction[]);
  
  const totalExpenses = expenses.reduce((sum, cat) => sum + cat.amount, 0);
  const totalIncome = incomes.reduce((sum, cat) => sum + cat.amount, 0);
  const netAmount = totalIncome - totalExpenses;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="category-summary">
      <h3>🏷️ Kategori Bazlı Özet</h3>
      
      <div className="categories-grid">
        {/* Gelirler */}
        <div className="category-section">
          <h4 className="section-title income-title">📈 Gelirler</h4>
          <div className="category-list">
            {groupedIncomes.map((category, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <span className="category-icon">{category.category.icon}</span>
                  <span className="category-name">{category.category.name}</span>
                </div>
                <span className="category-amount income">
                  {formatCurrency(category.amount)}
                </span>
              </div>
            ))}
            <div className="category-total">
              <span className="total-label">Toplam</span>
              <span className="total-amount income">{formatCurrency(totalIncome)}</span>
            </div>
          </div>
        </div>

        {/* Giderler */}
        <div className="category-section">
          <h4 className="section-title expense-title">📉 Giderler</h4>
          <div className="category-list">
            {groupedExpenses.map((category, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <span className="category-icon">{category.category.icon}</span>
                  <span className="category-name">{category.category.name}</span>
                </div>
                <span className="category-amount">
                  {formatCurrency(category.amount)}
                </span>
              </div>
            ))}
            <div className="category-total">
              <span className="total-label">Toplam</span>
              <span className="total-amount expense">{formatCurrency(totalExpenses)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Net */}
      <div className="category-section net-section">
        <div className="category-total net-total">
          <span className="total-label">💰 Net</span>
          <span className={`total-amount ${netAmount >= 0 ? 'income' : 'expense'}`}>
            {formatCurrency(netAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}