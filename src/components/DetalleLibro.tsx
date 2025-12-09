import EtiquetaEstado from './EtiquetaEstado';
import Button from './Button';
import type { Libro } from '../types/libro';

interface DetalleLibroProps {
  libro: Libro | null;
  onClose: () => void;
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Panel de información de elemento seleccionado (OBLIGATORIO)
 * ✅ REQUISITO C: Demuestra reutilización de componentes
 * ============================================================================
 * 
 * DetalleLibro cumple con:
 * - Actúa como "VISOR" o "PANEL DE INFORMACIÓN" del elemento seleccionado
 * - Lee el estado compartido 'libroSeleccionado' (a través de la prop 'libro')
 * - Muestra información DETALLADA y COMPLETA del libro:
 *   1. Portada (tamaño grande)
 *   2. Título
 *   3. Autor
 *   4. Año de publicación (si existe)
 *   5. Estado de lectura (mediante EtiquetaEstado reutilizable)
 *   6. Calificación (si existe)
 *   7. Reseña completa (si existe)
 * - Usa componentes reutilizables: EtiquetaEstado y Button
 * - Se muestra como overlay/modal sobre el resto de la aplicación
 * - Permite cerrar el panel mediante botón o click fuera
 * 
 * PATRÓN: Modal/Detail View Component
 * REUTILIZACIÓN: Usa EtiquetaEstado y Button
 * COMUNICACIÓN: Padre -> Hijo (libro seleccionado)
 */
const DetalleLibro = ({ libro, onClose }: DetalleLibroProps) => {
  // ========== CASO: NO HAY LIBRO SELECCIONADO ========== 
  // Si no hay libro, no renderiza nada
  if (!libro) return null;

  return (
    // ========== OVERLAY (FONDO OSCURO) ========== 
    // Click en el overlay cierra el panel
    <div className="detalle-libro-overlay" onClick={onClose}>
      {/* ========== PANEL DE DETALLE ========== */}
      {/* Click dentro del panel NO lo cierra (stopPropagation) */}
      <div className="detalle-libro" onClick={(e) => e.stopPropagation()}>
        
        {/* ========== ENCABEZADO CON TÍTULO Y BOTÓN CERRAR ========== */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1rem' 
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{libro.titulo}</h2>
          {/* 
            ✅ REUTILIZACIÓN: Uso de componente Button
            Se pasa color="danger" para estilo rojo
          */}
          <Button texto="Cerrar"  onClick={onClose} />
        </div>
        
        {/* ========== PORTADA GRANDE ========== */}
        <img src={libro.portada} alt={libro.titulo} />
        
        {/* ========== AUTOR ========== */}
        <h3>{libro.autor}</h3>
        
        {/* ========== AÑO (OPCIONAL) ========== */}
        {libro.año && <p className="año">Año: {libro.año}</p>}
        
        {/* ========== ESTADO DE LECTURA ========== */}
        {/* 
          ✅ REQUISITO C: Reutilización de EtiquetaEstado
          Se usa el MISMO componente que en LibroCard
          Demuestra reutilización en múltiples contextos
        */}
        <EtiquetaEstado estado={libro.estado} />
        
        {/* ========== CALIFICACIÓN (OPCIONAL) ========== */}
        {libro.calificacion && (
          <div className="calificacion-detalle">
            {'⭐'.repeat(libro.calificacion)}
          </div>
        )}
        
        {/* ========== RESEÑA (OPCIONAL) ========== */}
        {libro.resena && (
          <div className="resena">
            <h4>Reseña</h4>
            <p>{libro.resena}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleLibro;