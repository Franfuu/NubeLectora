import { useState } from "react";
import type { Libro } from "../types/libro";

interface FormularioLibroProps {
  onAgregarLibro: (libro: Omit<Libro, "id">) => void;
}

const FormularioLibro = ({ onAgregarLibro }: FormularioLibroProps) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [portada, setPortada] = useState("");
  const [año, setAño] = useState<number | undefined>();
  const [estado, setEstado] = useState<"leido" | "pendiente" | "leyendo">("pendiente");
  const [resena, setResena] = useState("");
  const [calificacion, setCalificacion] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onAgregarLibro({
      titulo,
      autor,
      portada,
      año,
      estado,
      resena: resena || undefined,
      calificacion
    });

    // Resetear formulario
    setTitulo("");
    setAutor("");
    setPortada("");
    setAño(undefined);
    setEstado("pendiente");
    setResena("");
    setCalificacion(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-libro">
      <h2>➕ Agregar Nuevo Libro</h2>
      
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />
      
      <input
        type="url"
        placeholder="URL de la portada"
        value={portada}
        onChange={(e) => setPortada(e.target.value)}
        required
      />
      
      <input
        type="number"
        placeholder="Año (opcional)"
        value={año || ""}
        onChange={(e) => setAño(e.target.value ? Number(e.target.value) : undefined)}
      />
      
      <select value={estado} onChange={(e) => setEstado(e.target.value as any)}>
        <option value="pendiente">Pendiente</option>
        <option value="leyendo">Leyendo</option>
        <option value="leido">Leído</option>
      </select>
      
      <textarea
        placeholder="Reseña (opcional)"
        value={resena}
        onChange={(e) => setResena(e.target.value)}
      />
      
      <select 
        value={calificacion || ""} 
        onChange={(e) => setCalificacion(e.target.value ? Number(e.target.value) : undefined)}
      >
        <option value="">Sin calificación</option>
        <option value="1">⭐ 1</option>
        <option value="2">⭐ 2</option>
        <option value="3">⭐ 3</option>
        <option value="4">⭐ 4</option>
        <option value="5">⭐ 5</option>
      </select>
      
      <button type="submit" className="btn-submit">Agregar Libro</button>
    </form>
  );
};

export default FormularioLibro;