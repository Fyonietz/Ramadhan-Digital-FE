// src/services/kelasService.ts
import { api } from "./api";
import type { Kelas } from "../models/kelas";

const ENDPOINT = "kelas";

export const kelasService = {
  getAll: async (): Promise<Kelas[]> => {
    const response = await api.get<Kelas[]>(ENDPOINT);
    return response.data;
  },

  create: async (payload: Partial<Kelas>): Promise<Kelas> => {
    const response = await api.post<Kelas>(ENDPOINT, payload);
    return response.data;
  },

  update: async (id: number | string, payload: Partial<Kelas>): Promise<Kelas> => {
    const response = await api.patch<Kelas>(`${ENDPOINT}/${id}`, payload);
    return response.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
