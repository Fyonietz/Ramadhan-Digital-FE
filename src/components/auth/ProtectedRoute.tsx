import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Cek apakah ada token di localStorage
  const token = localStorage.getItem("token");

  // Jika tidak ada token, arahkan paksa ke halaman login
  // Atribut 'replace' digunakan agar user tidak bisa menekan tombol "Back" di browser
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika token ada, izinkan merender komponen anak-anaknya (Outlet)
  return <Outlet />;
}
