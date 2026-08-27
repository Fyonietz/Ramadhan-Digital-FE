 // src/pages/admin/KegiatanPage.tsx
import { useState } from "react";
import ReusableTable, { type TableColumn } from "../components/ui/ReusableTable";
import ReusableModal, { type FormField } from "../components/ui/ReusableModal";
import { useKegiatan } from "../hooks/useKegiatan";
import type { Kegiatan } from "../models/kegiatan";
import { Trash2, Edit, Plus, Calendar, User, BookOpen } from "lucide-react";

export default function KegiatanPage() {
  const { kegiatanList, isLoading, errorMsg, addKegiatan, updateKegiatan, removeKegiatan } = useKegiatan();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState<Kegiatan | null>(null);

  // Konfigurasi Field Form
  const formFields: FormField<Kegiatan>[] = [
    { name: "judul", label: "Judul Kegiatan", type: "text", placeholder: "Contoh: Kajian Subuh Ramadhan" },
    { name: "pemateri", label: "Pemateri", type: "text", placeholder: "Contoh: Ustadz Hanan Attaki" },
    { name: "tanggal", label: "Tanggal & Waktu", type: "datetime-local", placeholder: "Pilih tanggal kegiatan" },
  ];

  const handleOpenAdd = () => {
    setSelectedKegiatan(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (kegiatan: Kegiatan) => {
    // Format tanggal ISO ke format yang kompatibel dengan input datetime-local (YYYY-MM-DDTHH:mm)
    const formattedDate = kegiatan.tanggal ? kegiatan.tanggal.substring(0, 16) : "";
    setSelectedKegiatan({
      ...kegiatan,
      tanggal: formattedDate,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    let success = false;
    if (selectedKegiatan && selectedKegiatan.id) {
      success = await updateKegiatan(selectedKegiatan.id, data);
    } else {
      success = await addKegiatan(data);
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  const columns: TableColumn<Kegiatan>[] = [
    { header: "ID", accessor: "id" },
    { 
      header: "Judul Kegiatan", 
      accessor: (row) => (
        <div className="flex items-center gap-2 font-medium text-gray-800">
          <BookOpen size={16} className="text-[#135f38]" />
          {row.judul}
        </div>
      ) 
    },
    { 
      header: "Pemateri", 
      accessor: (row) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <User size={14} className="text-gray-400" />
          {row.pemateri}
        </div>
      ) 
    },
    { 
      header: "Tanggal", 
      accessor: (row) => {
        try {
          const dateObj = new Date(row.tanggal);
          return (
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <Calendar size={14} className="text-gray-400" />
              {isNaN(dateObj.getTime()) ? row.tanggal : dateObj.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          );
        } catch {
          return row.tanggal;
        }
      }
    },
    { 
      header: "Aksi", 
      className: "text-right",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => handleOpenEdit(row)} className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-amber-50" title="Edit Kegiatan">
            <Edit size={16} />
          </button>
          <button onClick={() => row.id && removeKegiatan(row.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50" title="Hapus Kegiatan">
            <Trash2 size={16} />
          </button>
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Kegiatan</h1>
          <p className="text-sm text-gray-500">Kelola jadwal kajian dan kegiatan Ramadhan.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#135f38] hover:bg-[#11562f] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> Tambah Kegiatan
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      {/* Tabel Reusable dengan Search Bar & Pagination */}
      <ReusableTable 
        data={kegiatanList} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="Belum ada data kegiatan."
        searchableKeys={["judul", "pemateri"]}
      />

      {/* Modal Form Tambah / Edit */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedKegiatan ? "Edit Data Kegiatan" : "Tambah Kegiatan Baru"}
        fields={formFields}
        initialData={selectedKegiatan}
      />
    </div>
  );
}
