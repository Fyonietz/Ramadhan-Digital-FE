 // src/services/statsService.ts
import { siswaService } from "./siswaService";
import { guruService } from "./guruService";
import { kelasService } from "./kelasService";
import { kegiatanService } from "./kegiatanService";

export const statsService = {
  getSummaryStats: async () => {
    try {
      const [siswa, guru, kelas, kegiatan] = await Promise.all([
        siswaService.getAll().catch(() => []),
        guruService.getAll().catch(() => []),
        kelasService.getAll().catch(() => []),
        kegiatanService.getAll().catch(() => []),
      ]);

      return {
        totalSiswa: siswa.length,
        totalGuru: guru.length,
        totalKelas: kelas.length,
        totalKegiatan: kegiatan.length,
      };
    } catch (error) {
      console.error("Gagal memuat statistik beranda", error);
      return { totalSiswa: 0, totalGuru: 0, totalKelas: 0, totalKegiatan: 0 };
    }
  },
};
