// src/pages/admin/SiswaPage.tsx
import { useState } from "react";
import ReusableTable, { type TableColumn } from "../../components/ui/ReusableTable";
import ReusableModal, { type FormField } from "../../components/ui/ReusableModal";
import { useSiswa } from "../../hooks/useSiswa";
import { useKelas } from "../../hooks/useKelas"; // <-- Import hook kelas
import type { Siswa } from "../../models/siswa";
import { Trash2, Edit, Plus } from "lucide-react";

export default function SiswaPage() {
  const { siswaList, isLoading, errorMsg, addSiswa, updateSiswa, removeSiswa } = useSiswa();
  const { kelasList } = useKelas(); // <-- Ambil data kelas untuk dropdown

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState<Siswa | null>(null);

  // Ubah field idKelas menjadi tipe 'select' dan petakan data kelas dari API ke dalam format options
  const formFields: FormField<Siswa>[] = [
    { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Contoh: Ghaniy Madea" },
    { name: "username", label: "Username", type: "text", placeholder: "Contoh: labuah" },
    { name: "password", label: "Password", type: "password", placeholder: "Masukkan password" },
    { 
      name: "idKelas", 
      label: "Kelas", 
      type: "select", 
      // Memetakan array kelas API menjadi [{ label: "X (2026)", value: 2 }, ...]
      options: kelasList.map((k) => ({
        label: `${k.nama} - Angkatan ${k.angkatan}`,
        value: k.id
      }))
    },
  ];

  const handleOpenAdd = () => {
    setSelectedSiswa(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (siswa: Siswa) => {
    setSelectedSiswa(siswa);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    const payload = {
      ...data,
      idKelas: Number(data.idKelas), // Pastikan bertipe angka
    };

    let success = false;
    if (selectedSiswa && selectedSiswa.id) {
      success = await updateSiswa(selectedSiswa.id, payload);
    } else {
      success = await addSiswa(payload);
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  const columns: TableColumn<Siswa>[] = [
    { header: "ID", accessor: "id" },
    { header: "Nama Lengkap", accessor: "nama" },
    { header: "Username", accessor: "username" },
    { header: "Role", accessor: "role" },
    { header: "Kelas", accessor: "kelas" },
    { 
      header: "Aksi", 
      className: "text-right",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => handleOpenEdit(row)} className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-amber-50">
            <Edit size={16} />
          </button>
          <button onClick={() => row.id && removeSiswa(row.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50">
            <Trash2 size={16} />
          </button>
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Siswa</h1>
          <p className="text-sm text-gray-500">Pilihan kelas diambil dinamis dari endpoint kelas.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#135f38] hover:bg-[#11562f] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> Tambah Siswa
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      <ReusableTable 
        data={siswaList} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="Belum ada data siswa."
      />

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedSiswa ? "Edit Data Siswa" : "Tambah Siswa Baru"}
        fields={formFields}
        initialData={selectedSiswa}
      />
    </div>
  );
}
