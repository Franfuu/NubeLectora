// 2. Componente reutilizable (Tarjeta de libro)
import type { Libro } from '../types/libro';

interface LibroCardProps {
  libro: Libro;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

const LibroCard = ({ libro, onSelect, onDelete }: LibroCardProps) => {
  const getEstadoColor = () => {
    switch(libro.estado) {
      case 'leido': return '#4caf50';
      case 'leyendo': return '#ff9800';
      case 'pendiente': return '#f44336';
    }
  };

  return (
    <div className="libro-card" onClick={() => onSelect(libro.id)}>
      <img src={libro.portada} alt={libro.titulo} />
      <h3>{libro.titulo}</h3>
      <p className="autor">{libro.autor}</p>
      <span className="estado" style={{ backgroundColor: getEstadoColor() }}>
        {libro.estado}
      </span>
      {libro.calificacion && (
        <div className="calificacion">
          {'⭐'.repeat(libro.calificacion)}
        </div>
      )}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(libro.id);
        }}
        className="btn-delete"
      >
        🗑️
      </button>
    </div>
  );
};

export default LibroCard;