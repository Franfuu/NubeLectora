import { useState } from 'react';
import { Search, BookOpen, Check, Clock, Inbox } from 'lucide-react';

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
      
      <div style={{ position: 'relative' }}>
        <Search 
          size={20} 
          strokeWidth={2} 
          style={{ 
            position: 'absolute', 
            left: '1rem', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#7A7A7A',
            pointerEvents: 'none'
          }} 
        />
        <input
          type="text"
          className="input-busqueda"
          placeholder="Buscar por título o autor..."
          onChange={(e) => onBuscar(e.target.value)}
          style={{ paddingLeft: '3rem' }}
        />
      </div>

      
      <div className="filtros-estado">
        
        <button
          className={estadoActivo === 'todos' ? 'active' : ''} 
          onClick={() => cambiarFiltro('todos')} 
        >
          <BookOpen size={16} strokeWidth={2} />
          Todos
        </button>
        
   
        <button
          className={estadoActivo === 'leido' ? 'active' : ''} 
          onClick={() => cambiarFiltro('leido')} 
        >
          <Check size={16} strokeWidth={2} />
          Leídos
        </button>
  

        <button
          className={estadoActivo === 'leyendo' ? 'active' : ''} 
          onClick={() => cambiarFiltro('leyendo')}
        >
          <Clock size={16} strokeWidth={2} />
          Leyendo
        </button>
        
        
        <button
          className={estadoActivo === 'pendiente' ? 'active' : ''} 
          onClick={() => cambiarFiltro('pendiente')} 
        >
          <Inbox size={16} strokeWidth={2} />
          Pendientes
        </button>
      </div>
    </div>
  );
};

export default Filtros;