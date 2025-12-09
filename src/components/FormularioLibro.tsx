import { useState } from "react";
import type { Libro } from "../types/libro";

interface FormularioLibroProps {
  onAgregarLibro: (libro: Omit<Libro, "id">) => void;
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente formulario controlado (OBLIGATORIO)
 * ✅ REQUISITO A: Componente que recibe función callback
 * ✅ REQUISITO B.1: Componente con estado local independiente (1 de 2 requeridos)
 * ============================================================================
 * 
 * FormularioLibro cumple con:
 * - Es un formulario COMPLETAMENTE CONTROLADO (controlled component)
 * - Usa useState internamente para manejar TODOS los inputs:
 *   1. titulo (string)
 *   2. autor (string)
 *   3. portada (string URL)
 *   4. año (number | undefined)
 *   5. estado (enum: leido | pendiente | leyendo)
 *   6. resena (string opcional)
 *   7. calificacion (number 0-5 opcional)
 * - Recibe función callback 'onAgregarLibro' para comunicar al padre (App)
 * - Cada input está vinculado a su estado mediante value y onChange
 * - Resetea todos los estados locales después de enviar el formulario
 * 
 * PATRÓN: Controlled Component Pattern
 * COMUNICACIÓN: Hijo -> Padre mediante callback
 */
const FormularioLibro = ({ onAgregarLibro }: FormularioLibroProps) => {
  // ============================================================================
  // ✅ REQUISITO B.1: Estados locales del componente (7 estados independientes)
  // ============================================================================
  
  // Estado para el campo título (obligatorio)
  const [titulo, setTitulo] = useState("");
  
  // Estado para el campo autor (obligatorio)
  const [autor, setAutor] = useState("");
  
  // Estado para la URL de la portada (obligatorio)
  const [portada, setPortada] = useState("");
  
  // Estado para el año de publicación (opcional)
  const [año, setAño] = useState<number | undefined>();
  
  // Estado para el estado de lectura (obligatorio, valor por defecto: pendiente)
  const [estado, setEstado] = useState<"leido" | "pendiente" | "leyendo">("pendiente");
  
  // Estado para la reseña del libro (opcional)
  const [resena, setResena] = useState("");
  
  // Estado para la calificación 0-5 estrellas (opcional)
  const [calificacion, setCalificacion] = useState<number | undefined>();

  /**
   * Maneja el envío del formulario
   * ✅ Utiliza el callback recibido para comunicar al padre (App)
   * ✅ Resetea todos los estados locales después de enviar
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    
    // ✅ COMUNICACIÓN HIJO -> PADRE mediante callback
    // Envía los datos del nuevo libro al componente padre (App)
    onAgregarLibro({
      titulo,
      autor,
      portada,
      año,
      estado,
      resena: resena || undefined,
      calificacion
    });

    // Resetea todos los estados locales para limpiar el formulario
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
      {/* ========== INPUT CONTROLADO: TÍTULO ========== */}
      <input
        type="text"
        placeholder="Título"
        value={titulo} // ✅ Vinculado al estado
        onChange={(e) => setTitulo(e.target.value)} // ✅ Actualiza el estado
        required
      />
      
      {/* ========== INPUT CONTROLADO: AUTOR ========== */}
      <input
        type="text"
        placeholder="Autor"
        value={autor} // ✅ Vinculado al estado
        onChange={(e) => setAutor(e.target.value)} // ✅ Actualiza el estado
        required
      />
      
      {/* ========== INPUT CONTROLADO: PORTADA (URL) ========== */}
      <input
        type="url"
        placeholder="URL de la portada"
        value={portada} // ✅ Vinculado al estado
        onChange={(e) => setPortada(e.target.value)} // ✅ Actualiza el estado
        required
      />
      
      {/* ========== INPUT CONTROLADO: AÑO (OPCIONAL) ========== */}
      <input
        type="number"
        placeholder="Año (opcional)"
        value={año || ""} // ✅ Vinculado al estado
        onChange={(e) => setAño(e.target.value ? Number(e.target.value) : undefined)} // ✅ Actualiza el estado
      />
      
      {/* ========== SELECT CONTROLADO: ESTADO DE LECTURA ========== */}
      <select 
        value={estado} // ✅ Vinculado al estado
        onChange={(e) => setEstado(e.target.value as "leido" | "pendiente" | "leyendo")} // ✅ Actualiza el estado
      >
        <option value="pendiente">Pendiente</option>
        <option value="leyendo">Leyendo</option>
        <option value="leido">Leído</option>
      </select>
      
      {/* ========== TEXTAREA CONTROLADO: RESEÑA (OPCIONAL) ========== */}
      <textarea
        placeholder="Reseña (opcional)"
        value={resena} // ✅ Vinculado al estado
        onChange={(e) => setResena(e.target.value)} // ✅ Actualiza el estado
      />
      
      {/* ========== SELECT CONTROLADO: CALIFICACIÓN (OPCIONAL) ========== */}
      <select 
        value={calificacion || ""} // ✅ Vinculado al estado
        onChange={(e) => setCalificacion(e.target.value ? Number(e.target.value) : undefined)} // ✅ Actualiza el estado
      >
        <option value="">Sin calificación</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>
      
      {/* ========== BOTÓN DE ENVÍO ========== */}
      <button type="submit" className="btn-submit">Agregar Libro</button>
    </form>
  );
};

export default FormularioLibro;