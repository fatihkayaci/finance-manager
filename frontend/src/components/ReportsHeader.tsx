import { useState } from 'react';
import './ReportsHeader.css';
import Filter from './Reports/Filter';
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
interface ReportsHeaderProps {
  onFilterApply: (data: Transaction[]) => void;
}

export default function ReportsHeader({ onFilterApply }: ReportsHeaderProps) {
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
          <Filter onFilterApply={onFilterApply}/>
        </div>
      )}
    </>
  );
}