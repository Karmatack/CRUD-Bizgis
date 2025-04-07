// src/pages/CrudCliente.jsx
import React, { useEffect, useState } from "react";
import TableGeneralCustom from "../components/table/TableGeneralCustom";
import ModalCliente from "../components/modal/ModalCliente";

import Logo from "../assets/logo/logo.webp"; // Logo de la app

// Íconos de lucide-react --> https://lucide.dev
import { Eye, Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { fetchClientes, crudCliente } from "../services/ClienteService";

export default function CrudCliente() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // 0 => create, 1 => read, 2 => update, 3 => delete
  const [selectedAction, setSelectedAction] = useState(0);

  // Búsqueda en cliente
  const [searchText, setSearchText] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClientes();
      setData(response);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (item, action) => {
    setSelectedItem(item);
    setSelectedAction(action);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Manejo de inputs del modal
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    try {
      await crudCliente(selectedItem, selectedAction);
      alert("Operación completada correctamente.");
      setIsOpen(false);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Error al ejecutar la operación.");
    }
  };

  // Filtrado por nombre
  const filteredData = data.filter((item) => {
    if (!searchText) return true;
    return item.nombre.toLowerCase().includes(searchText.toLowerCase());
  });

  // Lógica de paginación
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Cortamos los datos a la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Funciones para avanzar/retroceder página
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <div className="p-4">Cargando datos...</div>;
  }

  // Columnas para la tabla
  const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Categoría", uid: "categoria" },
    { name: "X", uid: "x" },
    { name: "Y", uid: "y" },
    { name: "Acciones", uid: "actions" },
  ];

  // Render custom cell
  const renderCustomCell = (item, columnKey) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>; // sin #
      case "nombre":
        return (
          <div className="flex flex-col text-center">
            <span className="font-semibold">{item.nombre}</span>
          </div>
        );
      case "categoria":
        return (
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm">
            {item.categoria}
          </span>
        );
      case "x":
        return <span>{item.x}</span>;
      case "y":
        return <span>{item.y}</span>;
      case "actions":
        return (
          <div className="flex items-center gap-2 justify-center">
            {/* Ver */}
            <button
              className="text-blue-600 hover:text-blue-800"
              title="Ver"
              onClick={() => openModal(item, 1)}
            >
              <Eye width={18} height={18} />
            </button>

            {/* Editar */}
            <button
              className="text-green-600 hover:text-green-800"
              title="Editar"
              onClick={() => openModal(item, 2)}
            >
              <Pencil width={18} height={18} />
            </button>

            {/* Eliminar */}
            <button
              className="text-red-600 hover:text-red-800"
              title="Eliminar"
              onClick={() => openModal(item, 3)}
            >
              <Trash2 width={18} height={18} />
            </button>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex items-center gap-2">
    <img
      src={Logo}
      alt="Logo"
      className="w-30 h-15 object-contain mt-4"
    />
    <div className="text-left leading-tight">
      <h1 className="text-xl font-bold text-gray-800">CRUD de Clientes</h1>
      <p className="text-gray-600 text-sm">Gestiona tus clientes de manera eficiente</p>
    </div>
  </div>
        {/* Botón registrar */}
        <button
          className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => openModal({}, 0)}
        >
          <Plus className="w-5 h-5" />
          Registrar
        </button>
      </div>

      {/* Card principal */}
      <div className="bg-white rounded shadow-md p-4">
        {/* Buscador (opcional) */}
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchText}
            onChange={(e) => {
              setCurrentPage(1); // Reiniciamos pag al filtrar
              setSearchText(e.target.value);
            }}
            className="block w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400"
          />
        </div>

        {/* Tabla */}
        <TableGeneralCustom
          master={{
            data: currentData,
            columns,
          }}
          renderCellPadre={renderCustomCell}
        />

        {/* Footer con paginación y conteo */}
<div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
  <span className="mb-2 sm:mb-0">
    Mostrando {currentData.length} de {filteredData.length} resultados
  </span>
  <div className="flex items-center gap-2">
    <button
      onClick={goToPreviousPage}
      disabled={currentPage === 1}
      className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    <span>
      Página {currentPage} de {totalPages}
    </span>
    <button
      onClick={goToNextPage}
      disabled={currentPage === totalPages}
      className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
</div>
      </div>

      {/* Modal */}
      <ModalCliente
        isOpen={isOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
        handleChange={handleChange}
        handleConfirm={handleConfirm}
        selectedAction={selectedAction}
      />
    </div>
  );
}