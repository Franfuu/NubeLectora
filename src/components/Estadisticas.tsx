// 8. Componente que recibe props para personalizar apariencia
import type { Libro } from '../types/libro';

interface EstadisticasProps {
  libros: Libro[];
  mostrarTotalLeidos?: boolean;
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente que recibe props para personalizar contenido
 * ✅ REQUISITO B.2: Componente que LEE estado compartido
 * ============================================================================
 * 
 * Estadisticas cumple con:
 * - Recibe la prop 'libros' (estado compartido desde App)
 * - Calcula y muestra estadísticas DINÁMICAS basadas en los datos recibidos:
 *   1. Total de libros
 *   2. Libros leídos
 *   3. Libros en progreso (leyendo)
 *   4. Libros pendientes
 *   5. Porcentaje de progreso (libros leídos vs total)
 * - Personaliza su contenido según la prop recibida
 * - Lee el estado compartido pero NO lo modifica
 * - Muestra barra de progreso visual
 * 
 * PATRÓN: Presentational Component (solo lectura)
 * COMUNICACIÓN: Padre -> Hijo mediante props
 */
const Estadisticas = ({ libros, mostrarTotalLeidos = true }: EstadisticasProps) => {
  // ============================================================================
  // CÁLCULOS DINÁMICOS BASADOS EN LA PROP RECIBIDA
  // ============================================================================
  
  // Calcula el total de libros en la biblioteca
  const totalLibros = libros.length;
  
  // Calcula cuántos libros están en estado "leído"
  const librosLeidos = libros.filter(l => l.estado === 'leido').length;
  
  // Calcula cuántos libros están en estado "leyendo"
  const librosLeyendo = libros.filter(l => l.estado === 'leyendo').length;
  
  // Calcula cuántos libros están en estado "pendiente"
  const librosPendientes = libros.filter(l => l.estado === 'pendiente').length;
  
  // Calcula el porcentaje de libros leídos para la barra de progreso
  // Si no hay libros, el porcentaje es 0
  const porcentajeLeidos = totalLibros > 0 ? (librosLeidos / totalLibros) * 100 : 0;

  return (
    <div className="estadisticas">
      <h3>Estadísticas</h3>
      
      {/* ========== GRID DE ESTADÍSTICAS ========== */}
      {/* Muestra 4 tarjetas con las estadísticas calculadas */}
      <div className="stats-grid">
        {/* Tarjeta: Total de libros */}
        {mostrarTotalLeidos && (
        <div className="stat-item">
          <span className="stat-numero">{totalLibros}</span>
          <span className="stat-label">Total</span>
        </div>
         )}
        {/* Tarjeta: Libros leídos */}
        <div className="stat-item">
          <span className="stat-numero">{librosLeidos}</span>
          <span className="stat-label">Leídos</span>
        </div>
        
        {/* Tarjeta: Libros en progreso */}
        <div className="stat-item">
          <span className="stat-numero">{librosLeyendo}</span>
          <span className="stat-label">Leyendo</span>
        </div>
        
        {/* Tarjeta: Libros pendientes */}
        <div className="stat-item">
          <span className="stat-numero">{librosPendientes}</span>
          <span className="stat-label">Pendientes</span>
        </div>
      </div>

      {/* ========== BARRA DE PROGRESO ========== */}
      {/* Muestra visualmente el porcentaje de libros leídos */}
      <div className="progreso">
        <div 
          className="barra-progreso" 
          style={{ width: `${porcentajeLeidos}%` }} // ✅ Ancho dinámico basado en cálculo
        />
      </div>
    </div>
  );
};

export default Estadisticas;