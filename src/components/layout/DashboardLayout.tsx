import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Kiri */}
      <Sidebar />

      {/* Area Konten Utama Kanan */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        
        {/* Opsional: Header/Topbar bisa ditambahkan di sini nanti */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                A
             </div>
          </div>
        </header>

        {/* Tempat konten dirender */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}
