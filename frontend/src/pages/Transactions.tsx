import { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatCardContainer from '../components/StatCardContainer';
import QuickAddForm from '../components/QuickAddForm';
import TransactionList from '../components/TransactionList';
import CategoryDistribution from '../components/CategoryDistribution';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TransactionType {
  id: number;
  date: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
}
interface TransactionProps {
  // Component prop'u
  type: "income" | "expense";
}
function Transaction({type="income"}: TransactionProps) {

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const handleAddIncome = (newIncome: TransactionType) => {
    setTransactions([newIncome, ...transactions]);
  };
  useEffect(() => {
    console.log('📍 Income sayfası yüklendi, API çağrısı yapılıyor...');
    fetch(`${API_BASE_URL}/${type}`, {
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
        setTransactions(data);
      })
      .catch(error => {
        console.error('❌ Hata:', error);
      });
  }, []);

    const deleteIncome = (id: number) => {
    setTransactions(transactions.filter(Transaction => Transaction.id !== id));
  };
  
  return (
    <>
      <Header type={type}/>
      <StatCardContainer />
      <QuickAddForm type={type} onAdd={handleAddIncome}/>
      
      <div className="bottom-section">
        <div className="table-section">
          <TransactionList 
            data={transactions}
            onDelete={deleteIncome}
          />
        </div>
        <div className="chart-section">
          <CategoryDistribution data={transactions} />
        </div>
      </div>
    </>
  );
}

export default Transaction;