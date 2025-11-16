import React, { useState } from 'react';

const QuickAddForm = ({ onAddKategori }) => {
  const [isim, setIsim] = useState('');
  const [tip, setTip] = useState('gelir');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isim.trim()) {
      onAddKategori({ isim, tip });
      setIsim('');
    }
  };

  return (
    <div className="quick-add-form">
      <h3>Yeni Kategori Ekle</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Kategori adı"
            className="form-input"
            value={isim}
            onChange={(e) => setIsim(e.target.value)}
          />
          <select 
            className="form-select"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          >
            <option value="gelir">Gelir</option>
            <option value="gider">Gider</option>
          </select>
          <button type="submit" className="btn-add">
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickAddForm;