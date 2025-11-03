import './ReportsStatsCardContainer.css';
import ReportsStatCard from './ReportsStatCard';

export default function ReportsStatsCardContainer() {
  return (
    <div className="stats-container">
      <ReportsStatCard 
        icon="💰" 
        label="Toplam Gelir" 
        value="₺125,450.00" 
        color="green" 
      />
      <ReportsStatCard 
        icon="💸" 
        label="Toplam Gider" 
        value="₺89,230.00" 
        color="red" 
      />
      <ReportsStatCard 
        icon="📈" 
        label="Net Kâr/Zarar" 
        value="₺36,220.00" 
        color="blue" 
      />
      <ReportsStatCard 
        icon="📊" 
        label="Toplam İşlem" 
        value="1,234" 
        color="orange" 
      />
    </div>
  );
}