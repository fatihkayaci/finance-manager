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
  createdAt: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
}

interface TransactionProps {
  type: "income" | "expense";
}

function Transaction({type = "income"}: TransactionProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); // ← YENİ: StatCard'ları yenilemek için

  const handleAddIncome = (newIncome: TransactionType) => {
    const dateObj = new Date(newIncome.date);
    const createdAtObj = new Date(newIncome.createdAt);

    const formatted = {
      ...newIncome,
      dateISO: dateObj.toISOString().split('T')[0],
      date: dateObj.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long' 
      }),
      time: createdAtObj.toLocaleTimeString('tr-TR', {
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setTransactions([formatted, ...transactions]);
    setRefreshKey(prev => prev + 1); // ← YENİ: StatCard'ları yenile
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTransactions(data);
      })
      .catch(error => {
        console.error('❌ Hata:', error);
      });
  }, [type]);

  const deleteIncome = (id: number) => {
    setTransactions(transactions.filter(Transaction => Transaction.id !== id));
    setRefreshKey(prev => prev + 1); // ← YENİ: Silme işleminden sonra da yenile
  };
  
  const handleUpdate = (id: number, updatedData: any) => {
    setTransactions(
      transactions.map(t => 
        t.id === id ? { ...t, ...updatedData } : t
      )
    );
    setRefreshKey(prev => prev + 1); // ← YENİ: Güncelleme işleminden sonra da yenile
  };

  return (
    <>
      <Header type={type}/>
      <StatCardContainer type={type} refreshTrigger={refreshKey} /> {/* ← YENİ: refreshTrigger prop'u */}
      <QuickAddForm type={type} onAdd={handleAddIncome}/>
      
      <div className="bottom-section">
        <div className="table-section">
          <TransactionList
            data={transactions}
            onDelete={deleteIncome}
            onUpdate={handleUpdate}
            type={type}
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