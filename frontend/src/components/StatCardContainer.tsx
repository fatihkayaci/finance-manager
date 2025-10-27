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
    fetch(`${API_BASE_URL}/income/summary?period=today&type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTodayData(data);
      })
      .catch(error => {
        console.error('❌ Hata:', error);
      });

      fetch(`${API_BASE_URL}/income/summary?period=week&type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setWeekData(data);
        })
        .catch(error => {
          console.error('❌ Hata:', error);
        });

      fetch(`${API_BASE_URL}/income/summary?period=month&type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
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