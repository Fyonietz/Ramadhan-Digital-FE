// src/services/siswaService.ts
import axios from "axios";
import { api } from "./api";
import type { Siswa } from "../models/siswa";

const ENDPOINT = "auth/siswa"; 
const ENDPOINT_2 = "auth/users";

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

  // SESUAIKAN DENGAN ENDPOINT BACKEND ANDA
importExcel: async (idKelas: number, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);
    // Tidak perlu append idKelas ke formData jika backend mencarinya di query string

    const token = localStorage.getItem("token");

    // Kirim idKelas melalui Query String (?idKelas=...) agar dibaca oleh backend .NET
    const response = await axios.post(
      `http://192.168.69.35:3001/api/v1/auth/register-bulk-excel-siswa?idKelas=${idKelas}`, 
      formData, 
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data;
  },
};
