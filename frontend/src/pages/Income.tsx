import { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatCardContainer from '../components/StatCardContainer';
import QuickAddForm from '../components/QuickAddForm';
import TransactionList from '../components/TransactionList';
import CategoryDistribution from '../components/CategoryDistribution';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface IncomeType {
  id: number;
  date: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
}

function Income() {
  const [incomes, setIncomes] = useState<IncomeType[]>([]);
  const handleAddIncome = (newIncome: IncomeType) => {
    setIncomes([newIncome, ...incomes]); // Listeye ekle
  };
  useEffect(() => {
    console.log('📍 Income sayfası yüklendi, API çağrısı yapılıyor...');
    fetch(`${API_BASE_URL}/income`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('📡 Response geldi:', response);
        return response.json();
      })
      .then(data => {
        console.log('✅ Veriler geldi:', data);
        setIncomes(data);
      })
      .catch(error => {
        console.error('❌ Hata:', error);
      });
  }, []);

  const deleteIncome = (id: number) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };
  
  return (
    <>
      <Header type="gelir" />
      <StatCardContainer type="gelir" incomes={incomes} />
      <QuickAddForm type="gelir" onAdd={handleAddIncome}/>
      
      <div className="bottom-section">
        <div className="table-section">
          <TransactionList 
            data={incomes}
            onDelete={deleteIncome}
          />
        </div>
        <div className="chart-section">
          <CategoryDistribution data={incomes} />
        </div>
      </div>
    </>
  );
}

export default Income;