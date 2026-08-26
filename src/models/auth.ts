// src/models/auth.ts

// Interface untuk data yang dikirim (Payload)
export interface LoginPayload {
  username: string;
  password: string;
}

// Interface untuk data yang diterima (Response dari IP 192.168.69.35:3001)
export interface LoginResponse {
  token: string;
  username: string;
  nama: string;
  role: string;
  kelas: string;
  idKelas: number;
  refreshToken: string;
}
