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

/**
 * ============================================================================
 * ✅ REQUISITO A: Componente raíz App
 * ============================================================================
 * 
 * Este es el componente principal que cumple con:
 * - Controla el estado global que se comparte entre componentes
 * - Coordina la comunicación entre todos los componentes hijos
 * - Gestiona las operaciones principales de la aplicación
 */
function App() {
  // ============================================================================
  // ESTADOS GLOBALES DE LA APLICACIÓN
  // ============================================================================
  
  /**
   * Estado que almacena el array completo de libros
   * ✅ REQUISITO B.2: Estado compartido entre varios componentes
   * - Lo leen: ListaLibros, Estadisticas, Filtros
   * - Lo modifican: FormularioLibro (vía agregarLibro), LibroCard (vía eliminarLibro)
   */
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);
  
  /**
   * Estado que almacena el libro actualmente seleccionado
   * ✅ REQUISITO B.2: Estado compartido entre varios componentes
   * - Lo lee: DetalleLibro
   * - Lo modifica: LibroCard (vía seleccionarLibro)
   */
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libro | null>(null);
  
  /**
   * Estado que controla el filtro por estado (todos, leído, leyendo, pendiente)
   * ✅ REQUISITO B.2: Estado compartido entre varios componentes
   * - Lo lee: App (para filtrar libros)
   * - Lo modifica: Filtros (vía setFiltroEstado)
   */
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  
  /**
   * Estado que controla la búsqueda por texto
   * ✅ REQUISITO B.2: Estado compartido entre varios componentes
   * - Lo lee: App (para filtrar libros)
   * - Lo modifica: Filtros (vía setBusqueda)
   */
  const [busqueda, setBusqueda] = useState('');

  // ============================================================================

  // FUNCIONES CALLBACK PARA COMUNICACIÓN CON COMPONENTES HIJOS
  // ============================================================================

  /**
   * Agrega un nuevo libro al estado global
   * ✅ REQUISITO A: Callback que se pasa a FormularioLibro
   * Permite que el componente hijo modifique el estado del padre
   */
  const agregarLibro = (nuevoLibro: Omit<Libro, 'id'>) => {
    const id = Math.max(...libros.map(l => l.id)) + 1;
    setLibros([...libros, { ...nuevoLibro, id }]);
  };

  /**
   * Elimina un libro del estado global
   * ✅ REQUISITO A: Callback que se pasa a ListaLibros -> LibroCard
   * Permite que el componente hijo modifique el estado del padre
   */
  const eliminarLibro = (id: number) => {
    setLibros(libros.filter(libro => libro.id !== id));
    if (libroSeleccionado?.id === id) {
      setLibroSeleccionado(null);
    }
  };

  /**
   * Selecciona un libro para mostrar sus detalles
   * ✅ REQUISITO A: Callback que se pasa a ListaLibros -> LibroCard
   * Permite que el componente hijo modifique el estado del padre
   */
  const seleccionarLibro = (id: number) => {
    const libro = libros.find(l => l.id === id);
    setLibroSeleccionado(libro || null);
  };

  // ============================================================================
  // LÓGICA DE FILTRADO
  // ============================================================================
  
  /**
   * Filtra los libros según el estado seleccionado y el texto de búsqueda
   * Combina dos estados compartidos (filtroEstado y busqueda) para crear
   * una lista filtrada que se pasa a ListaLibros
   */
  const librosFiltrados = libros.filter(libro => {
    const cumpleFiltroEstado = filtroEstado === 'todos' || libro.estado === filtroEstado;
    const cumpleBusqueda = 
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltroEstado && cumpleBusqueda;
  });

  // ============================================================================
  // RENDERIZADO DE LA INTERFAZ
  // ============================================================================

  return (
    <div className="app">
      {/* 
        ============================================================================
        ✅ REQUISITO A: Componente sin props (Header)
        ============================================================================

        Header no recibe ninguna prop, es completamente estático
      */}
      <Header />
      
      <div className="container">
        {/* ========== COLUMNA IZQUIERDA: FORMULARIO ========== */}
        <aside className="sidebar-formulario">
          <h2>Agregar Libro</h2>
          
          {/* 
            ============================================================================
            ✅ REQUISITO A: Componente formulario controlado (FormularioLibro)
            ✅ REQUISITO A: Componente que recibe callback (onAgregarLibro)
            ✅ REQUISITO B.1: Componente con estado local (useState para todos los inputs)
            ============================================================================

            FormularioLibro cumple con:
            - Usa useState internamente para: titulo, autor, portada, año, estado, resena, calificacion
            - Recibe la función agregarLibro como callback para modificar el estado del padre
            - Es un formulario completamente controlado (controlled component)
          */}
          <FormularioLibro onAgregarLibro={agregarLibro} />
        </aside>

        {/* ========== COLUMNA CENTRAL: CONTENIDO PRINCIPAL ========== */}
        <main className="main-content">
          {/* 
            ============================================================================
            ✅ REQUISITO A: Componente que recibe props para personalizar contenido
            ============================================================================

            Estadisticas cumple con:
            - Recibe el estado compartido 'libros' como prop
            - Calcula y muestra estadísticas basadas en los datos recibidos
            - Personaliza su contenido según la prop recibida
          */}
          <Estadisticas libros={libros} />

          {/* 
            ============================================================================
            ✅ REQUISITO A: Componente que recibe callbacks
            ✅ REQUISITO B.1: Componente con estado local (estadoActivo)
            ============================================================================

            Filtros cumple con:
            - Recibe callbacks (setFiltroEstado, setBusqueda) para modificar estado del padre
            - Tiene su propio estado local 'estadoActivo' independiente
            - Permite comunicación hijo -> padre mediante callbacks
          */}
          <Filtros 
            onFiltrarEstado={setFiltroEstado}
            onBuscar={setBusqueda}
          />

          {/* 
            ============================================================================
            ✅ REQUISITO A: Componente que muestra lista de elementos
            ✅ REQUISITO A: Componente que recibe callbacks
            ============================================================================

            ListaLibros cumple con:
            - Renderiza múltiples veces el componente LibroCard usando .map()
            - Recibe callbacks para comunicar eventos (seleccionar, eliminar)
            - Recibe el estado filtrado de libros como prop
          */}
          <ListaLibros 
            libros={librosFiltrados}
            onSelectLibro={seleccionarLibro}
            onDeleteLibro={eliminarLibro}
          />
        </main>

        {/* ========== COLUMNA DERECHA: DETALLE DEL LIBRO ========== */}
        {/* 
          ============================================================================
          ✅ REQUISITO A: Panel de información de elemento seleccionado
          ============================================================================

          DetalleLibro cumple con:
          - Actúa como "visor" del elemento seleccionado por el usuario
          - Lee el estado compartido 'libroSeleccionado'
          - Muestra información detallada del libro seleccionado
          - Se muestra condicionalmente según si hay un libro seleccionado
        */}
        <aside className={`detalle-libro-panel ${libroSeleccionado ? 'show' : 'empty'}`}>
          {libroSeleccionado ? (
            <DetalleLibro 
              libro={libroSeleccionado} 
              onClose={() => setLibroSeleccionado(null)}
            />
          ) : (
            <p>Selecciona un libro para ver sus detalles</p>
          )}
        </aside>
      </div>

      {/* 
        ============================================================================

        ✅ REQUISITO A: Componente sin props (Footer)
        ============================================================================

        Footer no recibe ninguna prop, es completamente estático
      */}
      <Footer />
    </div>
  );
}

export default App;