// 8. Componente que recibe props para personalizar apariencia
import type { Libro } from '../types/libro';

interface EstadisticasProps {
  libros: Libro[];
  color?: string;
  mostrarDetalles?: boolean;
}

const Estadisticas = ({ libros, color = '#6200ea', mostrarDetalles = true }: EstadisticasProps) => {
  const leidos = libros.filter(l => l.estado === 'leido').length;
  const leyendo = libros.filter(l => l.estado === 'leyendo').length;
  const pendientes = libros.filter(l => l.estado === 'pendiente').length;
  const total = libros.length;

  return (
    <div className="estadisticas" style={{ borderColor: color }}>
      <h3 style={{ color }}>Estadísticas</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-numero">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-numero">{leidos}</span>
          <span className="stat-label">Leídos</span>
        </div>
        <div className="stat-item">
          <span className="stat-numero">{leyendo}</span>
          <span className="stat-label">Leyendo</span>
        </div>
        <div className="stat-item">
          <span className="stat-numero">{pendientes}</span>
          <span className="stat-label">Pendientes</span>
        </div>
      </div>
      
      {mostrarDetalles && (
        <div className="progreso">
          <div 
            className="barra-progreso" 
            style={{ 
              width: `${(leidos/total)*100}%`,
              backgroundColor: color 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Estadisticas;