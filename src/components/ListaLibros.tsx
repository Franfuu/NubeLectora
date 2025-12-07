// src/components/ListaLibros.tsx
import type { Libro } from "../types/libro";
import TarjetaLibro from "./TarjetaLibro";
import "./ListaLibros.css";

interface PropsLista {
  libros: Libro[];
  alSeleccionarLibro: (libro: Libro) => void;
}
 
function ListaLibros({ libros, alSeleccionarLibro }: PropsLista) {
  return (
    <div className="lista-libros">
      {libros.map((libro) => (
        <TarjetaLibro 
          key={libro.id} 
          libro={libro} 
          alSeleccionar={alSeleccionarLibro} 
        />
      ))}
    </div>
  );
}

export default ListaLibros;