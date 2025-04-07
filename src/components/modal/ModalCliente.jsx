// src/components/modal/ModalCliente.jsx
import React from "react";

export default function ModalCliente({
  isOpen,
  onClose,
  selectedItem,
  handleChange,
  handleConfirm,
  selectedAction,
}) {
  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // Título dinámico según acción
  let titulo = "";
  switch (selectedAction) {
    case 0:
      titulo = "Registrar un Cliente";
      break;
    case 1:
      titulo = "Detalles del Cliente";
      break;
    case 2:
      titulo = "Editar Cliente";
      break;
    case 3:
      titulo = "Eliminar Cliente";
      break;
    default:
      titulo = "Acción Cliente";
  }

  // Deshabilitar inputs cuando sea acción "ver" o "eliminar"
  const readOnly = selectedAction === 1 || selectedAction === 3;

  return (
    // Overlay
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Contenedor del modal */}
      <div className="bg-white p-4 rounded shadow w-96">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">{titulo}</h2>

        {/* Body: formulario simple */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            ID:
            <input
              type="number"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
              name="id"
              value={selectedItem?.id ?? ""}
              onChange={handleChange}
              disabled
            />
          </label>
          <label className="text-sm">
            Nombre:
            <input
              type="text"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
              name="nombre"
              value={selectedItem?.nombre ?? ""}
              onChange={handleChange}
              disabled={readOnly}
            />
          </label>
          <label className="text-sm">
            Categoría:
            <select
              name="categoria"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
              value={selectedItem?.categoria || ""}
              onChange={handleChange}
              disabled={readOnly}
            >
              <option value="">Seleccione categoría</option>
              <option value="VIP">VIP</option>
              <option value="Normal">Normal</option>
            </select>
          </label>
          <label className="text-sm">
            X:
            <input
              type="number"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
              name="x"
              value={selectedItem?.x ?? ""}
              onChange={handleChange}
              disabled={readOnly}
            />
          </label>
          <label className="text-sm">
            Y:
            <input
              type="number"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
              name="y"
              value={selectedItem?.y ?? ""}
              onChange={handleChange}
              disabled={readOnly}
            />
          </label>
        </div>

        {/* Footer: botones */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cerrar
          </button>
          {/* Si es acción "ver", no hacemos nada con Confirm, 
              Si es "eliminar", igual vamos a handleConfirm. */}
          {selectedAction !== 1 && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {selectedAction === 0
                ? "Guardar"
                : selectedAction === 2
                  ? "Editar"
                  : selectedAction === 3
                    ? "Eliminar"
                    : "Confirmar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
