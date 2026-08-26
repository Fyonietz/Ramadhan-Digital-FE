// src/services/kelasService.ts
import { api } from "./api";
import type { Kelas } from "../models/kelas";

export const kelasService = {
  getAll: async (): Promise<Kelas[]> => {
    // Sesuai endpoint GET kelas Anda
    const response = await api.get<Kelas[]>("kelas"); 
    return response.data;
  },
};
