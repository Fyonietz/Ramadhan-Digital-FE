// src/hooks/useKelas.ts
import { useState, useEffect, useCallback } from "react";
import { kelasService } from "../services/kelasService";
import type { Kelas } from "../models/kelas";

export const useKelas = () => {
  const [kelasList, setKelasList] = useState<Kelas[]>([]);
  const [isLoadingKelas, setIsLoadingKelas] = useState<boolean>(false);

  const fetchKelas = useCallback(async () => {
    setIsLoadingKelas(true);
    try {
      const data = await kelasService.getAll();
      setKelasList(data);
    } catch (err) {
      console.error("Gagal memuat data kelas:", err);
    } finally {
      setIsLoadingKelas(false);
    }
  }, []);

  useEffect(() => {
    fetchKelas();
  }, [fetchKelas]);

  return { kelasList, isLoadingKelas };
};
