import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import PrivateRoute from './routing/PrivateRoute';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LibrosPage from './pages/books/LibrosPage';
import AgregarLibroPage from './pages/books/AgregarLibroPage';
import EstadisticasPage from './pages/stats/EstadisticasPage';
import DetalleLibroPage from './pages/books/DetalleLibroPage';
import EditarLibroPage from './pages/books/EditarLibroPage';
import NotFound from './pages/errors/NotFound';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas (requieren autenticación) */}
          <Route
            path="/libros"
            element={
              <PrivateRoute>
                <LibrosPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/agregar-libro"
            element={
              <PrivateRoute>
                <AgregarLibroPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/estadisticas"
            element={
              <PrivateRoute>
                <EstadisticasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/libros/:id"
            element={
              <PrivateRoute>
                <DetalleLibroPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/libros/:id/editar"
            element={
              <PrivateRoute>
                <EditarLibroPage />
              </PrivateRoute>
            }
          />

          {/* Ruta 404 - debe estar al final */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
