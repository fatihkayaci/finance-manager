import React, { useState } from 'react';
import Header from '../components/Header';
import QuickAddForm from '../components/Categories/QuickAddForm';
import KategoriCard from '../components/Categories/CategoryCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const [kategoriler, setKategoriler] = useState([
    { id: 1, isim: 'Maaş', icon: '💼', renk: 'blue', tip: 'gelir' },
    { id: 2, isim: 'Yemek', icon: '🍔', renk: 'orange', tip: 'gider' },
    { id: 3, isim: 'Ulaşım', icon: '🚗', renk: 'green', tip: 'gider' },
    { id: 4, isim: 'Fatura', icon: '📄', renk: 'red', tip: 'gider' },
    { id: 5, isim: 'Ek Gelir', icon: '💵', renk: 'purple', tip: 'gelir' },
    { id: 6, isim: 'Eğlence', icon: '🎮', renk: 'pink', tip: 'gider' },
  ]);

  const handleAddKategori = ({ isim, tip }) => {
    const yeniKategori = {
      id: Date.now(),
      isim,
      tip,
      icon: tip === 'gelir' ? '💰' : '💸',
      renk: tip === 'gelir' ? 'green' : 'red'
    };
    setKategoriler([...kategoriler, yeniKategori]);
  };

  const handleEdit = (kategori) => {
    console.log('Düzenle:', kategori);
  };

  const handleDelete = (id) => {
    setKategoriler(kategoriler.filter(k => k.id !== id));
  };

  return (
    <div className="main-content">
      <Header />
      <div className="content-area">
        <QuickAddForm onAddKategori={handleAddKategori} />
        <div className="kategori-grid">
          {kategoriler.map((kategori) => (
            <KategoriCard
              key={kategori.id}
              kategori={kategori}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;