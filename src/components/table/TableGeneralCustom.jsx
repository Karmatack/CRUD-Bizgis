// src/components/table/TableGeneralCustom.jsx
import React from "react";

export default function TableGeneralCustom({ master, renderCellPadre }) {
  const { data, columns } = master;

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            {columns.map((col) => (
              <th
                key={col.uid}
                // Centramos con text-center y un padding decente
                className="py-2 px-3 text-gray-600 font-medium text-center"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => (
            <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.uid} className="py-2 px-3 text-center">
                  {renderCellPadre(item, col.uid)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}