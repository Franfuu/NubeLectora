import { useState, type FormEvent } from "react";
import type { Libro } from "../types/libro";

interface PropsFormulario {
  alAgregarLibro: (nuevoLibro: Libro) => void;
}

function FormularioLibro({ alAgregarLibro }: PropsFormulario) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [año, setAño] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [reseña, setReseña] = useState("");
  const [estado, setEstado] = useState<"leido" | "leyendo" | "pendiente">("pendiente");

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !autor.trim()) return;

    const nuevoLibro: Libro = {
      id: Date.now(),
      titulo,
      autor,
      año: año ? parseInt(año) : undefined,
      calificacion: calificacion > 0 ? calificacion : undefined,
      resena: reseña.trim() || undefined,
      portada: "https://via.placeholder.com/150",
      estado
    };

    alAgregarLibro(nuevoLibro);
    
    // Limpiamos el formulario
    setTitulo("");
    setAutor("");
    setAño("");
    setCalificacion(0);
    setReseña("");
    setEstado("pendiente");
  }

  return (
    <form onSubmit={manejarEnvio} className="formulario-libro">
      <h2>Nuevo Libro</h2>
      
      <input 
        type="text" 
        placeholder="Título del libro *" 
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      
      <input 
        type="text" 
        placeholder="Autor *" 
        value={autor} 
        onChange={(e) => setAutor(e.target.value)}
        required
      />
      
      <input 
        type="number" 
        placeholder="Año de publicación" 
        value={año} 
        onChange={(e) => setAño(e.target.value)}
        min="1000"
        max={new Date().getFullYear()}
      />
      
      <select 
        value={estado} 
        onChange={(e) => setEstado(e.target.value as "leido" | "leyendo" | "pendiente")}
      >
        <option value="pendiente">Pendiente</option>
        <option value="leyendo">Leyendo</option>
        <option value="leido">Leído</option>
      </select>
      
      <div className="formulario-libro__calificacion">
        <label>Calificación: {calificacion > 0 ? `${calificacion}/5` : 'Sin calificar'}</label>
        <input 
          type="range" 
          min="0" 
          max="5" 
          step="1"
          value={calificacion} 
          onChange={(e) => setCalificacion(parseInt(e.target.value))}
        />
      </div>
      
      <textarea 
        placeholder="Reseña (opcional)" 
        value={reseña} 
        onChange={(e) => setReseña(e.target.value)}
        rows={4}
      />
      
      <button type="submit">Añadir a la colección</button>
    </form>
  );
}

export default FormularioLibro;