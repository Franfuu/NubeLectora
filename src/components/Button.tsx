// 3. Componente reutilizable (Botón personalizable)
interface Button {
  texto: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  onClick: () => void;
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente reutilizable
 * ✅ REQUISITO A: Componente que recibe props para personalizar apariencia
 * ============================================================================
 * 
 * Button cumple con:
 * - Es REUTILIZABLE: se puede usar en diferentes partes de la aplicación
 * - Recibe props que PERSONALIZAN:
 *   1. texto: contenido del botón
 *   2. color: estilo visual (primary, secondary, danger, success, warning)
 *   3. onClick: función a ejecutar al hacer click
 * - Demuestra patrón de componente reutilizable con variantes de estilo
 * - Permite diferentes colores mediante prop opcional con valor por defecto
 * 
 * PATRÓN: Presentational Component reutilizable con variantes
 * REUTILIZACIÓN: Puede usarse en múltiples contextos
 * PERSONALIZACIÓN: Texto, color y comportamiento mediante props
 */
const Button = ({ texto, color = 'primary', onClick }: Button) => {
  return (
    <button 
      className={`btn btn-${color}`} // ✅ Clase dinámica según prop 'color'
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Button;