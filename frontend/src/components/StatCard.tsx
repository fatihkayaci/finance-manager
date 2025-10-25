import './StatCard.css'

type StatCardTime = "bugun" | "hafta" | "ay";

interface StatCardProps {
  type?: "gelir" | "gider";
  period?: StatCardTime;
  amount: number;
}

export default function StatCard({ 
  type = "gelir", 
  period = "bugun",
  amount
}: StatCardProps) {
  
const periods = {
  bugun: { title: "Bugünkü", date: "27 Eylül 2025", change: "+12.5%" },
  hafta: { title: "Bu Haftaki", date: "23-29 Eylül", change: "+8.2%" },
  ay: { title: "Bu Ayki", date: "Eylül 2025", change: "+15.3%" }
};

const data = periods[period];

  return (
    <div 
      className="stat-card" 
      style={type === "gelir" 
        ? { borderLeft: "4px solid #22c55e" } 
        : { borderLeft: "4px solid #ef4444" }
      }
    >
      <div className="stat-header">
        <span className="stat-title">
          {data.title} {type === "gelir" ? "Gelir" : "Gider"}
        </span>
        <span className="stat-date">{data.date}</span>
      </div>
      
      <h2 className="stat-amount">
        ₺{amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h2>
      
      <div className="stat-change">
        <span className="stat-icon">✓</span>
        <span>{data.change} önceki güne göre</span>
      </div>
    </div>
  );
}