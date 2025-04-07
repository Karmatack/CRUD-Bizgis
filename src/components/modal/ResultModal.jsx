// src/components/ResultModal.jsx
import React from "react";

export default function ResultModal({ isOpen, onClose, success, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {success ? "Operación Exitosa" : "Error en la Operación"}
        </h2>
        <p className="text-gray-700 text-center mb-4">
          {message}
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
