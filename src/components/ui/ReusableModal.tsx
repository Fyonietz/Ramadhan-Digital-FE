import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export interface FormField<T> {
  name: keyof T;
  label: string;
  type?: "text" | "number" | "select" | "password";
  options?: { label: string; value: string | number }[];
  placeholder?: string;
}

export interface ReusableModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  title: string;
  fields: FormField<T>[];
  initialData?: T | null;
}

export default function ReusableModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  initialData,
}: ReusableModalProps<T>) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  // State untuk melacak visibilitas password tiap field berjenis password
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const defaultData: Record<string, any> = {};
      fields.forEach((field) => {
        defaultData[field.name as string] = "";
      });
      setFormData(defaultData);
    }
    // Reset status mata password saat modal ditutup/dibuka
    setShowPasswords({});
  }, [initialData, fields, isOpen]);

  if (!isOpen) return null;

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {fields.map((field, index) => {
              const fieldNameString = String(field.name);
              const isPassword = field.type === "password";
              const showPassword = showPasswords[fieldNameString] || false;

              return (
                <div key={index} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={formData[fieldNameString] || ""}
                      onChange={(e) => handleChange(fieldNameString, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#135f38] transition-colors"
                      required
                    >
                      <option value="" disabled>Pilih {field.label}</option>
                      {field.options?.map((opt, optIdx) => (
                        <option key={optIdx} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="relative flex items-center">
                      <input
                        type={isPassword && showPassword ? "text" : field.type || "text"}
                        placeholder={field.placeholder || `Masukkan ${field.label}`}
                        value={formData[fieldNameString] || ""}
                        onChange={(e) => handleChange(fieldNameString, e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#135f38] transition-colors pr-10"
                        required={!initialData || fieldNameString !== "password"} // Password opsional saat edit jika kosong
                      />
                      
                      {/* Tombol Toggle Ikon Mata khusus tipe password */}
                      {isPassword && (
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(fieldNameString)}
                          className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Aksi */}
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
              className="px-5 py-2 text-sm font-bold text-white bg-[#135f38] hover:bg-[#11562f] rounded-xl shadow-sm transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
