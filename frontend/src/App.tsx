import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SideBar from './components/SideBar';

import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Reports from './pages/Reports';

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
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  )
}

export default App
