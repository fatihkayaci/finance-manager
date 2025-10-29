import './StatCardContainer.css'
import StatCard from './StatCard';
import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface StatContainerProps {
  type: "income" | "expense";
  refreshTrigger?: number; // ← YENİ: Her veri değiştiğinde artacak
}

export default function StatsContainer({ type, refreshTrigger }: StatContainerProps) {
  const [todayData, setTodayData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verileri çeken fonksiyon
  const fetchStats = async () => {
    setLoading(true);
    try {
      // Tüm istekleri paralel olarak çalıştır (daha hızlı)
      const [todayResponse, weekResponse, monthResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/income/summary?period=today&type=${type}`),
        fetch(`${API_BASE_URL}/income/summary?period=week&type=${type}`),
        fetch(`${API_BASE_URL}/income/summary?period=month&type=${type}`)
      ]);

      const [todayResult, weekResult, monthResult] = await Promise.all([
        todayResponse.json(),
        weekResponse.json(),
        monthResponse.json()
      ]);

      setTodayData(todayResult);
      setWeekData(weekResult);
      setMonthData(monthResult);
    } catch (error) {
      console.error('❌ Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // İlk yükleme ve refreshTrigger değiştiğinde çalış
  useEffect(() => {
    fetchStats();
  }, [type, refreshTrigger]); // ← refreshTrigger ekledik

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stat-card">Yükleniyor...</div>
        <div className="stat-card">Yükleniyor...</div>
        <div className="stat-card">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <StatCard 
        data={todayData}
        type={type}
        period='güne'
      />
      <StatCard
        data={weekData}
        type={type}
        period='haftaya'
      />
      <StatCard
        data={monthData}
        type={type}
        period='aya'
      />
    </div>
  );
}