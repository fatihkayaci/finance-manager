import { useState, useEffect } from 'react';
import './ReportsStatsCardContainer.css';
import ReportsStatCard from './ReportsStatCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface TransactionType {
  id: number;
  type: string;
  date: string;
  createdAt: string;
  time?: string;
  description: string;
  category: string;
  amount: number;
}
export default function ReportsStatsCardContainer() {

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/transactions`, {
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
      setIncome(totalValue(data, "income"));
      setExpense(totalValue(data, "expense"));
    })
    .catch(error => {
      console.error('❌ Hata:', error);
    });
  }, []);
  const totalValue = (data: TransactionType[], type: string) => {
    const total = data
      .filter((t: TransactionType) => t.type === type)
      .reduce((sum: number, t: TransactionType) => sum + t.amount, 0);
    
    return total;
  }
  return (
    <div className="stats-container">
      <ReportsStatCard 
        icon="💰" 
        label="Toplam Gelir" 
        value = {income}
        color="green" 
      />
      <ReportsStatCard 
        icon="💸" 
        label="Toplam Gider" 
        value={expense}
        color="red" 
      />
      <ReportsStatCard 
        icon="📈" 
        label="Net Kâr/Zarar" 
        value={income - expense}
        color="blue" 
      />
      <ReportsStatCard 
        icon="📊" 
        label="Toplam İşlem" 
        value={transactions.length}
        color="orange" 
      />
    </div>
  );
}