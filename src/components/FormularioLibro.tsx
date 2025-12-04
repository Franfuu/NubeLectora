// src/components/FormularioLibro.tsx
import { useState, type FormEvent } from "react";
import type { Libro } from "../types/libro";

interface PropsFormulario {
  alAgregarLibro: (nuevoLibro: Libro) => void; // Callback para enviar datos arriba
}

function FormularioLibro({ alAgregarLibro }: PropsFormulario) {
  // ESTADO LOCAL (Requisito B.1)
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estado, setEstado] = useState<"leido" | "pendiente">("pendiente");

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !autor.trim()) return;

    const nuevoLibro: Libro = {
      id: Date.now(), // Generamos ID temporal
      titulo,
      autor,
      portada: "https://via.placeholder.com/150",
      estado
    };

    alAgregarLibro(nuevoLibro); // Enviamos al padre (App)
    
    // Limpiamos el formulario
    setTitulo("");
    setAutor("");
  }

  return (
    <form onSubmit={manejarEnvio} className="formulario-libro">
      <h3>Nuevo Libro</h3>
      <input 
        type="text" 
        placeholder="Título del libro" 
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Autor" 
        value={autor} 
        onChange={(e) => setAutor(e.target.value)} 
      />
      <select 
        value={estado} 
        onChange={(e) => setEstado(e.target.value as "leido" | "pendiente")}
      >
        <option value="pendiente">Pendiente</option>
        <option value="leido">Leído</option>
      </select>
      <button type="submit">Añadir a la colección</button>
    </form>
  );
}

export default FormularioLibro;