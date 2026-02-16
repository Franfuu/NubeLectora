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