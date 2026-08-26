import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import SiswaPage from './pages/users/SiswaPage'
// Komponen sementara (View)
const DashboardHome = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Ringkasan Beranda</h1>
    <p className="text-gray-600">Selamat datang di panel admin Ramadhan Digital.</p>
  </div>
);

const UsersPage = () => (
  <div><h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1></div>
);

const SettingsPage = () => (
  <div><h1 className="text-2xl font-bold text-gray-800">Pengaturan Sistem</h1></div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* 
        Rute Publik: Hanya bisa diakses JIKA BELUM LOGIN 
      */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* 
        Rute Privat: Hanya bisa diakses JIKA SUDAH LOGIN 
      */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users/siswa" element={<SiswaPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
