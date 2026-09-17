import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
// Sesuaikan path import ini dengan letak folder hooks Anda
import { useLogin } from "../../hooks/useLogin"; 

export default function LoginPage() {
  // State untuk menyimpan ketikan user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Mengambil fungsi dan state dari Controller (Hook)
  const { handleLogin, isLoading, errorMsg } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lempar data inputan ke fungsi API
    handleLogin({ username, password }); 
  };

  return (
    <div className="min-h-screen bg-[#135f38] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Area Logo & Judul Aplikasi */}
      <div className="mb-8 flex flex-col items-center z-10">
        <div className="w-20 h-20 rounded-2xl p-1 mb-4 shadow-sm flex items-center justify-center border-2 border-white/20 bg-white/10 backdrop-blur-sm">
          <img
            src="/logo.jpeg"
            alt="Logo Ramadhan Digital"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
        <h1 className="text-white text-3xl font-bold tracking-wide">
          Ramadhan Digital
        </h1>
      </div>

      {/* Card Form Login */}
      <div className="bg-white rounded-[24px] p-8 w-full max-w-sm shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Masuk untuk melanjutkan ibadah harian Anda.
        </p>

        {/* TAMPILKAN ERROR DARI API JIKA ADA */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Input Username */}
          <div className="bg-gray-50 rounded-t-lg border-b border-gray-400 p-3 transition-colors focus-within:bg-gray-100">
            <input 
              type="text" 
              placeholder="Masukkan Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 text-[15px]"
              required
              disabled={isLoading} // Kunci input saat loading
            />
          </div>

          {/* Input Password */}
          <div className="bg-gray-50 rounded-t-lg border-b border-gray-400 p-3 flex justify-between items-center transition-colors focus-within:bg-gray-100">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 text-[15px]"
              required
              disabled={isLoading} // Kunci input saat loading
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
              disabled={isLoading}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Tombol Masuk */}
          <div className="pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#187541] hover:bg-[#11562f] text-white font-bold py-3.5 rounded-full tracking-wider transition-colors disabled:bg-[#187541]/70 flex justify-center items-center gap-2"
            >
              {/* Ubah teks tombol jika sedang memanggil API */}
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  MEMPROSES...
                </>
              ) : (
                "MASUK"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
