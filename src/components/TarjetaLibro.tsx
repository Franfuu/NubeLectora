import type { Libro } from "../types/libro";
import EtiquetaEstado from "./EtiquetaEstado";

interface PropsTarjeta {
  libro: Libro;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  mostrarDetalles?: boolean;
}

function TarjetaLibro({ libro, onSelect, onDelete, mostrarDetalles = true }: PropsTarjeta) {
  const handleClick = () => {
    onSelect(libro.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(libro.id);
  };

  return (
    <div className="tarjeta-libro" onClick={handleClick}>
      <button
        className="btn-delete"
        onClick={handleDelete}
        title="Eliminar libro"
      >
        X
      </button>

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