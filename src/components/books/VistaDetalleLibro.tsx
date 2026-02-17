import EtiquetaEstado from '../filters/EtiquetaEstado';
import type { Libro } from '../../types/libro';

interface VistaDetalleLibroProps {
  libro: Libro;
}

const VistaDetalleLibro = ({ libro }: VistaDetalleLibroProps) => {
  return (
    <div className="detalle-content">
      <div className="detalle-imagen">
        <img src={libro.portada} alt={libro.titulo} />
      </div>

      <div className="detalle-info">
        <h1>{libro.titulo}</h1>
        <p className="autor">Por {libro.autor}</p>
        <div className="meta-info">
          <span className="año">📅 {libro.año}</span>
          <EtiquetaEstado estado={libro.estado} />
          {libro.calificacion && (
            <span className="calificacion">
              {'⭐'.repeat(libro.calificacion)}
            </span>
          )}
        </div>
        {libro.resena && (
          <div className="resena">
            <h3>Mi reseña</h3>
            <p>{libro.resena}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VistaDetalleLibro;
