// src/pages/admin/KelasPage.tsx
import { useState } from "react";
import ReusableTable, { type TableColumn } from "../components/ui/ReusableTable";
import ReusableModal, { type FormField } from "../components/ui/ReusableModal";
import { useKelas } from "../hooks/useKelas";
import type { Kelas } from "../models/kelas";
import { Trash2, Edit, Plus, School } from "lucide-react";

export default function KelasPage() {
  const { kelasList, isLoading, errorMsg, addKelas, updateKelas, removeKelas } = useKelas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState<Kelas | null>(null);

  // Konfigurasi Field Form (Nama Kelas & Angkatan)
  const formFields: FormField<Kelas>[] = [
    { name: "nama", label: "Nama Kelas", type: "text", placeholder: "Contoh: X MIPA 1 / X" },
    { name: "angkatan", label: "Angkatan", type: "text", placeholder: "Contoh: 2026 / 2027" },
  ];

  const handleOpenAdd = () => {
    setSelectedKelas(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (kelas: Kelas) => {
    setSelectedKelas(kelas);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    let success = false;
    if (selectedKelas && selectedKelas.id) {
      success = await updateKelas(selectedKelas.id, data);
    } else {
      success = await addKelas(data);
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  const columns: TableColumn<Kelas>[] = [
    { header: "ID", accessor: "id" },
    { 
      header: "Nama Kelas", 
      accessor: (row) => (
        <div className="flex items-center gap-2 font-medium text-gray-800">
          <School size={16} className="text-[#135f38]" />
          {row.nama}
        </div>
      ) 
    },
    { header: "Angkatan", accessor: "angkatan" },
    { 
      header: "Aksi", 
      className: "text-right",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => handleOpenEdit(row)} className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-amber-50" title="Edit Kelas">
            <Edit size={16} />
          </button>
          <button onClick={() => row.id && removeKelas(row.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50" title="Hapus Kelas">
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
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Kelas</h1>
          <p className="text-sm text-gray-500">Kelola data kelas dan tahun angkatan.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#135f38] hover:bg-[#11562f] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> Tambah Kelas
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      {/* Tabel Reusable dengan Search Bar & Pagination */}
      <ReusableTable 
        data={kelasList} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="Belum ada data kelas."
        searchableKeys={["nama", "angkatan"]}
      />

      {/* Modal Form Tambah / Edit */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedKelas ? "Edit Data Kelas" : "Tambah Kelas Baru"}
        fields={formFields}
        initialData={selectedKelas}
      />
    </div>
  );
}
