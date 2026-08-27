// src/models/kelas.ts
export interface Kelas {
  id?: number | string;
  nama: string;
  angkatan: string | number;
  users?: any[] | null; // Ditambahkan sesuai struktur response backend
}
