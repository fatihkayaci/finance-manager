import { createContext, useContext, useState, useEffect, type   ReactNode } from "react";

// 1. Tip Tanımlamaları (Types)
// Kullanıcı objesinin neye benzediğini tanımlıyoruz (Senin User modeline uygun)
interface User {
  id: number;
  username: string;
  email: string;
}

// Context'in içinde hangi veri ve fonksiyonların olacağını belirliyoruz
interface AuthContextType {
  user: User | null;          // Giriş yapmış kullanıcı (yoksa null)
  isAuthenticated: boolean;   // Giriş yapıldı mı? (true/false)
  loading: boolean;           // Sayfa yenilendiğinde kontrol sürüyor mu?
  login: (token: string, user: User) => void; // Giriş fonksiyonu
  logout: () => void;         // Çıkış fonksiyonu
}

// 2. Context'i Oluşturma
// Başlangıçta boş (undefined) olabilir, ama biz Provider ile dolduracağız.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider Bileşeni (Sarmalayıcı)
// Bu bileşen tüm uygulamayı saracak ve "state"i alt bileşenlere dağıtacak.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Başlangıçta yükleniyor

  // Uygulama ilk açıldığında (F5 yapıldığında) çalışır
  useEffect(() => {
    const initAuth = () => {
      // LocalStorage'dan verileri oku
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        // Token ve User varsa state'i güncelle
        setUser(JSON.parse(storedUser));
      }
      // Her durumda yükleme işlemini bitir
      setLoading(false);
    };

    initAuth();
  }, []);

  // Giriş Fonksiyonu
  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Çıkış Fonksiyonu
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Dışarıya açılan değerler
  const value = {
    user,
    isAuthenticated: !!user, // user varsa true, yoksa false döner
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Custom Hook (Kullanımı Kolaylaştırmak İçin)
// Her seferinde useContext(AuthContext) yazmak yerine useAuth() yazacağız.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};