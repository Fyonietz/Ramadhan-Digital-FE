import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px] transition-opacity md:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 md:static md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </div>

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white shadow-sm px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu sidebar"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
