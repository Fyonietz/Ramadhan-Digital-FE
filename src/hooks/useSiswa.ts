// src/hooks/useSiswa.ts
import { useState, useEffect, useCallback } from "react";
import { siswaService } from "../services/siswaService";
import type { Siswa } from "../models/siswa";

export const useSiswa = () => {
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // GET: Ambil semua data siswa
  const fetchSiswa = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const data = await siswaService.getAll();
      setSiswaList(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Gagal memuat data siswa dari server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSiswa();
  }, [fetchSiswa]);

  // POST: Tambah data siswa baru
  const addSiswa = async (payload: Partial<Siswa>) => {
    try {
      await siswaService.create(payload);
      await fetchSiswa(); // Refresh data setelah sukses
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambah data siswa.");
      return false;
    }
  };

  // PUT: Update data siswa berdasarkan ID
  const updateSiswa = async (id: number | string, payload: Partial<Siswa>) => {
    try {
      await siswaService.update(id, payload);
      await fetchSiswa(); // Refresh data setelah sukses
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memperbarui data siswa.");
      return false;
    }
  };

  // DELETE: Hapus data siswa berdasarkan ID
  const removeSiswa = async (id: number | string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) return;
    try {
      await siswaService.delete(id);
      await fetchSiswa(); // Refresh data setelah sukses
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menghapus data siswa.");
    }
  };
// Tambahkan di dalam return value useSiswa pada src/hooks/useSiswa.ts
// Tambahkan fungsi ini di dalam useSiswa.ts
const importSiswaExcel = async (idKelas: number, file: File) => {
    setIsLoading(true);
    try {
      const res = await siswaService.importExcel(idKelas, file);
      await fetchSiswa(); 
      alert(res.message || "Berhasil mengimpor data siswa!");
      return true;
    } catch (err: any) {
      // Ambil pesan dari objek ExcelImportResponse yang dikirim backend saat status 400
      const serverResponse = err.response?.data;
      console.error("Detail Error Backend:", serverResponse);

      const errorMessage = serverResponse?.Message || serverResponse?.message || "Gagal mengimpor file Excel.";
      
      // Jika ada detail error baris dari ExcelService
      if (serverResponse?.Errors && Array.isArray(serverResponse.Errors)) {
        console.table(serverResponse.Errors);
        alert(`Gagal Import: ${errorMessage}\n(Cek Console untuk melihat detail error per baris)`);
      } else {
        alert(`Gagal Import: ${errorMessage}`);
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Jangan lupa sertakan importSiswaExcel di return object hook
  return {
    siswaList,
    isLoading,
    errorMsg,
    addSiswa,
    updateSiswa,
    removeSiswa,
    importSiswaExcel, // <-- Ekspor fungsi ini
    refreshSiswa: fetchSiswa,
  };
};
