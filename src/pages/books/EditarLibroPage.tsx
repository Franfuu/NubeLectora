import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { librosService } from '../../services/librosService';
import type { Libro } from '../../types/libro';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FormularioLibroEditable from '../../components/forms/FormularioLibroEditable';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { useAuth } from '../../auth/authContext';
import './EditarLibroPage.css';

export default function EditarLibroPage() {
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

  const handleUpdate = async (formData: Partial<Libro>) => {
    if (!libro) return;

    try {
      await librosService.update(libro.id, formData);
      navigate(`/libros/${libro.id}`);
    } catch (err) {
      alert((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al actualizar el libro');
    }
  };

  const handleCancel = () => {
    navigate(`/libros/${id}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="editar-libro-page">
        <Header onLogout={handleLogout} />
        <LoadingSpinner message="Cargando libro..." />
        <Footer />
      </div>
    );
  }

  if (error || !libro) {
    return (
      <div className="editar-libro-page">
        <Header onLogout={handleLogout} />
        <div className="error-container">
          <h2>Error</h2>
          <ErrorMessage message={error || 'Libro no encontrado'} />
          <Link to="/libros" className="btn-back">
            ← Volver a la lista
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="editar-libro-page">
      <Header onLogout={handleLogout} />

      <div className="editar-container">
        <div className="editar-header">
          <Link to={`/libros/${id}`} className="btn-back">
            <ArrowLeft size={20} />
            Volver al detalle
          </Link>
          <h1>Editar Libro</h1>
        </div>

        <FormularioLibroEditable
          libroInicial={libro}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
          textoBtnSubmit="Guardar Cambios"
          textoBtnCancel="Cancelar"
          mostrarVistaPrevia={true}
        />
      </div>

      <Footer />
    </div>
  );
}

