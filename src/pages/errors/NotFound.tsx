import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-404">404</h1>
        <h2>Página no encontrada</h2>
        <p className="not-found-message">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-home">
            🏠 Ir al inicio
          </Link>
          <Link to="/libros" className="btn-libros">
            📚 Ver mis libros
          </Link>
        </div>
        <div className="not-found-illustration">
          📖📚🔍
        </div>
      </div>
    </div>
  );
}
