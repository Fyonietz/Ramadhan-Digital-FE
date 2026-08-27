import React, { useState } from "react";
import { X, Upload, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

interface ImportGuruExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<boolean>;
}

export default function ImportGuruExcelModal({
  isOpen,
  onClose,
  onImport,
}: ImportGuruExcelModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNormalizationAndSetFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const rawFile = e.target.files[0];

    try {
      const data = await rawFile.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (jsonData.length === 0) {
        alert("File Excel kosong!");
        return;
      }

      const cleanedData = jsonData.map((row) => {
        let nama = "";
        let username = "";
        let password = "123456";

        Object.keys(row).forEach((key) => {
          const lowerKey = key.trim().toLowerCase();
          const val = row[key];

          if (lowerKey === "nama" || lowerKey === "nama lengkap") {
            nama = val != null ? String(val).trim() : "";
          } else if (lowerKey === "username") {
            username = val != null ? String(val).trim() : "";
          } else if (lowerKey === "password") {
            password = val != null && String(val).trim() !== "" ? String(val).trim() : "123456";
          }
        });

        return {
          Nama: nama,
          Username: username,
          Password: password,
        };
      });

      const newWorksheet = XLSX.utils.json_to_sheet(cleanedData);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

      const excelBuffer = XLSX.write(newWorkbook, { bookType: "xlsx", type: "array" });
      const normalizedFile = new File([excelBuffer], rawFile.name, {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      setSelectedFile(normalizedFile);
    } catch (err) {
      console.error("Gagal memproses Excel:", err);
      alert("Gagal membaca struktur file Excel. Pastikan formatnya benar.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    const success = await onImport(selectedFile);
    setIsSubmitting(false);

    if (success) {
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="text-green-600" size={22} />
            <h3 className="text-lg font-bold text-gray-800">Import Guru (.xlsx)</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Pilih Berkas Excel (.xlsx) <span className="text-red-500">*</span>
              </label>
              
              <div className="relative border-2 border-dashed rounded-xl p-6 text-center transition-all bg-gray-50 border-gray-300 hover:border-[#135f38] cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleNormalizationAndSetFile}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="text-[#135f38]" size={28} />
                  {selectedFile ? (
                    <span className="text-sm font-medium text-gray-800 truncate max-w-[260px]">
                      {selectedFile.name} (Dinormalisasi)
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">
                      Klik atau seret file .xlsx ke sini
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200/60 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isSubmitting}
              className="px-5 py-2 text-sm font-bold text-white bg-[#135f38] hover:bg-[#11562f] rounded-xl shadow-sm transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? "Mengimpor..." : "Mulai Import"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
