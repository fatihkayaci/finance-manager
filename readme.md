# 💰 Finance Manager

A modern web application for managing personal and business finances.

---

## 📋 Project Description

Finance Manager is a comprehensive financial management application that allows you to track income and expenses. Organize your spending by categories, view statistics, and generate reports.

---

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **CSS3** - Styling

### **Backend**
- **Node.js + Express** - API Server
- **Prisma** - ORM (Database Management)
- **SQLite** - Database

### **Developer Tools**
- Git & GitHub
- React DevTools
- Postman (API Testing)

---

## 📦 Installation

### **1. Clone the Repository**
```bash
git clone https://github.com/fatihkayaci/finance-manager.git
cd finance-manager
```

### **2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create the database
npx prisma migrate dev

# Start the server
npm run dev
```

Server will run at: `http://localhost:3000`

### **3. Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env

# Start development server
npm run dev
```

Frontend will open at: `http://localhost:5173`

---

## 🚀 Getting Started

1. **Start the backend**
   ```bash
   cd backend && npm run dev
   ```

2. **Start the frontend** (new terminal)
   ```bash
   cd frontend && npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🗄️ Database

### **Schema**
```sql
CREATE TABLE IF NOT EXISTS "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,              -- 'income' or 'expense'
    "amount" REAL NOT NULL,             -- Amount
    "category" TEXT NOT NULL,           -- Category
    "description" TEXT,                 -- Description
    "date" DATETIME NOT NULL,           -- Transaction date
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
```

### **Database Type**
- **SQLite** - Lightweight, file-based database
- **Location:** `backend/prisma/dev.db`

### **Sample Data**
```json
{
  "id": 1,
  "type": "income",
  "amount": 5000.00,
  "category": "Restaurant",
  "description": "Sample income",
  "date": "2025-10-24T00:00:00Z",
  "createdAt": "2025-10-24T12:30:00Z",
  "updatedAt": "2025-10-24T12:30:00Z"
}
```

### **Reset Database**
```bash
cd backend
npx prisma migrate reset
```

### **View Database with Prisma Studio**
```bash
npx prisma studio
# Opens at http://localhost:5555
```

---

## 📚 API Endpoints

### **Income**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/income` | Get all incomes |
| `GET` | `/api/income/:id` | Get income by ID |
| `POST` | `/api/income` | Create new income |
| `PUT` | `/api/income/:id` | Update income |
| `DELETE` | `/api/income/:id` | Delete income |

### **Expense**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/expense` | Get all expenses |
| `GET` | `/api/expense/:id` | Get expense by ID |
| `POST` | `/api/expense` | Create new expense |
| `PUT` | `/api/expense/:id` | Update expense |
| `DELETE` | `/api/expense/:id` | Delete expense |

### **General (Transactions)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/transactions` | Get all transactions |
| `GET` | `/api/health` | API health check |

---

## 📋 Request/Response Examples

### **Add Income (POST)**

**Request:**
```javascript
fetch('http://localhost:3000/api/income', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 5000,
    category: 'Restaurant',
    description: 'Sample income',
    date: '2025-10-24'
  })
})
```

**Response:**
```json
{
  "id": 1,
  "type": "income",
  "amount": 5000,
  "category": "Restaurant",
  "description": "Sample income",
  "date": "2025-10-24T00:00:00Z",
  "createdAt": "2025-10-24T12:30:00Z",
  "updatedAt": "2025-10-24T12:30:00Z"
}
```

### **Delete Income (DELETE)**

**Request:**
```javascript
fetch('http://localhost:3000/api/income/1', {
  method: 'DELETE'
})
```

**Response:**
```json
{
  "message": "Income deleted"
}
```

---

## ✨ Currently Implemented Features

### **Frontend**
- ✅ Income page
- ✅ Income list display
- ✅ Add new income (form)
- ✅ Delete income
- ✅ Category-based view
- ✅ Statistics (today/week/month)
- ✅ Responsive design

### **Backend**
- ✅ SQLite database
- ✅ Income CRUD operations (Create, Read, Delete)
- ✅ Expense CRUD operations
- ✅ Error handling
- ✅ Validation
- ✅ CORS support

---

## 🔄 Planned Features

### **Frontend**
- 🔲 Edit income (Edit modal)
- 🔲 Expense page
- 🔲 Dashboard (Overview page)
- 🔲 Filtering and search
- 🔲 Charts and statistics (Chart.js)
- 🔲 Reports page
- 🔲 Dark mode
- 🔲 Pagination

### **Backend**
- 🔲 Update income (PUT endpoint)
- 🔲 Update expense (PUT endpoint)
- 🔲 Advanced filtering
- 🔲 User authentication
- 🔲 Budget management
- 🔲 Categories CRUD

---

## 📁 Project Structure

```
finance-manager/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Income.tsx
│   │   │   ├── Expense.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Reports.tsx
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── SideBar.tsx
│   │   │   ├── QuickAddForm.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── StatCardContainer.tsx
│   │   │   └── CategoryDistribution.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   └── server.ts
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

## 🔧 Environment Variables

### **Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### **Backend (.env)**
```
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

---

## 🐛 Troubleshooting

### **Backend Connection Failed**
- Check if backend server is running
- Ensure port 3000 is available
- Verify `.env` file configuration

### **Database Error**
```bash
# Reset database
cd backend
npx prisma migrate reset
npx prisma migrate dev
```

### **CORS Error**
- Verify CORS middleware is enabled in backend
- Check if frontend URL is correct

---

## 📝 Development Notes

### **API Request Examples**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET
fetch(`${API_BASE_URL}/income`)

// POST
fetch(`${API_BASE_URL}/income`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 5000, ... })
})

// DELETE
fetch(`${API_BASE_URL}/income/1`, {
  method: 'DELETE'
})
```

### **React Hooks Usage**
- `useState` - State management
- `useEffect` - API calls, run on page load
- Props - Data flow between components

---

## 👨‍💻 Author

- **Developer:** [Fatih KAYACI](https://github.com/fatihkayaci)
- **Start Date:** October 2025

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

- GitHub: [@fatihkayaci](https://github.com/fatihkayaci)
- Email: info@fatihkayaci.com

---

**Project Status:** 🚧 Active Development

Last Updated: October 2025