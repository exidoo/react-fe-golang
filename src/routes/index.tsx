//import useContext
import { useContext } from 'react';

//import context
import { AuthContext } from '../context/AuthContext';

//import react router dom
import { Routes, Route, Navigate } from 'react-router';

//import view
import Register from '@/views/auth/register.tsx';
import Login from '@/views/auth/login.tsx';
import Home from '@/views/home/index.tsx';
import UserManagement from '@/views/home/userManagement';

export default function AppRoutes() {
  // Menggunakan useContext untuk mendapatkan nilai dari AuthContext
  const auth = useContext(AuthContext);

  // Menggunakan optional chaining untuk menghindari error jika auth tidak ada
  const isAuthenticated = auth?.isAuthenticated ?? false;

  return (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />

      {/* route "/register" */}
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      {/* route "/login" */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

      {/* route "/dashboard" */}
      <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />

      {/* route "/user-management" */}
      <Route path="/user-management" element={isAuthenticated ? <UserManagement /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}
