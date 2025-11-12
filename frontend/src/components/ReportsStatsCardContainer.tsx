import './ReportsStatsCardContainer.css';
import ReportsStatCard from './ReportsStatCard';

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
export default function ReportsStatsCardContainer({data} : CategorySummaryProps) {

  
  const totalValue = (data: Transaction[], type: string) => {
    const total = data
      .filter((t: Transaction) => t.type === type)
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    
    return total;
  }
  return (
    <div className="stats-container">
      <ReportsStatCard 
        icon="💰" 
        label="Toplam Gelir" 
        value = {totalValue(data, 'income')}
        color="green" 
      />
      <ReportsStatCard 
        icon="💸" 
        label="Toplam Gider" 
        value={totalValue(data, 'expense')}
        color="red" 
      />
      <ReportsStatCard 
        icon="📈" 
        label="Net Kâr/Zarar" 
        value={totalValue(data, 'income') - totalValue(data, 'expense')}
        color="blue" 
      />
      <ReportsStatCard 
        icon="📊" 
        label="Toplam İşlem" 
        value = {data.length}
        color="orange" 
      />
    </div>
  );
}