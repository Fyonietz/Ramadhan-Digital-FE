// src/pages/admin/GuruPage.tsx
import { useState } from "react";
import ReusableTable, { type TableColumn } from "../../components/ui/ReusableTable";
import ReusableModal, { type FormField } from "../../components/ui/ReusableModal";
import ImportGuruExcelModal from "../../components/ui/ImportGuruExcelModal"; // <-- Import modal khusus guru
import { useGuru } from "../../hooks/useGuru";
import { useKelas } from "../../hooks/useKelas";
import type { Guru } from "../../models/guru";
import { Trash2, Edit, Plus, FileSpreadsheet } from "lucide-react";

export default function GuruPage() {
  const { guruList, isLoading, errorMsg, addGuru, updateGuru, removeGuru, importGuruExcel } = useGuru();
  const { kelasList } = useKelas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null);

  const formFields: FormField<any>[] = selectedGuru
    ? [
        {
          name: "idKelas",
          label: "Assign Kelas",
          type: "select",
          options: kelasList.map((k) => ({
            label: `${k.nama} - Angkatan ${k.angkatan}`,
            value: k.id,
          })),
          searchable: true,
        },
      ]
    : [
        { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Contoh: Roni" },
        { name: "username", label: "Username", type: "text", placeholder: "Contoh: roni123" },
        { name: "password", label: "Password", type: "password", placeholder: "Masukkan password" },
      ];

  const handleOpenAdd = () => {
    setSelectedGuru(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (guru: Guru) => {
    setSelectedGuru(guru);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    let success = false;
    if (selectedGuru && selectedGuru.id) {
      const payload = {
        idKelas: data.idKelas ? Number(data.idKelas) : undefined,
      };
      success = await updateGuru(selectedGuru.id, payload);
    } else {
      success = await addGuru(data);
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  const columns: TableColumn<Guru>[] = [
    { header: "ID", accessor: "id" },
    { header: "Nama Lengkap", accessor: "nama" },
    { header: "Username", accessor: "username" },
    { header: "Role", accessor: "role" },
    { 
      header: "Kelas / Penugasan", 
      accessor: (row) => row.kelas ? (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          {row.kelas}
        </span>
      ) : (
        <span className="text-xs text-gray-400 italic">Belum di-assign</span>
      ) 
    },
    { 
      header: "Aksi", 
      className: "text-right",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => handleOpenEdit(row)} className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-amber-50" title="Assign Kelas">
            <Edit size={16} />
          </button>
          <button onClick={() => row.id && removeGuru(row.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50" title="Hapus">
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
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Guru / Pembimbing</h1>
          <p className="text-sm text-gray-500">Kelola data guru dan penugasan kelas.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            <FileSpreadsheet size={18} /> Import Excel
          </button>
          <button 
            onClick={handleOpenAdd}
            className="bg-[#135f38] hover:bg-[#11562f] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={18} /> Tambah Guru
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      <ReusableTable 
        data={guruList} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="Belum ada data guru."
        searchableKeys={["nama", "username", "role", "kelas"]}
      />

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedGuru ? "Assign Kelas Guru" : "Tambah Guru Baru"}
        fields={formFields}
        initialData={selectedGuru}
      />

      {/* Modal Import Khusus Guru (Tanpa Pilih Kelas) */}
      <ImportGuruExcelModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={importGuruExcel}
      />
    </div>
  );
}
