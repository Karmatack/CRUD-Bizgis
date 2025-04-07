import React, { useState, useEffect } from "react";

export default function ModalCliente({
  isOpen,
  onClose,
  selectedItem,
  handleChange,
  handleConfirm,
  selectedAction,
}) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setError(""); // Limpiar errores al abrir modal
    }
  }, [isOpen]);

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // Título dinámico
  const titulo = {
    0: "Registrar un Cliente",
    1: "Detalles del Cliente",
    2: "Editar Cliente",
    3: "Eliminar Cliente",
  }[selectedAction] ?? "Acción Cliente";

  // Deshabilitar inputs cuando solo se ve o elimina
  const readOnly = selectedAction === 1 || selectedAction === 3;

  // Validar campos antes de guardar o editar
  const handleLocalConfirm = () => {
    if (selectedAction === 0 || selectedAction === 2) {
      const { nombre, categoria, x, y } = selectedItem || {};
  
      const camposFaltantes = [];
  
      if (!nombre?.trim()) camposFaltantes.push("Nombre");
      if (!categoria?.trim()) camposFaltantes.push("Categoría");
      if (x === null || x === undefined || x === "") camposFaltantes.push("X");
      if (y === null || y === undefined || y === "") camposFaltantes.push("Y");
  
      if (camposFaltantes.length > 0) {
        const mensaje =
          camposFaltantes.length === 1
            ? `El campo "${camposFaltantes[0]}" es obligatorio.`
            : "Por favor, completa todos los campos obligatorios.";
        setError(mensaje);
        return;
      }
    }
  
    // Si todo está bien
    setError("");
    handleConfirm();
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4">{titulo}</h2>

        {/* FORM */}
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
              name="nombre"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
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
              name="x"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
              value={selectedItem?.x ?? ""}
              onChange={handleChange}
              disabled={readOnly}
            />
          </label>

          <label className="text-sm">
            Y:
            <input
              type="number"
              name="y"
              className="border border-gray-300 rounded ml-2 p-1 w-full"
              value={selectedItem?.y ?? ""}
              onChange={handleChange}
              disabled={readOnly}
            />
          </label>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm mt-1">{error}</div>
          )}
        </div>

        {/* BOTONES */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cerrar
          </button>

          {selectedAction !== 1 && (
            <button
              onClick={handleLocalConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {{
                0: "Guardar",
                2: "Editar",
                3: "Eliminar",
              }[selectedAction] ?? "Confirmar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
