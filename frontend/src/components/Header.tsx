import './Header.css'
type HeaderType = "income" | "expense";

export default function Header({type = "income"} : {type?: HeaderType}) {
  const config = {
    income: {
      title: "Gelirler",
      icon: "💰",
      buttonText: "Gelir Yönetimi",
      addButtonText: "+ Yeni Gelir Ekle",
      color: "#22c55e"
    },
    expense: {
      title: "Giderler",
      icon: "💸",
      buttonText: "Gider Yönetimi",
      addButtonText: "+ Yeni Gider Ekle",
      color: "#ef4444"
    }
  };
  return (
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <h1 className="header-title">{config[type].title}</h1>
            <button className="btn-gelir-yonetimi" style={{ backgroundColor: config[type].color }}>
              {config[type].icon} {config[type].buttonText}
            </button>
          </div>

          <div className="header-right">
            <button className="btn-yeni-ekle" style={{ backgroundColor: config[type].color }}>
              {config[type].addButtonText}
            </button>
          </div>
        </div>
      </header>
  );
}