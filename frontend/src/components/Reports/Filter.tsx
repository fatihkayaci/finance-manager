import { useState, type ChangeEvent } from 'react';
import "./Filter.css";
export default function Filter() {
    const [privateTime, setPrivateTime] = useState(false);
    
    const handleTimeRangeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "ozel") {
            setPrivateTime(true);
        } else {
            setPrivateTime(false);
        }
    };

    return (
        <>
            <form className="filter-form">
                <div className="filter-row">
                    <div className="filter-field">
                        <label htmlFor="zaman-araligi">Zaman Aralığı</label>
                        <select id="zaman-araligi" name="zamanAraligi" onChange={handleTimeRangeChange}>
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
                                    placeholder="mm/dd/yyyy"
                                />
                            </div>

                            <div className="filter-field">
                                <label htmlFor="bitis-tarihi">Bitiş Tarihi</label>
                                <input 
                                    type="date" 
                                    id="bitis-tarihi" 
                                    name="bitisTarihi"
                                    placeholder="mm/dd/yyyy"
                                />
                            </div>
                        </>
                    )}
                    
                    <div className="filter-field">
                        <label htmlFor="kategori">Kategori</label>
                        <select id="kategori" name="kategori">
                            <option value="">Tüm Kategoriler</option>
                            <option value="gelir">Gelir</option>
                            <option value="gider">Gider</option>
                            <option value="yatirim">Yatırım</option>
                        </select>
                    </div>
                </div>

                <div className="filter-row">
                    <div className="filter-field">
                        <label htmlFor="odeme-yontemi">Ödeme Yöntemi</label>
                        <select id="odeme-yontemi" name="odemeYontemi">
                            <option value="">Tüm Ödeme Yöntemleri</option>
                            <option value="nakit">Nakit</option>
                            <option value="kredi-karti">Kredi Kartı</option>
                            <option value="banka-transferi">Banka Transferi</option>
                        </select>
                    </div>

                    <div className="filter-field">
                        <label htmlFor="islem-tipi">İşlem Tipi</label>
                        <select id="islem-tipi" name="islemTipi">
                            <option value="">Hepsi</option>
                            <option value="gelir">Gelir</option>
                            <option value="gider">Gider</option>
                        </select>
                    </div>

                    <div className="filter-field">
                        <label htmlFor="siralama">Sıralama</label>
                        <select id="siralama" name="siralama">
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
                    <button type="button" className="btn-clear">
                        🗑️ Temizle
                    </button>
                </div>
            </form>
        </>
    );
}