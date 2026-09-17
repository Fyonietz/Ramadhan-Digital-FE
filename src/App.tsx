import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import DashboardHome from "./pages/Dashboard";
import SiswaPage from "./pages/users/SiswaPage";
import GuruPage from "./pages/users/GuruPage";
import KelasPage from "./pages/KelasPage";
import KegiatanPage from "./pages/KegiatanPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

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
