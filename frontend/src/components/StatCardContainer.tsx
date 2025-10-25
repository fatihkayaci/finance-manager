import './StatCardContainer.css'
import StatCard from './StatCard';

interface IncomeData {
  id: number;
  date: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
}

interface StatsContainerProps {
  type?: "gelir" | "gider";
  incomes: IncomeData[]; 
}

export default function StatsContainer({ type = "gelir", incomes }: StatsContainerProps) {
  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
  
  const weekStart = new Date();
  weekStart.setDate(today.getDate() - 7);
  
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  
  const todayIncomes = incomes.filter(income => income.date === todayFormatted);
  const todayTotal = todayIncomes.reduce((sum, income) => sum + income.amount, 0);
  
  const weekIncomes = incomes.filter(income => {
    const incomeDate = parseDate(income.date);
    return incomeDate >= weekStart && incomeDate <= today;
  });
  const weekTotal = weekIncomes.reduce((sum, income) => sum + income.amount, 0);
  
  const monthIncomes = incomes.filter(income => {
    const incomeDate = parseDate(income.date);
    return incomeDate >= monthStart && incomeDate <= today;
  });
  const monthTotal = monthIncomes.reduce((sum, income) => sum + income.amount, 0);
    
  return (
    <>
      <div className="stats-container">
        <StatCard 
          type={type} 
          period='bugun' 
          amount={todayTotal}
        />
        <StatCard 
          type={type} 
          period='hafta' 
          amount={weekTotal}
        />
        <StatCard 
          type={type} 
          period='ay' 
          amount={monthTotal}
        />
      </div>
    </>
  );
}