import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { librosService } from '../../services/librosService';
import type { Libro } from '../../types/libro';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import VistaDetalleLibro from '../../components/books/VistaDetalleLibro';
import { useAuth } from '../../auth/authContext';
import './DetalleLibroPage.css';

export default function DetalleLibroPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [libro, setLibro] = useState<Libro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      cargarLibro(Number(id));
    }
  }, [id]);

  const cargarLibro = async (libroId: number) => {
    try {
      setLoading(true);
      setError('');
      const data = await librosService.getById(libroId);
      setLibro(data);
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al cargar el libro');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/libros/${id}/editar`);
  };

  const handleDelete = async () => {
    if (!libro) return;
    if (!confirm('¿Estás seguro de que deseas eliminar este libro?')) return;

    try {
      await librosService.delete(libro.id);
      navigate('/libros');
    } catch (err) {
      alert((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al eliminar el libro');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando libro...</p>
      </div>
    );
  }

  if (error || !libro) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Libro no encontrado'}</p>
        <Link to="/libros" className="btn-back">
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="detalle-libro-page">
      <Header onLogout={handleLogout} />

      <div className="detalle-container">
        <div className="detalle-header">
          <Link to="/libros" className="btn-back">
            <ArrowLeft size={20} />
            Volver a la lista
          </Link>
          <div className="detalle-actions">
            <button onClick={handleEdit} className="btn-edit">
              <Edit size={20} />
              Editar
            </button>
            <Button 
              texto="Eliminar" 
              color="danger" 
              onClick={handleDelete}
              icono={<Trash2 size={20} />}
            />
          </div>
        </div>

        <VistaDetalleLibro libro={libro} />
      </div>

      <Footer />
    </div>
  );
}
