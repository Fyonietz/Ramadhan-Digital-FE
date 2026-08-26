import { api } from "./api";
// Tambahkan kata "type" di sini 👇
import type { LoginPayload, LoginResponse } from "../models/auth";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("auth/login", payload);
    return response.data;
  },
};
