import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './modules/auth/LoginPage'
import RegisterPage from './modules/auth/RegisterPage'
import DashboardPage from './modules/dashboard/DashboardPage'
import UserPage from './modules/users/UserPage'
import UserFormPage from './modules/users/UserFormPage'
import SystemAdminPage from './modules/system-admin/SystemAdminPage'
import { ProtectedRoute } from './app/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="users/onboard" element={<UserFormPage />} />
            <Route path="users/:id/edit" element={<UserFormPage />} />
            <Route path="system-admin" element={<SystemAdminPage />} />
            {/* Add more protected routes here */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
