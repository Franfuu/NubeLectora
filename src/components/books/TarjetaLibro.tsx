import type { Libro } from "../../types/libro";
import EtiquetaEstado from "../filters/EtiquetaEstado";

interface PropsTarjeta {
  libro: Libro;
  onSelect: (id: number) => void;
  mostrarDetalles?: boolean;
}

function TarjetaLibro({ libro, onSelect, mostrarDetalles = true }: PropsTarjeta) {
  const handleClick = () => {
    onSelect(libro.id);
  };

  return (
    <div className="tarjeta-libro" onClick={handleClick}>
      <img src={libro.portada} alt={libro.titulo} />

      <h3>{libro.titulo}</h3>

      <p className="autor">{libro.autor}</p>
      {mostrarDetalles && (
        <>
          <EtiquetaEstado estado={libro.estado} />

          {libro.calificacion && (
            <div className="calificacion">
              {"⭐".repeat(libro.calificacion)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TarjetaLibro;