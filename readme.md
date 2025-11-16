# 💰 Cash Management System

A professional web application for tracking income and expenses.

## 🚀 Technologies

- **Frontend:** React + TypeScript + Vite
- **Routing:** React Router DOM
- **Styling:** Vanilla CSS
- **Backend:** Node.js + Express + PostgreSQL (separate repo)

## 📁 Project Structure
```
src/
├── components/          # All components
│   ├── common/          # Shared components (Button, Card, Input)
│   ├── layout/          # Layout components (Sidebar, Header)
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── auth/            # Login/Register components
│   ├── transactions/    # Income/Expense components
│   ├── categories/      # Category components
│   └── reports/         # Report components
│
├── pages/               # Page components
│   ├── auth/
│   ├── DashboardPage.tsx
│   ├── IncomePage.tsx
│   ├── ExpensePage.tsx
│   ├── CategoryPage.tsx
│   ├── ReportsPage.tsx
│   └── BudgetPage.tsx
│
├── types/               # TypeScript type definitions
│   └── index.ts         # All interfaces here
│
├── services/            # API services
│   ├── api.ts           # Base API configuration
│   ├── authService.ts   # Authentication operations
│   ├── transactionService.ts
│   └── categoryService.ts
│
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useTransactions.ts
│   └── useCategories.ts
│
├── context/             # React Context (State management)
│   └── AuthContext.tsx
│
├── utils/               # Helper functions
│   ├── formatters.ts    # Currency format, date format, etc.
│   └── constants.ts     # Constant values
│
├── styles/              # Global CSS files
│   └── globals.css
│
├── App.tsx              # Main application + Routing
└── main.tsx             # Entry point
```

## 🎯 Architectural Principles

### 1. Component Separation
- Each component in its own folder
- Component + CSS together
- Single responsibility principle

### 2. Type Safety
- All types in `types/index.ts`
- Every function/component is typed
- Flexible structure with Generics

### 3. Service Layer
- API calls separated from components
- Single `api.ts` base config
- Separate service file for each feature

### 4. Routing Structure
- Shared layout with nested routes
- `Layout.tsx` wraps all pages
- Dynamic content with `<Outlet />`

## 🔑 Key Files

### `types/index.ts`
All TypeScript type/interface definitions:
- User, Transaction, Category, Budget
- API request/response types
- Form data types

### `services/api.ts`
Centralized API configuration:
- Base URL setup
- Token management
- HTTP methods (get, post, put, delete)
- Error handling

### `App.tsx`
Main routing structure:
- React Router configuration
- Nested routes
- Layout wrapper

### `components/layout/Layout.tsx`
Shared layout structure:
- Sidebar + Header + Content
- Dynamic page rendering with `<Outlet />`

## 🛠️ Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Environment Variables

Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📋 TODO

- [ ] Complete category page
- [ ] Complete dashboard page
- [ ] Complete income/expense pages
- [ ] Complete reports page
- [ ] Integrate auth system
- [ ] Connect to backend

## 🎓 Learning Notes

### Folder Structure Logic

#### `components/`
Reusable UI parts. Each component:
- In its own folder
- `.tsx` + `.css` files together
- Customizable with props

#### `pages/`
Full pages corresponding to routes:
- Page structure only
- Combines components
- No business logic

#### `services/`
Backend communication:
- API calls
- Data fetching
- Error handling

#### `types/`
TypeScript type definitions:
- Interfaces
- Types
- Enums (future)

#### `hooks/`
Custom React hooks:
- State management
- Side effects
- Reusable logic

## 🔄 Data Flow
```
User Action (Button Click)
    ↓
Component (onClick handler)
    ↓
Service (API call)
    ↓
Backend API
    ↓
Service (Response)
    ↓
Component (State update)
    ↓
UI Re-render
```

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT

---

💡 **Note:** This project is being developed for educational purposes.