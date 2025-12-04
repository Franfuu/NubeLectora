// src/components/TarjetaLibro.tsx
import type { Libro } from "../types/libro";
import EtiquetaEstado from "./EtiquetaEstado";
import "./TarjetaLibro.css";

interface PropsTarjeta {
  libro: Libro;
  alSeleccionar: (libro: Libro) => void; // Callback al padre
}

function TarjetaLibro({ libro, alSeleccionar }: PropsTarjeta) {
  return (
    <div className="tarjeta-libro" onClick={() => alSeleccionar(libro)}>
      <img src={libro.portada} alt={libro.titulo} />
      <div className="info-tarjeta">
        <h4>{libro.titulo}</h4>
        <p>{libro.autor}</p>
        {/* Reutilizamos el componente EtiquetaEstado dentro de la tarjeta */}
        <EtiquetaEstado estado={libro.estado} />
      </div>
    </div>
  );
}

export default TarjetaLibro;