// CategorySummary.tsx
import './CategorySummary.css';

interface Category {
  icon: string;
  name: string;
  amount: number;
  isIncome?: boolean;
}

export default function CategorySummary() {
  const categories: Category[] = [
    { icon: '🍽️', name: 'Restoran', amount: 24550.00, isIncome: false },
    { icon: '🛒', name: 'Market', amount: 18850.00, isIncome: false },
    { icon: '🚗', name: 'Ulaşım', amount: 12980.00, isIncome: false },
    { icon: '🎬', name: 'Eğlence', amount: 8650.00, isIncome: false },
    { icon: '💼', name: 'Maaş', amount: 115000.00, isIncome: true },
    { icon: '💻', name: 'Freelance', amount: 10450.00, isIncome: true },
  ];

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
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-info">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </div>
            <span className={`category-amount ${category.isIncome ? 'income' : ''}`}>
              {formatCurrency(category.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}