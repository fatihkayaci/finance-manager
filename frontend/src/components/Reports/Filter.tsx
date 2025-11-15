import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import "./Filter.css";
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
}

export interface TransactionType {
  value: 'income' | 'expense';
  label: string;
}

export interface FilterOptions {
  categories: Category[];
  paymentMethods: string[];
  transactionTypes: TransactionType[];
}

export interface FilterData {
  zamanAraligi: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  kategori: string;
  odemeYontemi: string;
  islemTipi: string;
  siralama: string;
}
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
interface FilterProps {
  onFilterApply: (data: Transaction[]) => void;  // ← Type ekle
}
export default function Filter({ onFilterApply }: FilterProps) {
    const [privateTime, setPrivateTime] = useState(false);
    
    const [filterData, setFilterData] = useState<FilterData>({
        zamanAraligi: '',
        baslangicTarihi: '',
        bitisTarihi: '',
        kategori: '',
        odemeYontemi: '',
        islemTipi: '',
        siralama: 'yeni-eski'
    });
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        categories: [],
        paymentMethods: [],
        transactionTypes: []
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/filter-options`)
            .then(res => res.json())
            .then((data: FilterOptions) => setFilterOptions(data))
            .catch(err => console.error('Hata:', err));
    }, []);

    const handleTimeRangeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        // Önce state'i güncelle
        handleInputChange(e);
        
        // Sonra privateTime'ı ayarla
        if (value === "ozel") {
            setPrivateTime(true);
        } else {
            setPrivateTime(false);
        }
    };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterData(prev => ({ ...prev, [name]: value }));
    };

    // Uygula butonuna basınca
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Filter Data:', filterData);
        try {
            const response = await fetch(`${API_BASE_URL}/filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterData)
            });
            
            const data = await response.json();
            console.log('Gelen veri:', data);
            
            onFilterApply(data);
        } catch (error) {
            console.error('❌ Hata:', error);
        }
    };
    const handleClear = () => {
        setFilterData({
            zamanAraligi: '',
            baslangicTarihi: '',
            bitisTarihi: '',
            kategori: '',
            odemeYontemi: '',
            islemTipi: '',
            siralama: 'yeni-eski'
        });
        setPrivateTime(false);
    };
    return (
        <>
            <form className="filter-form" onSubmit={handleSubmit}>
                <div className="filter-row">
                    <div className="filter-field">
                        <label htmlFor="zaman-araligi">Zaman Aralığı</label>
                        <select 
                            id="zaman-araligi" 
                            name="zamanAraligi" 
                            value={filterData.zamanAraligi}
                            onChange={handleTimeRangeChange}
                        >
                            <option value="">Tüm Zamanlar</option>
                            <option value="bugun">Bugün</option>
                            <option value="bu-hafta">Bu Hafta</option>
                            <option value="bu-ay">Bu Ay</option>
                            <option value="bu-yil">Bu Yıl</option>
                            <option value="ozel">Özel Aralık</option>
                        </select>
                    </div>
                    
                    {privateTime && (
                        <>
                            <div className="filter-field">
                                <label htmlFor="baslangic-tarihi">Başlangıç Tarihi</label>
                                <input 
                                    type="date" 
                                    id="baslangic-tarihi" 
                                    name="baslangicTarihi"
                                    value={filterData.baslangicTarihi}
                                    onChange={handleInputChange}
                                    placeholder="mm/dd/yyyy"
                                />
                            </div>

                            <div className="filter-field">
                                <label htmlFor="bitis-tarihi">Bitiş Tarihi</label>
                                <input 
                                    type="date" 
                                    id="bitis-tarihi" 
                                    name="bitisTarihi"
                                    value={filterData.bitisTarihi}
                                    onChange={handleInputChange}
                                    placeholder="mm/dd/yyyy"
                                />
                            </div>
                        </>
                    )}
                    
                    <div className="filter-field">
                        <label htmlFor="kategori">Kategori</label>
                        <select 
                            id="kategori" 
                            name="kategori"
                            value={filterData.kategori}
                            onChange={handleInputChange}
                        >
                            <option value="">Tüm Kategoriler</option>
                            {filterOptions.categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="filter-row">
                    <div className="filter-field">
                        <label htmlFor="odeme-yontemi">Ödeme Yöntemi</label>
                        <select id="odeme-yontemi" name="odemeYontemi" value={filterData.odemeYontemi} onChange={handleInputChange}>
                            <option value="">Tüm Ödeme Yöntemleri</option>
                            {filterOptions.paymentMethods.map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-field">
                        <label htmlFor="islem-tipi">İşlem Tipi</label>
                        <select 
                            id="islem-tipi" 
                            name="islemTipi"
                            value={filterData.islemTipi}
                            onChange={handleInputChange}
                        >
                            <option value="">Hepsi</option>
                            {filterOptions.transactionTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-field">
                        <label htmlFor="siralama">Sıralama</label>
                        <select 
                            id="siralama" 
                            name="siralama"
                            value={filterData.siralama}
                            onChange={handleInputChange}
                        >
                            <option value="yeni-eski">Tarih (Yeni → Eski)</option>
                            <option value="eski-yeni">Tarih (Eski → Yeni)</option>
                            <option value="tutar-yuksek">Tutar (Yüksek → Düşük)</option>
                            <option value="tutar-dusuk">Tutar (Düşük → Yüksek)</option>
                        </select>
                    </div>
                </div>

                <div className="filter-actions">
                    <button type="submit" className="btn-apply">
                        ✓ Uygula
                    </button>
                    <button type="button" className="btn-clear" onClick={handleClear}>
                        🗑️ Temizle
                    </button>
                </div>
            </form>
        </>
    );
}