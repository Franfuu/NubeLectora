import { useAuth } from '../../auth/authContext';
import { useLocation, Link } from 'react-router-dom';
import { User, LogOut, BookOpen, Plus, BarChart3, Library } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onLogout?: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to={isAuthenticated ? "/libros" : "/"} className="header-brand">
          <BookOpen size={32} strokeWidth={2} className="header-logo-icon" />
          <div>
            <h1>NubeLectora</h1>
            <p>Tu biblioteca personal en la nube</p>
          </div>
        </Link>

        {isAuthenticated && (
          <>
            <nav className="header-nav">
              <Link 
                to="/libros" 
                className={`nav-link ${isActive('/libros') ? 'active' : ''}`}
              >
                <Library size={20} />
                <span>Mi Biblioteca</span>
              </Link>
              <Link 
                to="/agregar-libro" 
                className={`nav-link ${isActive('/agregar-libro') ? 'active' : ''}`}
              >
                <Plus size={20} />
                <span>Agregar Libro</span>
              </Link>
              <Link 
                to="/estadisticas" 
                className={`nav-link ${isActive('/estadisticas') ? 'active' : ''}`}
              >
                <BarChart3 size={20} />
                <span>Estadísticas</span>
              </Link>
            </nav>

            <div className="header-user">
              <span className="user-name">
                <User size={20} strokeWidth={2} />
                {user?.name}
              </span>
              {onLogout && (
                <button onClick={onLogout} className="btn-logout">
                  <LogOut size={18} strokeWidth={2} />
                  Cerrar sesión
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;