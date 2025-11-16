import React from 'react';

const CategoryCard = ({ kategori, onEdit, onDelete }) => {
  return (
    <div className="kategori-card">
      <div className="card-header">
        <div className="card-main">
          <div className={`kategori-icon ${kategori.renk}`}>
            {kategori.icon}
          </div>
          <div className="kategori-info">
            <h4>{kategori.isim}</h4>
            <span className={`kategori-badge ${kategori.tip}`}>
              {kategori.tip === 'gelir' ? '📈 Gelir' : '📉 Gider'}
            </span>
          </div>
        </div>
        <button className="menu-btn">⋮</button>
      </div>

      <div className="card-footer">
        <button className="btn-edit" onClick={() => onEdit(kategori)}>
          Düzenle
        </button>
        <button className="btn-delete" onClick={() => onDelete(kategori.id)}>
          Sil
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;