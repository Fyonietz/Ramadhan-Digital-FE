// src/hooks/useGuru.ts
import { useState, useEffect, useCallback } from "react";
import { guruService } from "../services/guruService";
import type { Guru } from "../models/guru";

export const useGuru = () => {
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchGuru = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const data = await guruService.getAll();
      setGuruList(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Gagal memuat data guru dari server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuru();
  }, [fetchGuru]);

  const addGuru = async (payload: Partial<Guru>) => {
    try {
      await guruService.create(payload);
      await fetchGuru();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambah data guru.");
      return false;
    }
  };

  const updateGuru = async (id: number | string, payload: Partial<Guru>) => {
    try {
      await guruService.update(id, payload);
      await fetchGuru();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memperbarui data guru.");
      return false;
    }
  };

  const removeGuru = async (id: number | string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data guru ini?")) return;
    try {
      await guruService.delete(id);
      await fetchGuru();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menghapus data guru.");
    }
  };
const importGuruExcel = async (file: File) => {
    setIsLoading(true);
    try {
      const res = await guruService.importExcel(file);
      await fetchGuru(); 
      alert(res.message || "Berhasil mengimpor data guru!");
      return true;
    } catch (err: any) {
      const serverResponse = err.response?.data;
      console.error("Detail Error Backend Guru:", serverResponse);
      alert(`Gagal Import: ${serverResponse?.message || "Gagal mengimpor file Excel."}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    guruList,
    isLoading,
    errorMsg,
    addGuru,
    updateGuru,
    removeGuru,
 importGuruExcel,
    refreshGuru: fetchGuru,
  };
};
