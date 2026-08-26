import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import type { LoginPayload } from "../models/auth";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (payload: LoginPayload) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await authService.login(payload);
      
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user_nama", response.nama);
      localStorage.setItem("user_role", response.role);
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Detail Error Login:", error); 
      
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || "Gagal masuk. Periksa kembali username & password Anda.");
      } else {
        setErrorMsg(error.message || "Tidak dapat terhubung ke server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    errorMsg
  };
};
