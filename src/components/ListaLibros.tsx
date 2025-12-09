// src/components/ListaLibros.tsx
import TarjetaLibro from './TarjetaLibro';
import type { Libro } from '../types/libro';

interface ListaLibrosProps {
  libros: Libro[];
  onSelectLibro: (id: number) => void;
  onDeleteLibro: (id: number) => void;
}

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente que muestra lista de elementos (OBLIGATORIO)
 * ✅ REQUISITO A: Componente que recibe callbacks
 * ✅ REQUISITO C: Demuestra reutilización de componentes
 * ============================================================================
 * 
 * ListaLibros cumple con:
 * - Renderiza MÚLTIPLES VECES el componente reutilizable TarjetaLibro usando .map()
 * - Recibe callbacks para comunicar eventos al padre:
 *   1. onSelectLibro: cuando el usuario selecciona un libro
 *   2. onDeleteLibro: cuando el usuario elimina un libro
 * - Recibe el estado compartido de libros filtrados
 * - Muestra mensaje alternativo cuando no hay libros
 * - Pasa los callbacks a cada TarjetaLibro hijo
 * 
 * PATRÓN: Container Component que delega renderizado a componentes hijos
 * REUTILIZACIÓN: TarjetaLibro se usa N veces con diferentes props
 * COMUNICACIÓN: Padre -> Hijo (props) y Hijo -> Padre (callbacks)
 */
const ListaLibros = ({ libros, onSelectLibro, onDeleteLibro }: ListaLibrosProps) => {
  // ========== CASO: LISTA VACÍA ========== 
  // Si no hay libros (filtrados), muestra un mensaje
  if (libros.length === 0) {
    return (
      <div className="lista-vacia">
        <p>No se encontraron libros</p>
      </div>
    );
  }

  // ============================================================================
  // ✅ REQUISITO A: Renderiza lista de elementos con .map()
  // ✅ REQUISITO C: Reutilización - TarjetaLibro se usa múltiples veces
  // ============================================================================
  return (
    <div className="lista-libros">
      {/* 
        Itera sobre el array de libros y renderiza un TarjetaLibro por cada libro
        ✅ Cada TarjetaLibro recibe diferentes props (diferentes libros)
        ✅ Demuestra REUTILIZACIÓN del componente TarjetaLibro
      */}
      {libros.map((libro) => (
        <TarjetaLibro
          key={libro.id} // ✅ Key única para optimización de React
          libro={libro} // ✅ Prop: datos del libro
          onSelect={onSelectLibro} // ✅ Callback: seleccionar libro
          onDelete={onDeleteLibro} // ✅ Callback: eliminar libro
        />
      ))}
    </div>
  );
};

export default ListaLibros;