import './ReportsHeader.css';

export default function ReportsHeader() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">📊 Raporlar</h1>
        </div>
        <div className="header-right">
          <button className="btn-filter">🔍 Filtrele</button>
          <button className="btn-export">📥 Export</button>
        </div>
      </div>
    </header>
  );
}