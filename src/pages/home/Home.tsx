import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import './Home.css';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>📚 Bienvenido a NubeLectora</h1>
        <p className="home-subtitle">
          Tu biblioteca personal en la nube. Organiza, rastrea y disfruta de tus lecturas.
        </p>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">📖</span>
          <h3>Gestiona tu biblioteca</h3>
          <p>Añade, edita y organiza todos tus libros en un solo lugar</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">⭐</span>
          <h3>Califica y reseña</h3>
          <p>Guarda tus opiniones y calificaciones de cada libro</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3>Estadísticas</h3>
          <p>Visualiza tu progreso de lectura y estadísticas</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Busca y filtra</h3>
          <p>Encuentra rápidamente cualquier libro de tu colección</p>
        </div>
      </div>

      <div className="home-cta">
        {isAuthenticated ? (
          <div className="home-welcome">
            <p>¡Hola, {user?.name}!</p>
            <Link to="/libros" className="btn-primary">
              Ir a mi biblioteca
            </Link>
          </div>
        ) : (
          <div className="home-welcome">
            <p>Comienza a organizar tu biblioteca hoy</p>
            <div className="home-cta-buttons">
              <Link to="/login" className="btn-primary">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn-secondary">
                Crear cuenta
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
