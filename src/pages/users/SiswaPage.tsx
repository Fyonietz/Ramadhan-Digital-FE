import { useState } from "react";
import ReusableTable, { type TableColumn } from "../../components/ui/ReusableTable";
import ReusableModal, { type FormField } from "../../components/ui/ReusableModal";
import ImportExcelModal from "../../components/ui/ImportExcelModal";
import { useSiswa } from "../../hooks/useSiswa";
import { useKelas } from "../../hooks/useKelas";
import type { Siswa } from "../../models/siswa";
import { Trash2, Edit, Plus, FileSpreadsheet } from "lucide-react";

export default function SiswaPage() {
  const { siswaList, isLoading, errorMsg, addSiswa, updateSiswa, removeSiswa, importSiswaExcel } = useSiswa();
  const { kelasList } = useKelas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState<Siswa | null>(null);

  const formFields: FormField<Siswa>[] = [
    { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Contoh: Ghaniy Madea" },
    { name: "username", label: "Username", type: "text", placeholder: "Contoh: labuah" },
    { name: "password", label: "Password", type: "password", placeholder: "Masukkan password (kosongkan jika tidak diubah)" },
    { 
      name: "idKelas", 
      label: "Kelas", 
      type: "select", 
      options: kelasList.map((k) => ({
        label: `${k.nama} - Angkatan ${k.angkatan}`,
        value: k.id
      })),
      searchable: true,
    },
  ];

  const handleOpenAdd = () => {
    setSelectedSiswa(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (siswa: Siswa) => {
    // Pastikan properti idKelas terpetik dengan benar dari objek siswa.
    // Jika backend mengirim relasi objek kelas (misal: siswa.kelas.id), pastikan disesuaikan.
    setSelectedSiswa({
      ...siswa,
      idKelas: siswa.idKelas ?? (siswa as any).kelas?.id, // Sesuaikan dengan struktur data API Anda
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    const payload = {
      ...data,
      idKelas: Number(data.idKelas), // Konversi ke angka agar sesuai tipe data ID kelas
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Siswa</h1>
          <p className="text-sm text-gray-500">Kelola data siswa satuan atau melalui import Excel.</p>
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
            <Plus size={18} /> Tambah Siswa
          </button>
        </div>
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
        searchableKeys={["nama", "username", "kelas", "role"]}
      />

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedSiswa ? "Edit Data Siswa" : "Tambah Siswa Baru"}
        fields={formFields}
        initialData={selectedSiswa}
      />

      <ImportExcelModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={importSiswaExcel}
        kelasList={kelasList}
      />
    </div>
  );
}
