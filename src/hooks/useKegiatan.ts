 // src/hooks/useKegiatan.ts
import { useState, useEffect, useCallback } from "react";
import { kegiatanService } from "../services/kegiatanService";
import type { Kegiatan } from "../models/kegiatan";

export const useKegiatan = () => {
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchKegiatan = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const data = await kegiatanService.getAll();
      setKegiatanList(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Gagal memuat data kegiatan dari server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKegiatan();
  }, [fetchKegiatan]);

  const addKegiatan = async (payload: Partial<Kegiatan>) => {
    try {
      await kegiatanService.create(payload);
      await fetchKegiatan();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambah data kegiatan.");
      return false;
    }
  };

  const updateKegiatan = async (id: number | string, payload: Partial<Kegiatan>) => {
    try {
      await kegiatanService.update(id, payload);
      await fetchKegiatan();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memperbarui data kegiatan.");
      return false;
    }
  };

  const removeKegiatan = async (id: number | string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data kegiatan ini?")) return;
    try {
      await kegiatanService.delete(id);
      await fetchKegiatan();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menghapus data kegiatan.");
    }
  };

  return {
    kegiatanList,
    isLoading,
    errorMsg,
    addKegiatan,
    updateKegiatan,
    removeKegiatan,
    refreshKegiatan: fetchKegiatan,
  };
};
