// src/services/guruService.ts
import { api } from "./api";
import type { Guru } from "../models/guru";
import axios from "axios";

const ENDPOINT_EXCEL = import.meta.env.VITE_API_TARGET + "/api/v1/auth/register-bulk-excel-guru";
const ENDPOINT = "auth/guru";
const ENDPOINT_CREATE = "auth/register-guru";
const ENDPOINT_PUT = "auth/kelas-guru";
const ENDPOINT_DELETE ="auth/users";

export const guruService = {
  getAll: async (): Promise<Guru[]> => {
    const response = await api.get<Guru[]>(ENDPOINT);
    return response.data;
  },

  create: async (payload: Partial<Guru>): Promise<Guru> => {
    const response = await api.post<Guru>(ENDPOINT_CREATE, payload);
    return response.data;
  },

  update: async (id: number | string, payload: Partial<Guru>): Promise<Guru> => {
    const response = await api.put<Guru>(`${ENDPOINT_PUT}/${id}`, payload);
    return response.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`${ENDPOINT_DELETE}/${id}`);
  },
importExcel: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const response = await axios.post(
      ENDPOINT_EXCEL, 
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
