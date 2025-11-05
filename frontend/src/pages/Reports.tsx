import { useState, useEffect } from 'react';
import ReportsHeader from '../components/ReportsHeader';
import ReportsStatsCardContainer from '../components/ReportsStatsCardContainer';
import CategorySummary from '../components/CategorySummary';
import TransactionTable from '../components/TransactionTable';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

function Reports() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
    
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
    })
    .catch(error => {
      console.error('❌ Hata:', error);
    });
  }, []);
  return (
    <>
      <ReportsHeader />
      <ReportsStatsCardContainer data={transactions}/>
      <CategorySummary />
      <TransactionTable data={transactions}/>
    </>
  );

}

export default Reports;