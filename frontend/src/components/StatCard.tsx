import './StatCard.css'

interface StatCardProps {
  type: "income" | "expense";
  period: "güne" | "haftaya" | "aya"
  data: {
    current: number;
    change: number | null;
    period: {
      start: string;
      end: string;
    }
  } | null;  // ← null olabilir (henüz yüklenmemiş)
}
export default function StatCard({ data, type, period }: StatCardProps) {
  if (!data) {
    return <div className="stat-card">Yükleniyor...</div>
  }
  return (
    <div className="stat-card" style={type === "income" 
          ? { borderLeft: "4px solid #22c55e" } 
          : { borderLeft: "4px solid #ef4444" }
        }>
      
      <div className="stat-header">
        <span className="stat-title">
          {type === "income"? "Gelir": "Gider"}
        </span>
        <span className="stat-date">{data?.period.start === data?.period.end ? data?.period.start : `${data?.period.start} - ${data?.period.end}`}</span>
      </div>
      
      <h2 className="stat-amount">
        ₺{data?.current}
      </h2>
      
      <div className="stat-change">
        <span className="stat-icon">✓</span>
        <span style={data?.change !== null && data?.change < 0 
          ? { color: "#ef4444" }
          : { color: "#22c55e" }
        }>
          {data?.change}
          % önceki {period} göre
        </span>
      </div>
    </div>
  );
}