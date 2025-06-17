//import useContext
import { useContext } from 'react';

//import context
import { AuthContext } from '../context/AuthContext';

//import react router dom
import { Routes, Route, Navigate } from 'react-router';

//import view register
import Register from '../views/auth/register.tsx';

//import view login
import Login from '../views/auth/login.tsx';

import Home from '@/views/home/index.tsx';

export default function AppRoutes() {
  // Menggunakan useContext untuk mendapatkan nilai dari AuthContext
  const auth = useContext(AuthContext);

  // Menggunakan optional chaining untuk menghindari error jika auth tidak ada
  const isAuthenticated = auth?.isAuthenticated ?? false;

  return (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={<Navigate to={isAuthenticated ? '/admin/dashboard' : '/login'} replace />} />

      {/* route "/register" */}
      <Route path="/register" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />} />

      {/* route "/login" */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />} />

      {/* route "/admin/dashboard" */}
      <Route path="/admin/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}
