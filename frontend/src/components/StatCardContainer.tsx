import './StatCardContainer.css'
import StatCard from './StatCard';
import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface StatContainerProps{
  type: "income" | "expense"
}
export default function StatsContainer({type} : StatContainerProps) {

  const [todayData, setTodayData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [monthData, setMonthData] = useState(null);
  useEffect(() => {
    console.log('📍 Income sayfası yüklendi, API çağrısı yapılıyor...');
    fetch(`${API_BASE_URL}/income/summary?period=today`, {
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
        setTodayData(data);
      })
      .catch(error => {
        console.error('❌ Hata:', error);
      });

      fetch(`${API_BASE_URL}/income/summary?period=week`, {
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
          setWeekData(data);
        })
        .catch(error => {
          console.error('❌ Hata:', error);
        });

      fetch(`${API_BASE_URL}/income/summary?period=month`, {
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
          setMonthData(data);
        })
        .catch(error => {
          console.error('❌ Hata:', error);
        });
  }, []);
    
  return (
    <>
      <div className="stats-container">
        <StatCard 
          data = {todayData}
          type = {type}
          period = 'güne'
        />
        <StatCard
          data = {weekData}
          type = {type}
          period = 'haftaya'
        />
        <StatCard
          data = {monthData}
          type = {type}
          period = 'aya'
        />
      </div>
    </>
  );
}