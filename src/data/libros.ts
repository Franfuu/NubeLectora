import type { Libro } from "../types/libro";

export const librosIniciales: Libro[] = [
  {
    id: 1,
    titulo: "El Quijote",
    autor: "Miguel de Cervantes",
    portada: "https://via.placeholder.com/150",
    estado: "leido",
    calificacion: 5
  },
  {
    id: 2,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    portada: "https://via.placeholder.com/150",
    estado: "pendiente"
  }
];