import './ReportsStatsCardContainer.css';
import ReportsStatCard from './ReportsStatCard';

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
interface Props{
  data: Transaction[];
}

export default function ReportsStatsCardContainer({data} : Props) {

  
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