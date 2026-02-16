import { useState } from 'react';

interface FiltrosProps {
  onFiltrarEstado: (estado: string) => void;
  onBuscar: (texto: string) => void;
}

const Filtros = ({ onFiltrarEstado, onBuscar }: FiltrosProps) => {
  
  const [estadoActivo, setEstadoActivo] = useState('todos');

  
  const cambiarFiltro = (estado: string) => {
    setEstadoActivo(estado); 
    onFiltrarEstado(estado); 
  };

  return (
    <div className="filtros">
      
      <input
        type="text"
        className="input-busqueda"
        placeholder="Buscar por título o autor..."
        onChange={(e) => onBuscar(e.target.value)} 
      />

      
      <div className="filtros-estado">
        
        <button
          className={estadoActivo === 'todos' ? 'active' : ''} 
          onClick={() => cambiarFiltro('todos')} 
        >
          Todos
        </button>
        
   
        <button
          className={estadoActivo === 'leido' ? 'active' : ''} 
          onClick={() => cambiarFiltro('leido')} 
        >
          Leídos
        </button>
  

        <button
          className={estadoActivo === 'leyendo' ? 'active' : ''} 
          onClick={() => cambiarFiltro('leyendo')}
        >
          Leyendo
        </button>
        
        
        <button
          className={estadoActivo === 'pendiente' ? 'active' : ''} 
          onClick={() => cambiarFiltro('pendiente')} 
        >
          Pendientes
        </button>
      </div>
    </div>
  );
};

export default Filtros;