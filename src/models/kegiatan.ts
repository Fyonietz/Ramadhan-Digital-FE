 // src/models/kegiatan.ts
export interface Kegiatan {
  id?: number | string;
  judul: string;
  pemateri: string;
  tanggal: string; // Format string tanggal (misal: "2026-03-25" atau ISO string)
  kegiatanUsers?: any[] | null;
}
