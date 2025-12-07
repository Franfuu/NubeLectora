export type Libro = {
  id: number;
  titulo: string;
  autor: string;
  portada: string; // URL de la imagen
  año?: number; // Opcional
  estado: "leido" | "pendiente" | "leyendo";
  resena?: string; // Opcional
  calificacion?: number; // 1 a 5
}