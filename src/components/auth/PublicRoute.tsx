import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");

  // Jika SUDAH punya token dan mencoba akses halaman publik (seperti Login), 
  // lemparkan ke dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
