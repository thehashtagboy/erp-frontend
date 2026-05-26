import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './modules/auth/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Outlet routes can go here, e.g., <Route path="employees" element={<Employees />} /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
