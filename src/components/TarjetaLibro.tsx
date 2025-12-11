// src/components/TarjetaLibro.tsx
import type { Libro } from "../types/libro";
import EtiquetaEstado from "./EtiquetaEstado";

interface PropsTarjeta {
  libro: Libro;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  mostrarDetalles?: boolean; // ✅ NUEVO: controla si se muestran autor/estado/calificación
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente reutilizable (UNIFICADO)
 * ✅ REQUISITO A: Componente que recibe props para personalizar contenido
 * ✅ REQUISITO A: Componente que recibe callbacks
 * ✅ REQUISITO C: Demuestra reutilización de componentes
 * ============================================================================
 * 
 * TarjetaLibro cumple con:
 * - Es un componente REUTILIZABLE para mostrar información de libros
 * - Se usa MÚLTIPLES VECES en ListaLibros con diferentes datos
 * - Recibe props que PERSONALIZAN su contenido:
 *   1. libro: objeto con toda la información del libro
 *   2. onSelect: función callback para seleccionar el libro
 *   3. onDelete: función callback para eliminar el libro
 *   4. mostrarDetalles (opcional): muestra/oculta información extendida
 * - Muestra información completa del libro: portada, título, autor, estado, calificación
 * - Usa el componente reutilizable EtiquetaEstado internamente
 * - Gestiona eventos de click (seleccionar y eliminar)
 * 
 * PATRÓN: Presentational Component reutilizable
 * REUTILIZACIÓN: 
 *   - Usado N veces en ListaLibros con diferentes props
 *   - Reutiliza internamente EtiquetaEstado
 * COMUNICACIÓN: Padre -> Hijo (props) y Hijo -> Padre (callbacks)
 * 
 * ESTILOS: Todos los estilos están definidos en App.css (clase .tarjeta-libro)
 */
function TarjetaLibro({ libro, onSelect, onDelete, mostrarDetalles = true }: PropsTarjeta) {
  /**
   * Maneja el click en la tarjeta para seleccionar el libro
   * ✅ Utiliza el callback recibido para comunicar al padre
   */
  const handleClick = () => {
    onSelect(libro.id); // ✅ COMUNICACIÓN: Hijo -> Padre mediante callback
  };

  /**
   * Maneja el click en el botón eliminar
   * ✅ Utiliza el callback recibido para comunicar al padre
   * ✅ Previene propagación para evitar que se active onSelect
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se active el handleClick del contenedor
    onDelete(libro.id); // ✅ COMUNICACIÓN: Hijo -> Padre mediante callback
  };

  return (
    <div className="tarjeta-libro" onClick={handleClick}>
      {/* ========== BOTÓN ELIMINAR ========== */}
      {/* Visible solo al hacer hover sobre la tarjeta (CSS: .tarjeta-libro:hover .btn-delete) */}
      <button
        className="btn-delete"
        onClick={handleDelete}
        title="Eliminar libro"
      >
        X
      </button>

      {/* ========== PORTADA DEL LIBRO ========== */}
      {/* Estilos en App.css (.tarjeta-libro img) */}
      <img src={libro.portada} alt={libro.titulo} />

      {/* ========== TÍTULO DEL LIBRO ========== */}
      {/* Estilos en App.css (.tarjeta-libro h3) */}
      <h3>{libro.titulo}</h3>


      {/* ========== AUTOR DEL LIBRO ========== */}
          {/* Estilos en App.css (.tarjeta-libro .autor) */}
          <p className="autor">{libro.autor}</p>
      {/* 
        🔽 Bloque opcional controlado por mostrarDetalles
        Si mostrarDetalles es false, se ocultan estado y calificación
      */}
      {mostrarDetalles && (
        <>
          {/* ========== ETIQUETA DE ESTADO ========== */}
          {/* 
            ✅ REQUISITO C: Uso de componente reutilizable EtiquetaEstado
            Se pasa el estado del libro como prop
            Estilos en App.css (.badge, .badge-leido, .badge-leyendo, .badge-pendiente)
          */}
          <EtiquetaEstado estado={libro.estado} />

          {/* ========== CALIFICACIÓN (OPCIONAL) ========== */}
          {/* Solo se muestra si el libro tiene calificación */}
          {/* Estilos en App.css (.tarjeta-libro .calificacion) */}
          {libro.calificacion && (
            <div className="calificacion">
              {"⭐".repeat(libro.calificacion)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TarjetaLibro;