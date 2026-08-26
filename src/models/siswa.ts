// src/models/siswa.ts

export interface Siswa {
  id?: number | string;
  nis?: string;       // Opsional jika backend tidak memerlukannya di payload
  nama: string;
  username: string;
  password?: string;  // Dibutuhkan saat POST (tambah data)
  kelas?: string;     // Biasanya berupa string dari hasil join relasi backend
  idKelas: number;    // Sesuai payload backend (id_kelas)
  role?: string;
  status?: "Aktif" | "Cuti" | "Lulus";
}
