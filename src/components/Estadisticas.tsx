import type { Libro } from '../types/libro';

interface EstadisticasProps {
  libros: Libro[];
  mostrarTotalLeidos?: boolean;
}

const Estadisticas = ({ libros, mostrarTotalLeidos = true }: EstadisticasProps) => {
  const totalLibros = libros.length;
  const librosLeidos = libros.filter(l => l.estado === 'leido').length;
  const librosLeyendo = libros.filter(l => l.estado === 'leyendo').length;
  const librosPendientes = libros.filter(l => l.estado === 'pendiente').length;
  const porcentajeLeidos = totalLibros > 0 ? (librosLeidos / totalLibros) * 100 : 0;

  return (
    <div className="estadisticas">
      <h3>Estadísticas</h3>
      
      <div className="stats-grid">
        {mostrarTotalLeidos && (
        <div className="stat-item">
          <span className="stat-numero">{totalLibros}</span>
          <span className="stat-label">Total</span>
        </div>
         )}
        <div className="stat-item">
          <span className="stat-numero">{librosLeidos}</span>
          <span className="stat-label">Leídos</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-numero">{librosLeyendo}</span>
          <span className="stat-label">Leyendo</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-numero">{librosPendientes}</span>
          <span className="stat-label">Pendientes</span>
        </div>
      </div>

      <div className="progreso">
        <div 
          className="barra-progreso" 
          style={{ width: `${porcentajeLeidos}%` }}
        />
      </div>
    </div>
  );
};

export default Estadisticas;