// App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import CategoryPage from './pages/CategoryPage';
import ReportsPage from './pages/ReportsPage';
import BudgetPage from './pages/BudgetPage';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ana layout ile sarmalanmış sayfalar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="expense" element={<ExpensePage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="budget" element={<BudgetPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;