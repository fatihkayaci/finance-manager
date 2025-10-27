import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SideBar from './components/SideBar';

import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Transaction from './pages/Transactions';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <div className="container-left">
          <SideBar />
        </div>

        <div className="container-right">
          <Routes>
            <Route path="/" element={<Navigate to="/Dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Transaction type="income"/>} />
            <Route path="/expense" element={<Transaction type="expense"/>} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  )
}

export default App
