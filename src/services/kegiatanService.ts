 // src/services/kegiatanService.ts
import { api } from "./api";
import type { Kegiatan } from "../models/kegiatan";

const ENDPOINT = "kegiatan";

export const kegiatanService = {
  getAll: async (): Promise<Kegiatan[]> => {
    const response = await api.get<{ status: string; data: Kegiatan[] }>(ENDPOINT);
    return response.data.data; // Mengambil array dari dalam properti data
  },

  create: async (payload: Partial<Kegiatan>): Promise<Kegiatan> => {
    const response = await api.post<Kegiatan>(ENDPOINT, payload);
    return response.data;
  },

  update: async (id: number | string, payload: Partial<Kegiatan>): Promise<Kegiatan> => {
    const response = await api.patch<Kegiatan>(`${ENDPOINT}/${id}`, payload);
    return response.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
