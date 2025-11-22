import React from 'react';

// Bu bileşen 3 tane sayı bekler
interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
}

export const SummaryCards = ({ income, expense, balance }: SummaryCardsProps) => {
  return (
    <div style={styles.container}>
      
      {/* 1. Bakiye Kartı */}
      <div style={{ ...styles.card, borderLeft: '5px solid #2196F3' }}>
        <h3 style={styles.title}>💰 Toplam Bakiye</h3>
        <p style={{ 
          ...styles.amount, 
          color: balance >= 0 ? '#2196F3' : '#d32f2f' // Pozitifse mavi, negatifse kırmızı
        }}>
          {balance.toFixed(2)} ₺
        </p>
      </div>

      {/* 2. Gelir Kartı */}
      <div style={{ ...styles.card, borderLeft: '5px solid #4CAF50' }}>
        <h3 style={styles.title}>📈 Gelir</h3>
        <p style={{ ...styles.amount, color: '#4CAF50' }}>
          +{income.toFixed(2)} ₺
        </p>
      </div>

      {/* 3. Gider Kartı */}
      <div style={{ ...styles.card, borderLeft: '5px solid #f44336' }}>
        <h3 style={styles.title}>📉 Gider</h3>
        <p style={{ ...styles.amount, color: '#f44336' }}>
          -{expense.toFixed(2)} ₺
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive ızgara
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex', 
    flexDirection: 'column' as const,
    justifyContent: 'center'
  },
  title: { margin: '0 0 5px 0', fontSize: '14px', color: '#666' },
  amount: { margin: 0, fontSize: '24px', fontWeight: 'bold' }
};