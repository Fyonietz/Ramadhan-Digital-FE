// src/hooks/useKelas.ts
import { useState, useEffect, useCallback } from "react";
import { kelasService } from "../services/kelasService";
import type { Kelas } from "../models/kelas";

export const useKelas = () => {
  const [kelasList, setKelasList] = useState<Kelas[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchKelas = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const data = await kelasService.getAll();
      setKelasList(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Gagal memuat data kelas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKelas();
  }, [fetchKelas]);

  const addKelas = async (payload: Partial<Kelas>) => {
    try {
      await kelasService.create(payload);
      await fetchKelas();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambah data kelas.");
      return false;
    }
  };

  const updateKelas = async (id: number | string, payload: Partial<Kelas>) => {
    try {
      await kelasService.update(id, payload);
      await fetchKelas();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memperbarui data kelas.");
      return false;
    }
  };

  const removeKelas = async (id: number | string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data kelas ini?")) return;
    try {
      await kelasService.delete(id);
      await fetchKelas();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menghapus data kelas.");
    }
  };

  return {
    kelasList,
    isLoading,
    errorMsg,
    addKelas,
    updateKelas,
    removeKelas,
    refreshKelas: fetchKelas,
  };
};
