import { useState } from 'react';
import './ReportsHeader.css';
import Filter from './Reports/Filter';


export default function ReportsHeader() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <h1 className="header-title">📊 Raporlar</h1>
          </div>
          <div className="header-right">
            <button className="btn-filter" onClick={toggleFilter}>
              🔍 Filtrele
            </button>
            <button className="btn-export">📥 Export</button>
          </div>
        </div>
      </header>

      {isFilterOpen && (
        <div className="filter-container">
          <Filter />
        </div>
      )}
    </>
  );
}