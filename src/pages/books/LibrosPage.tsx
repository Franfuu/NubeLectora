import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../auth/authContext';
import { librosService } from '../../services/librosService';
import type { Libro } from '../../types/libro';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ListaLibros from '../../components/books/ListaLibros';
import Filtros from '../../components/filters/Filtros';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import './LibrosPage.css';

export default function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');

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
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  const seleccionarLibro = (id: number) => {
    navigate(`/libros/${id}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const librosFiltrados = libros.filter((libro) => {
    const cumpleFiltroEstado =
      filtroEstado === 'todos' || libro.estado === filtroEstado;
    const cumpleBusqueda =
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase());

    return cumpleFiltroEstado && cumpleBusqueda;
  });

  if (loading) {
    return (
      <div className="libros-page">
        <Header onLogout={handleLogout} />
        <LoadingSpinner message="Cargando libros..." />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="libros-page">
        <Header onLogout={handleLogout} />
        <div className="error-container">
          <h2>Error al cargar los libros</h2>
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
    <div className="libros-page">
      <Header onLogout={handleLogout} />

      <div className="main-container">
        {/* Sidebar izquierdo - Lista de nombres */}
        <aside className="sidebar-left">
          <h3>Mis Libros</h3>
          <div className="lista-nombres">
            {libros.length === 0 ? (
              <p className="empty-message">No hay libros</p>
            ) : (
              libros.map((libro) => (
                <div
                  key={libro.id}
                  className="nombre-libro-item"
                  onClick={() => seleccionarLibro(libro.id)}
                >
                  {libro.titulo}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Contenido central - Tarjetas de libros */}
        <main className="content-center">
          <div className="page-header">
            <h2>📚 Mi Biblioteca</h2>
            <p className="page-subtitle">
              {libros.length} {libros.length === 1 ? 'libro' : 'libros'}
            </p>
          </div>

          {librosFiltrados.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📚</span>
              <h3>No se encontraron libros</h3>
              <p>
                {libros.length === 0
                  ? 'Agrega tu primer libro para comenzar'
                  : 'Intenta con otros filtros de búsqueda'}
              </p>
              {libros.length === 0 && (
                <Link to="/agregar-libro" className="btn-agregar-primary">
                  <Plus size={20} />
                  Agregar mi primer libro
                </Link>
              )}
            </div>
          ) : (
            <ListaLibros
              libros={librosFiltrados}
              onSelectLibro={seleccionarLibro}
            />
          )}
        </main>

        {/* Sidebar derecho - Filtros */}
        <aside className="sidebar-right">
          <Filtros onFiltrarEstado={setFiltroEstado} onBuscar={setBusqueda} />
          <Link to="/agregar-libro" className="btn-agregar-sidebar">
            <Plus size={20} strokeWidth={2} />
            Agregar Libro
          </Link>
        </aside>
      </div>
      
      <Footer />
    </div>
  );
}
