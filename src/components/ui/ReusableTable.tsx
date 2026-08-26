import React from "react";

// Interface untuk mendefinisikan kolom tabel
export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

// Interface untuk properti komponen Table
export interface ReusableTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function ReusableTable<T extends { id?: string | number }>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "Tidak ada data tersedia.",
}: ReusableTableProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className={`py-4 px-6 font-semibold ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col, colIndex) => {
                    let cellContent: React.ReactNode;

                    if (typeof col.accessor === "function") {
                      // Jika accessor berupa fungsi, panggil dengan membawa data baris tersebut
                      cellContent = col.accessor(row);
                    } else {
                      // Jika accessor berupa key string biasa
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
    </div>
  );
}
