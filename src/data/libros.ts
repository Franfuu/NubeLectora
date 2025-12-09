import type { Libro } from "../types/libro";
/**
 * ============================================================================
 * DATOS INICIALES: Libros de ejemplo
 * ============================================================================
 * 
 * Array de libros precargados que se usa como estado inicial en App.tsx
 * Contiene 20 libros de diferentes géneros, autores y estados de lectura
 * 
 * ✅ Permite demostrar todas las funcionalidades de la aplicación desde el inicio:
 * - Visualización en grid
 * - Filtrado por estado (leídos, leyendo, pendientes)
 * - Búsqueda por título o autor
 * - Estadísticas con datos reales
 * - Selección y vista de detalles
 * - Diferentes calificaciones y reseñas
 */
export const librosIniciales: Libro[] = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    portada: "https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg",
    año: 1967,
    estado: "leido",
    resena: "Una obra maestra del realismo mágico",
    calificacion: 5
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    portada: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    año: 1949,
    estado: "leido",
    calificacion: 5
  },
  {
    id: 3,
    titulo: "El Quijote",
    autor: "Miguel de Cervantes",
    // Link cambiado a una edición verificada (Edición RAE)
    portada: "https://covers.openlibrary.org/b/id/12653139-L.jpg",
    año: 1605,
    estado: "leyendo",
    calificacion: 4
  },
  {
    id: 4,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    portada: "https://covers.openlibrary.org/b/isbn/9788478884452-L.jpg",
    año: 1997,
    estado: "leido",
    calificacion: 5
  },
  {
    id: 5,
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    portada: "https://covers.openlibrary.org/b/isbn/9780307476319-L.jpg",
    año: 2003,
    estado: "pendiente"
  },
  {
    id: 6,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    portada: "https://covers.openlibrary.org/b/isbn/9780156013987-L.jpg",
    año: 1943,
    estado: "leido",
    resena: "Una historia encantadora llena de sabiduría",
    calificacion: 5
  },
  {
    id: 7,
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    portada: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    año: 1813,
    estado: "leido",
    calificacion: 4
  },
  {
    id: 8,
    titulo: "El Hobbit",
    autor: "J.R.R. Tolkien",
    portada: "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg",
    año: 1937,
    estado: "leyendo",
    calificacion: 5
  },
  {
    id: 9,
    titulo: "Crimen y Castigo",
    autor: "Fiódor Dostoyevski",
    portada: "https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg",
    año: 1866,
    estado: "pendiente"
  },
  {
    id: 10,
    titulo: "La Sombra del Viento",
    autor: "Carlos Ruiz Zafón",
    // Link cambiado a la portada clásica oscura
    portada: "https://covers.openlibrary.org/b/id/10523497-L.jpg",
    año: 2001,
    estado: "leido",
    resena: "Fascinante novela ambientada en Barcelona",
    calificacion: 5
  },
  {
    id: 11,
    titulo: "Los Pilares de la Tierra",
    autor: "Ken Follett",
    portada: "https://covers.openlibrary.org/b/isbn/9780451166890-L.jpg",
    año: 1989,
    estado: "leido",
    calificacion: 4
  },
  {
    id: 12,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    portada: "https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg",
    año: 1953,
    estado: "leyendo",
    calificacion: 4
  },
  {
    id: 13,
    titulo: "El Alquimista",
    autor: "Paulo Coelho",
    portada: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    año: 1988,
    estado: "leido",
    calificacion: 3
  },
  {
    id: 14,
    titulo: "La Casa de los Espíritus",
    autor: "Isabel Allende",
    portada: "https://covers.openlibrary.org/b/isbn/9780553383805-L.jpg",
    año: 1982,
    estado: "pendiente"
  },
  {
    id: 15,
    titulo: "Matar a un Ruiseñor",
    autor: "Harper Lee",
    portada: "https://covers.openlibrary.org/b/isbn/9780446310789-L.jpg",
    año: 1960,
    estado: "leido",
    resena: "Una poderosa historia sobre justicia y prejuicios",
    calificacion: 5
  },
  {
    id: 16,
    titulo: "El Juego de Ender",
    autor: "Orson Scott Card",
    portada: "https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg",
    año: 1985,
    estado: "leyendo"
  },
  {
    id: 17,
    titulo: "La Carretera",
    autor: "Cormac McCarthy",
    portada: "https://covers.openlibrary.org/b/isbn/9780307387899-L.jpg",
    año: 2006,
    estado: "pendiente"
  },
  {
    id: 18,
    titulo: "Rebelión en la Granja",
    autor: "George Orwell",
    portada: "https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg",
    año: 1945,
    estado: "leido",
    calificacion: 5
  },
  {
    id: 19,
    titulo: "Crónica de una Muerte Anunciada",
    autor: "Gabriel García Márquez",
    portada: "https://covers.openlibrary.org/b/isbn/9781400034710-L.jpg",
    año: 1981,
    estado: "leido",
    calificacion: 4
  },
  {
    id: 20,
    titulo: "El Nombre del Viento",
    autor: "Patrick Rothfuss",
    portada: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
    año: 2007,
    estado: "leyendo",
    calificacion: 5
  }
];