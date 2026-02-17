import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../auth/authContext';
import { librosService } from '../../services/librosService';
import type { Libro } from '../../types/libro';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Estadisticas from '../../components/stats/Estadisticas';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import './EstadisticasPage.css';

export default function EstadisticasPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await librosService.getAll();
      setLibros(data);
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="estadisticas-page">
        <Header onLogout={handleLogout} />
        <LoadingSpinner message="Cargando estadísticas..." />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="estadisticas-page">
        <Header onLogout={handleLogout} />
        <div className="error-container">
          <h2>Error al cargar las estadísticas</h2>
          <p>{error}</p>
          <button onClick={cargarLibros} className="btn-retry">
            Reintentar
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="estadisticas-page">
      <Header onLogout={handleLogout} />

      <div className="estadisticas-container">
        <div className="estadisticas-header">
          <Link to="/libros" className="btn-back">
            <ArrowLeft size={20} />
            Volver a la biblioteca
          </Link>
          <h1>📊 Estadísticas de Lectura</h1>
          <p className="subtitle">Resumen completo de tu actividad lectora</p>
        </div>

        <div className="estadisticas-content">
          <Estadisticas libros={libros} />
          
          {libros.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">📚</span>
              <h3>No hay libros en tu biblioteca</h3>
              <p>Agrega libros para ver tus estadísticas de lectura</p>
              <Link to="/agregar-libro" className="btn-agregar-primary">
                Agregar mi primer libro
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
