// src/App.tsx
import { useState } from "react";
import { librosIniciales } from "./data/libros"; // Asumiendo que ya creaste este archivo
import type { Libro } from "./types/libro";

// Importamos nuestros componentes en español
import Header from "./components/Header";
import ListaLibros from "./components/ListaLibros";
import DetalleLibro from "./components/DetalleLibro";
import FormularioLibro from "./components/FormularioLibro";
import "./App.css";

function App() {
  // ESTADO COMPARTIDO (Requisito B.2)
  // 1. Array de libros: lo leen ListaLibros y lo modifica FormularioLibro/DetalleLibro
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);
  
  // 2. Libro seleccionado: lo modifica ListaLibros y lo lee DetalleLibro
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libro | null>(null);

  // Funciones para modificar el estado (Callbacks)
  
  function agregarLibro(nuevo: Libro) {
    setLibros([...libros, nuevo]);
  }

  function seleccionarLibro(libro: Libro) {
    setLibroSeleccionado(libro);
  }

  function borrarLibro(id: number) {
    setLibros(libros.filter((l) => l.id !== id));
    setLibroSeleccionado(null); // Deseleccionar si lo borramos
  }

  return (
    <div className="contenedor-app">
      <Header /> {/* Requisito A: Componente sin props */}
      
      <main className="contenido-principal">
        <section className="panel-izquierdo">
          <FormularioLibro alAgregarLibro={agregarLibro} />
          
          <div className="separador"></div>
          
          <h3>Mi Colección</h3>
          <ListaLibros 
            libros={libros} 
            alSeleccionarLibro={seleccionarLibro} 
          />
        </section>

        <section className="panel-derecho">
          {/* Requisito A: Visor de elemento */}
          {libroSeleccionado ? (
            
            <DetalleLibro 
              libro={libroSeleccionado} 
              alBorrar={borrarLibro} 
            />
          ) : (
            <p className="mensaje-vacio">Selecciona un libro para ver los detalles</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;