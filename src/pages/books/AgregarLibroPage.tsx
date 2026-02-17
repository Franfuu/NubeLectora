import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../auth/authContext';
import { librosService } from '../../services/librosService';
import type { Libro } from '../../types/libro';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FormularioLibroEditable from '../../components/forms/FormularioLibroEditable';
import './AgregarLibroPage.css';

export default function AgregarLibroPage() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAgregarLibro = async (nuevoLibro: Partial<Libro>) => {
    try {
      setLoading(true);
      await librosService.create(nuevoLibro as Omit<Libro, 'id' | 'userId'>);
      navigate('/libros');
    } catch (err) {
      alert((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al agregar el libro');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/libros');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="agregar-libro-page">
      <Header onLogout={handleLogout} />

      <div className="agregar-container">
        <div className="agregar-header">
          <Link to="/libros" className="btn-back">
            <ArrowLeft size={20} />
            Volver a la biblioteca
          </Link>
          <h1>Agregar Nuevo Libro</h1>
          <p className="subtitle">Completa la información del libro que deseas agregar a tu colección</p>
        </div>

        <FormularioLibroEditable
          onSubmit={handleAgregarLibro}
          onCancel={handleCancel}
          textoBtnSubmit={loading ? 'Agregando...' : 'Agregar Libro'}
          textoBtnCancel="Cancelar"
          mostrarVistaPrevia={true}
        />
      </div>

      <Footer />
    </div>
  );
}
