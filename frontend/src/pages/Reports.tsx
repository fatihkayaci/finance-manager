import { useState, useEffect } from 'react';
import ReportsHeader from '../components/ReportsHeader';
import ReportsStatsCardContainer from '../components/ReportsStatsCardContainer';
import CategorySummary from '../components/CategorySummary';
import TransactionTable from '../components/TransactionTable';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
  paymentIcon: string;
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
      const a = response.json();
      console.log("response:");
      console.log(a);
      return a;
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
      <TransactionTable data={transactions}/>
      <CategorySummary data={transactions}/>
    </>
  );

}

export default Reports;