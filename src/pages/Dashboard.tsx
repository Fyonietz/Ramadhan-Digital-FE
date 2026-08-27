 // src/pages/admin/DashboardHome.tsx (atau gabungkan di App.tsx)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, GraduationCap, School, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { statsService } from "../services/statsService";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalGuru: 0,
    totalKelas: 0,
    totalKegiatan: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      const data = await statsService.getSummaryStats();
      setStats(data);
      setIsLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Siswa",
      value: stats.totalSiswa,
      icon: <Users size={24} className="text-emerald-600" />,
      bgIcon: "bg-emerald-50",
      borderColor: "border-emerald-100",
      path: "/dashboard/users/siswa",
    },
    {
      title: "Total Guru / Pembimbing",
      value: stats.totalGuru,
      icon: <GraduationCap size={24} className="text-blue-600" />,
      bgIcon: "bg-blue-50",
      borderColor: "border-blue-100",
      path: "/dashboard/users/guru",
    },
    {
      title: "Jumlah Kelas",
      value: stats.totalKelas,
      icon: <School size={24} className="text-amber-600" />,
      bgIcon: "bg-amber-50",
      borderColor: "border-amber-100",
      path: "/dashboard/kelas",
    },
    {
      title: "Total Kegiatan",
      value: stats.totalKegiatan,
      icon: <Calendar size={24} className="text-purple-600" />,
      bgIcon: "bg-purple-50",
      borderColor: "border-purple-100",
      path: "/dashboard/kegiatan",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Banner Sambutan */}
      <div className="bg-gradient-to-r from-[#135f38] to-[#1e8a52] rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-medium backdrop-blur-sm">
            <ShieldCheck size={14} /> Administrator Panel
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Selamat Datang, Admin!</h1>
          <p className="text-emerald-100 text-sm max-w-xl">
            Kelola data satuan pendidikan, pemantauan kegiatan Ramadhan, dan manajemen pengguna dengan mudah melalui panel terpusat ini.
          </p>
        </div>
        <div className="hidden md:block bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-right">
          <p className="text-xs text-emerald-200">Status Sistem</p>
          <p className="text-sm font-semibold flex items-center gap-1.5 justify-end">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> Online & Terhubung
          </p>
        </div>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.path)}
            className={`bg-white rounded-2xl p-5 border ${card.borderColor} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${card.bgIcon} transition-transform group-hover:scale-110 duration-200`}>
                {card.icon}
              </div>
              <span className="text-xs font-medium text-gray-400 group-hover:text-[#135f38] flex items-center gap-1 transition-colors">
                Kelola <ArrowRight size={12} />
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {isLoading ? (
                  <span className="inline-block w-8 h-6 bg-gray-200 rounded animate-pulse"></span>
                ) : (
                  card.value
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Bagian Bawah: Ringkasan Aktivitas / Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Pintasan Cepat */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Aksi & Pintasan Cepat</h3>
          <p className="text-sm text-gray-500">Pilih menu di bawah untuk langsung menuju ke halaman pengelolaan data.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button 
              onClick={() => navigate("/dashboard/users/siswa")}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#135f38] hover:bg-emerald-50/30 transition-all text-left group"
            >
              <div>
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#135f38]">Manajemen Siswa</p>
                <p className="text-xs text-gray-500">Tambah satuan atau import Excel</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-[#135f38] transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              onClick={() => navigate("/dashboard/users/guru")}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#135f38] hover:bg-emerald-50/30 transition-all text-left group"
            >
              <div>
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#135f38]">Manajemen Guru</p>
                <p className="text-xs text-gray-500">Kelola akun dan penugasan kelas</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-[#135f38] transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              onClick={() => navigate("/dashboard/kelas")}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#135f38] hover:bg-emerald-50/30 transition-all text-left group"
            >
              <div>
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#135f38]">Data Kelas</p>
                <p className="text-xs text-gray-500">Atur angkatan dan kelompok kelas</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-[#135f38] transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              onClick={() => navigate("/dashboard/kegiatan")}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#135f38] hover:bg-emerald-50/30 transition-all text-left group"
            >
              <div>
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#135f38]">Jadwal Kegiatan</p>
                <p className="text-xs text-gray-500">Tambah kajian dan agenda Ramadhan</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-[#135f38] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Informasi Ringkas Sistem */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Informasi Sistem</h3>
            <p className="text-sm text-gray-500">Ringkasan operasional aplikasi.</p>
          </div>

          <div className="space-y-3 py-4 border-y border-gray-100 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Platform</span>
              <span className="font-medium text-gray-800">Ramadhan Digital Admin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Versi API</span>
              <span className="font-medium text-gray-800">v1.0 (REST)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Keamanan</span>
              <span className="font-medium text-emerald-600">JWT Protected</span>
            </div>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
            <p className="text-xs text-emerald-800 font-medium leading-relaxed">
              💡 <span className="font-bold">Tips Admin:</span> Gunakan fitur *Import Excel* pada menu Siswa atau Guru untuk mendaftarkan akun secara masal dengan cepat.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
