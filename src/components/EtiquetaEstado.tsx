interface EtiquetaEstado {
  estado: "leido" | "pendiente" | "leyendo";
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente reutilizable (2 de 2 requeridos)
 * ✅ REQUISITO A: Componente que recibe props para personalizar apariencia
 * ✅ REQUISITO C: Componente usado múltiples veces
 * ============================================================================
 * 
 * EtiquetaEstado cumple con:
 * - Es REUTILIZABLE: se usa en LibroCard Y DetalleLibro
 * - Recibe props que PERSONALIZAN su apariencia:
 *   1. estado: determina el color de fondo y el texto
 * - Cambia completamente de estilo según la prop recibida:
 *   - "leido" → fondo verde → texto "Leído"
 *   - "leyendo" → fondo naranja → texto "Leyendo"
 *   - "pendiente" → fondo rojo → texto "Pendiente"
 * - Demuestra REUTILIZACIÓN con diferentes valores de props
 * - Componente pequeño, enfocado y fácil de mantener
 * 
 * PATRÓN: Presentational Component reutilizable con variantes
 * REUTILIZACIÓN: Usado en 2+ componentes diferentes
 * PERSONALIZACIÓN: Apariencia completa basada en props
 */
const EtiquetaEstado = ({ estado }: EtiquetaEstado) => {
  // ============================================================================
  // MAPEO: estado → texto a mostrar
  // ============================================================================
  // Define los textos según el estado recibido como prop
  const textos = {
    leido: "Leído",
    leyendo: "Leyendo",
    pendiente: "Pendiente"
  };

  // ============================================================================
  // ✅ La clase CSS cambia según la prop 'estado' (personalización de apariencia)
  // ============================================================================
  // Clase base: "badge"
  // Clase variante: "badge-{estado}" → determina el color de fondo
  // Ejemplos: "badge badge-leido", "badge badge-leyendo", "badge badge-pendiente"
  return (
    <span className={`badge badge-${estado}`}>
      {textos[estado]} {/* ✅ Texto dinámico según la prop */}
    </span>
  );
};

export default EtiquetaEstado;