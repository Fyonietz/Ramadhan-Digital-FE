// src/models/guru.ts
export interface Guru {
  id?: number | string;
  nama: string;
  username: string;
  password?: string; // Dibutuhkan saat create
  role?: string;
  kelas?: string | null;
}
