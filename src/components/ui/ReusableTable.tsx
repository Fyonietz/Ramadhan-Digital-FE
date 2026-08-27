import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

export interface ReusableTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  searchableKeys?: (keyof T)[]; // Kolom mana saja yang bisa dicari
}

export default function ReusableTable<T extends { id?: string | number } & Record<string, any>>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "Tidak ada data tersedia.",
  searchableKeys = [],
}: ReusableTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default 5 baris per halaman

  // 1. Logika Filter Pencarian (Search)
  const filteredData = useMemo(() => {
    if (!searchTerm.trim() || searchableKeys.length === 0) return data;

    const lowerQuery = searchTerm.toLowerCase();
    return data.filter((row) =>
      searchableKeys.some((key) => {
        const val = row[key];
        return val != null && String(val).toLowerCase().includes(lowerQuery);
      })
    );
  }, [data, searchTerm, searchableKeys]);

  // 2. Logika Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Reset ke halaman 1 jika user mengetik di search bar
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      
      {/* Header Toolbar: Search Bar & Rows Per Page */}
      {searchableKeys.length > 0 && (
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Cari data..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 outline-none focus:border-[#135f38] transition-colors"
            />
          </div>

          {/* Pengatur Jumlah Baris */}
          <div className="flex items-center gap-2 text-xs text-gray-500 w-full sm:w-auto justify-end">
            <span>Tampilkan:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-[#135f38]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>per halaman</span>
          </div>
        </div>
      )}

      {/* Container Tabel dengan Inside Scroll & Sticky Header */}
      <div className="max-h-[450px] overflow-y-auto relative">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider shadow-sm">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={`py-4 px-6 font-semibold bg-gray-50 ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col, colIndex) => {
                    let cellContent: React.ReactNode;

                    if (typeof col.accessor === "function") {
                      cellContent = col.accessor(row);
                    } else {
                      cellContent = row[col.accessor] as React.ReactNode;
                    }

                    return (
                      <td key={colIndex} className={`py-4 px-6 ${col.className || ""}`}>
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          Menampilkan <span className="font-semibold text-gray-700">{paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> sampai{" "}
          <span className="font-semibold text-gray-700">
            {Math.min(currentPage * itemsPerPage, filteredData.length)}
          </span> dari{" "}
          <span className="font-semibold text-gray-700">{filteredData.length}</span> data
          {filteredData.length !== data.length && ` (difilter dari total ${data.length} data)`}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="px-3 py-1 font-medium text-gray-700">
            Hal. {currentPage} dari {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}
