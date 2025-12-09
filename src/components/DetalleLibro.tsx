import type { Libro } from '../types/libro';
import Button from './Button';

interface DetalleLibroProps {
  libro: Libro | null;
  onClose: () => void;
}

const DetalleLibro = ({ libro, onClose }: DetalleLibroProps) => {
  if (!libro) return null;

  return (
    <div className="detalle-libro-overlay" onClick={onClose}>
      <div className="detalle-libro" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{libro.titulo}</h2>
          <Button texto="✕" color="danger" onClick={onClose} />
        </div>
        
        <img src={libro.portada} alt={libro.titulo} />
        
        <h3>{libro.autor}</h3>
        
        {libro.año && <p className="año">Año: {libro.año}</p>}
        
        <span className={`badge badge-${libro.estado}`}>
          {libro.estado.toUpperCase()}
        </span>
        
        {libro.calificacion && (
          <div className="calificacion-detalle">
            {'⭐'.repeat(libro.calificacion)}
          </div>
        )}
        
        {libro.resena && (
          <div className="resena">
            <h4>Reseña:</h4>
            <p>{libro.resena}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleLibro;