/**
 * ============================================================================
 * TIPO: Libro
 * ============================================================================
 * 
 * Define la estructura de datos de un libro en la aplicación.
 * Todos los componentes usan este tipo para asegurar consistencia de datos.
 * 
 * Campos:
 * - id: Identificador único del libro (number)
 * - titulo: Título del libro (string, obligatorio)
 * - autor: Autor del libro (string, obligatorio)
 * - portada: URL de la imagen de portada (string, obligatorio)
 * - año: Año de publicación (number, opcional)
 * - estado: Estado de lectura - "leido" | "pendiente" | "leyendo" (obligatorio)
 * - resena: Reseña o comentario sobre el libro (string, opcional)
 * - calificacion: Puntuación de 1 a 5 estrellas (number, opcional)
 */
export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  portada: string;
  año?: number;
  estado: "leido" | "pendiente" | "leyendo";
  resena?: string;
  calificacion?: number;
}