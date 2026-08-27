import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

// Halaman-halaman admin yang sudah kita buat
import DashboardHome from "./pages/Dashboard"; // Atau sesuaikan path jika disimpan di folder lain
import SiswaPage from "./pages/users/SiswaPage";
import GuruPage from "./pages/users/GuruPage";
import KelasPage from "./pages/KelasPage";
import KegiatanPage from "./pages/KegiatanPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Rute Publik: Hanya bisa diakses JIKA BELUM LOGIN */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rute Privat: Hanya bisa diakses JIKA SUDAH LOGIN */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users/siswa" element={<SiswaPage />} />
          <Route path="users/guru" element={<GuruPage />} />
          <Route path="kelas" element={<KelasPage />} />
          <Route path="kegiatan" element={<KegiatanPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
