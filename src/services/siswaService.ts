// src/services/siswaService.ts
import { api } from "./api";
import type { Siswa } from "../models/siswa";

const ENDPOINT = "auth/siswa"; // Sesuaikan jika endpoint aslinya "siswa"
const ENDPOINT_2 ="auth/users";
export const siswaService = {
  getAll: async (): Promise<Siswa[]> => {
    const response = await api.get<Siswa[]>(ENDPOINT);
    return response.data;
  },

  create: async (payload: Partial<Siswa>): Promise<Siswa> => {
    const response = await api.post<Siswa>("auth/register-siswa", payload);
    return response.data;
  },

  update: async (id: number | string, payload: Partial<Siswa>): Promise<Siswa> => {
    const response = await api.put<Siswa>(`${ENDPOINT_2}/${id}`, payload);
    return response.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`${ENDPOINT_2}/${id}`);
  },
};
