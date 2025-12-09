// src/App.tsx
// Componente raíz App con gestión de estados
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FormularioLibro from './components/FormularioLibro';
import ListaLibros from './components/ListaLibros';
import DetalleLibro from './components/DetalleLibro';
import Filtros from './components/Filtros';
import Estadisticas from './components/Estadisticas';
import { librosIniciales } from './data/libros';
import type { Libro } from './types/libro';
import './App.css';

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libro | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');

  const agregarLibro = (nuevoLibro: Omit<Libro, 'id'>) => {
    const id = Math.max(...libros.map(l => l.id)) + 1;
    setLibros([...libros, { ...nuevoLibro, id }]);
  };

  const eliminarLibro = (id: number) => {
    setLibros(libros.filter(libro => libro.id !== id));
    if (libroSeleccionado?.id === id) {
      setLibroSeleccionado(null);
    }
  };

  const seleccionarLibro = (id: number) => {
    const libro = libros.find(l => l.id === id);
    setLibroSeleccionado(libro || null);
  };

  const librosFiltrados = libros.filter(libro => {
    const cumpleFiltroEstado = filtroEstado === 'todos' || libro.estado === filtroEstado;
    const cumpleBusqueda = 
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltroEstado && cumpleBusqueda;
  });

  return (
    <div className="app">
      <Header />
      
      <div className="container">
        {/* Sidebar izquierdo - Formulario */}
        <aside className="sidebar-formulario">
          <FormularioLibro onAgregarLibro={agregarLibro} />
        </aside>

        {/* Columna central - Contenido principal */}
        <main className="main-content">
          <Estadisticas libros={libros} color="#6200ea" mostrarDetalles={true} />

          <Filtros 
            onFiltrarEstado={setFiltroEstado}
            onBuscar={setBusqueda}
          />

          <ListaLibros 
            libros={librosFiltrados}
            onSelectLibro={seleccionarLibro}
            onDeleteLibro={eliminarLibro}
          />
        </main>

        {/* Panel derecho - Detalle del libro */}
        <aside className={`detalle-libro-panel ${libroSeleccionado ? 'show' : 'empty'}`}>
          {libroSeleccionado ? (
            <DetalleLibro 
              libro={libroSeleccionado}
              onClose={() => setLibroSeleccionado(null)}
            />
          ) : (
            <p>📖 Selecciona un libro para ver sus detalles</p>
          )}
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default App;