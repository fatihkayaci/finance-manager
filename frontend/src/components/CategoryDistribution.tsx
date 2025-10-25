import './CategoryDistribution.css'

interface IncomeData {
  id: number;
  date: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
}

interface CategoryDistributionProps {
  data: IncomeData[];
}

const categoryColors: { [key: string]: string } = {
  'Restoran': 'green',
  'Online': 'blue',
  'Paket Servis': 'orange',
  'Catering': 'purple'
};

export default function CategoryDistribution({ data }: CategoryDistributionProps) {
  
  const categoryTotals = data.reduce((acc, income) => {
    acc[income.category] = (acc[income.category] || 0) + income.amount;
    return acc;
  }, {} as { [key: string]: number });
  
  const totalAmount = data.reduce((sum, income) => sum + income.amount, 0);
  const averageDaily = totalAmount / 30;
  const maxIncome = data.length > 0 ? Math.max(...data.map(i => i.amount)) : 0;
  const totalTransactions = data.length;
  const monthlyTarget = 120000;
  
  return (
    <div className="category-distribution-container">
      <div className="category-distribution-card">
        <div className="category-distribution-header">
          <span className="category-distribution-icon">📊</span>
          <h3 className="category-distribution-title">Kategori Dağılımı</h3>
        </div>

        <div className="chart-area">
          <div className="chart-placeholder-text">
            [Pie Chart - Kategori bazlı gelir dağılımı]
            <br />
            Toplam: ₺{totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="categories-row">
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <div className="category-item" key={category}>
              <div className={`category-dot ${categoryColors[category] || 'gray'}`}></div>
              <div className="category-name">{category}</div>
              <div className="category-amount">
                ₺{amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-stats-card">
        <div className="quick-stats-header">
          <span className="quick-stats-icon">📈</span>
          <h3 className="quick-stats-title">Hızlı İstatistikler</h3>
        </div>

        <div className="quick-stats-list">
          <div className="quick-stat-item">
            <span className="quick-stat-label">Ortalama Günlük:</span>
            <span className="quick-stat-value">
              ₺{averageDaily.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="quick-stat-item">
            <span className="quick-stat-label">En Yüksek Gelir:</span>
            <span className="quick-stat-value green-text">
              ₺{maxIncome.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="quick-stat-item">
            <span className="quick-stat-label">Toplam İşlem:</span>
            <span className="quick-stat-value">{totalTransactions} adet</span>
          </div>

          <div className="quick-stat-item">
            <span className="quick-stat-label">Bu Ay Hedef:</span>
            <span className="quick-stat-value orange-text">
              ₺{monthlyTarget.toLocaleString('tr-TR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}