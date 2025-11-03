import './ReportsStatCard.css';

interface ReportsStatCard {
  icon: string;
  label: string;
  value: string;
  color?: 'green' | 'red' | 'blue' | 'orange' | 'purple';
}
export default function ReportsStatCard({ icon, label, value, color = 'purple' }: ReportsStatCard) {
   return (
    <div className={`stat-card ${color}`}>
      <div className="stat-content">
        <div className="stat-icon">{icon}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}