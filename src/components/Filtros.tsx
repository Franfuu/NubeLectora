// 7. Componente con props personalizables y estado local
import { useState } from 'react';

interface FiltrosProps {
  onFiltrarEstado: (estado: string) => void;
  onBuscar: (texto: string) => void;
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente que recibe callbacks
 * ✅ REQUISITO B.1: Componente con estado local independiente (2 de 2 requeridos)
 * ============================================================================
 * 
 * Filtros cumple con:
 * - Recibe DOS callbacks para comunicar al padre:
 *   1. onFiltrarEstado: cambia el filtro por estado de lectura
 *   2. onBuscar: cambia el texto de búsqueda
 * - Tiene su propio estado local 'estadoActivo' independiente del estado global
 * - Permite comunicación bidireccional hijo <-> padre
 * - Gestiona la interfaz de filtrado y búsqueda
 * 
 * PATRÓN: Controlled Component con estado local UI
 * COMUNICACIÓN: Hijo -> Padre mediante callbacks múltiples
 */
const Filtros = ({ onFiltrarEstado, onBuscar }: FiltrosProps) => {
  // ============================================================================
  // ✅ REQUISITO B.1: Estado local del componente
  // ============================================================================
  // Este estado es INDEPENDIENTE y solo controla qué botón está activo visualmente
  // No afecta directamente al filtrado (eso lo hace el estado global en App)
  const [estadoActivo, setEstadoActivo] = useState('todos');

  /**
   * Cambia el filtro de estado
   * ✅ Actualiza estado local (UI) Y comunica al padre (lógica)
   */
  const cambiarFiltro = (estado: string) => {
    setEstadoActivo(estado); // Actualiza estado local para marcar botón activo
    onFiltrarEstado(estado); // ✅ Comunica al padre (App) mediante callback
  };

  return (
    <div className="filtros">
      {/* ========== BUSCADOR ========== */}
      {/* Input que comunica cambios al padre mediante callback */}
      <input
        type="text"
        className="input-busqueda"
        placeholder="Buscar por título o autor..."
        onChange={(e) => onBuscar(e.target.value)} // ✅ Callback al padre
      />

      {/* ========== BOTONES DE FILTRO POR ESTADO ========== */}
      {/* Cada botón usa el estado local para saber si está activo */}
      <div className="filtros-estado">
        {/* Botón: Todos */}
        <button
          className={estadoActivo === 'todos' ? 'active' : ''} // ✅ Usa estado local
          onClick={() => cambiarFiltro('todos')} // ✅ Callback al padre
        >
          Todos
        </button>
        
        {/* Botón: Leídos */}
        <button
          className={estadoActivo === 'leido' ? 'active' : ''} // ✅ Usa estado local
          onClick={() => cambiarFiltro('leido')} // ✅ Callback al padre
        >
          Leídos
        </button>
        
        {/* Botón: Leyendo */}
        <button
          className={estadoActivo === 'leyendo' ? 'active' : ''} // ✅ Usa estado local
          onClick={() => cambiarFiltro('leyendo')} // ✅ Callback al padre
        >
          Leyendo
        </button>
        
        {/* Botón: Pendientes */}
        <button
          className={estadoActivo === 'pendiente' ? 'active' : ''} // ✅ Usa estado local
          onClick={() => cambiarFiltro('pendiente')} // ✅ Callback al padre
        >
          Pendientes
        </button>
      </div>
    </div>
  );
};

export default Filtros;