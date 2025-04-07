// Un "mock" de datos en memoria
let clientesData = [
  { id: 1, nombre: "Laura Fernanda Martínez Ruiz", categoria: "VIP", x: 123.45, y: 67.89 },
  { id: 2, nombre: "Carlos Andrés Gómez Pérez", categoria: "Regular", x: 98.76, y: 54.32 },
  { id: 3, nombre: "Ana Lucía Torres Mendoza", categoria: "VIP", x: 111.22, y: 44.55 },
  { id: 4, nombre: "Luis Alberto Rojas Salinas", categoria: "Regular", x: 77.88, y: 66.55 },
  { id: 5, nombre: "Sofía Valentina Castro Morales", categoria: "VIP", x: 100.01, y: 50.50 },
  { id: 6, nombre: "Pedro Joaquín Díaz Vargas", categoria: "Regular", x: 90.12, y: 33.44 },
  { id: 7, nombre: "Lucía Mariana Vargas León", categoria: "VIP", x: 112.45, y: 64.32 },
  { id: 8, nombre: "Mateo Alejandro Salas Gutiérrez", categoria: "Regular", x: 85.23, y: 45.67 },
  { id: 9, nombre: "Mariana Isabel Reyes Contreras", categoria: "VIP", x: 121.12, y: 68.89 },
  { id: 10, nombre: "Jorge Elías Cabrera Ponce", categoria: "Regular", x: 88.90, y: 40.20 },
  { id: 11, nombre: "Valentina Paola López Ramírez", categoria: "VIP", x: 120.00, y: 55.55 },
  { id: 12, nombre: "Diego Armando Herrera Castañeda", categoria: "Regular", x: 99.99, y: 33.33 },
  { id: 13, nombre: "Camila Teresa Ramos Espinoza", categoria: "VIP", x: 130.30, y: 60.10 },
  { id: 14, nombre: "Andrés Felipe Morales Benítez", categoria: "Regular", x: 79.79, y: 48.88 },
  { id: 15, nombre: "Isabella Renata Silva Cárdenas", categoria: "VIP", x: 108.08, y: 58.58 },
  { id: 16, nombre: "Ricardo Emilio Peña Quiroz", categoria: "Regular", x: 95.50, y: 39.99 },
  { id: 17, nombre: "Gabriela Alejandra Ruiz Figueroa", categoria: "VIP", x: 114.44, y: 70.70 },
  { id: 18, nombre: "Tomás Eduardo León Barreto", categoria: "Regular", x: 87.65, y: 42.42 },
  { id: 19, nombre: "Daniela Carolina Méndez Palacios", categoria: "VIP", x: 124.12, y: 69.69 },
  { id: 20, nombre: "Santiago David Bravo Montoya", categoria: "Regular", x: 92.23, y: 35.35 },
  { id: 21, nombre: "Emma Patricia Valverde Núñez", categoria: "VIP", x: 105.55, y: 62.62 },
  { id: 22, nombre: "Francisco Javier Aguilar Becerra", categoria: "Regular", x: 89.11, y: 41.41 },
  { id: 23, nombre: "Natalia Irene Cárdenas Zavala", categoria: "VIP", x: 126.78, y: 66.66 },
  { id: 24, nombre: "Esteban Manuel Paredes Córdova", categoria: "Regular", x: 91.91, y: 38.38 },
];

  // Simulación de obtener clientes (read)
  export function fetchClientes() {
    return new Promise((resolve) => {
      // simulamos un retardo
      setTimeout(() => {
        resolve([...clientesData]); // devolvemos una copia
      }, 300);
    });
  }
  
  /**
   * CRUD en base a "action":
   * 0 => Create
   * 1 => Read (ver)
   * 2 => Update
   * 3 => Delete
   */
  export function crudCliente(item, action) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          switch (action) {
            case 0: {
              // Create
              // Generamos un ID simple
              const newId = clientesData.length
                ? Math.max(...clientesData.map((c) => c.id)) + 1
                : 1;
              const newItem = { ...item, id: newId };
              clientesData.push(newItem);
              break;
            }
            case 2: {
              // Update
              const index = clientesData.findIndex((c) => c.id === item.id);
              if (index !== -1) {
                clientesData[index] = { ...item };
              }
              break;
            }
            case 3: {
              // Delete
              clientesData = clientesData.filter((c) => c.id !== item.id);
              break;
            }
            default:
              // action 1 => Read: no hace nada especial, ya que fetchClientes se encarga de leer
              break;
          }
          resolve("OK");
        } catch (err) {
          reject(err);
        }
      }, 200);
    });
  }
  