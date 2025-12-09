// 7. Componente con props personalizables y estado local
import { useState } from 'react';

interface FiltrosProps {
  onFiltrarEstado: (estado: string) => void;
  onBuscar: (texto: string) => void;
}

const Filtros = ({ onFiltrarEstado, onBuscar }: FiltrosProps) => {
  const [busqueda, setBusqueda] = useState('');

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);
    onBuscar(valor);
  };

  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="🔍 Buscar por título o autor..."
        value={busqueda}
        onChange={handleBusqueda}
        className="input-busqueda"
      />
      
      <div className="filtros-estado">
        <button onClick={() => onFiltrarEstado('todos')}>Todos</button>
        <button onClick={() => onFiltrarEstado('leido')}>Leídos</button>
        <button onClick={() => onFiltrarEstado('leyendo')}>Leyendo</button>
        <button onClick={() => onFiltrarEstado('pendiente')}>Pendientes</button>
      </div>
    </div>
  );
};

export default Filtros;