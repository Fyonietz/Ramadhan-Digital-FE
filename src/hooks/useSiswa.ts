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

  return {
    siswaList,
    isLoading,
    errorMsg,
    addSiswa,
    updateSiswa,
    removeSiswa,
    refreshSiswa: fetchSiswa,
  };
};
