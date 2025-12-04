import type { Libro } from "../types/libro";
import EtiquetaEstado from "./EtiquetaEstado";
import BotonAccion from "./BotonAccion";
import "./DetalleLibro.css";

interface PropsDetalle {
  libro: Libro;
  alBorrar: (id: number) => void;
}

function DetalleLibro({ libro, alBorrar }: PropsDetalle) {
  return (
    <div className="detalle-libro">
      <div className="cabecera-detalle">
        <img 
          src={libro.portada} 
          alt={`Portada de ${libro.titulo}`} 
          className="portada-grande" 
        />
        
        <div className="info-principal">
          <h2>{libro.titulo}</h2>
          <p className="autor">{libro.autor}</p>
          
          <div className="estado-container">
            <EtiquetaEstado estado={libro.estado} />
            {libro.calificacion && (
              <span className="calificacion">
                {"⭐".repeat(libro.calificacion)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="cuerpo-detalle">
        <h4>Reseña o Notas</h4>
        <p className="resena-texto">
          {libro.resena 
            ? libro.resena 
            : "No has añadido ninguna nota para este libro todavía."}
        </p>
      </div>

      <div className="pie-detalle">
        {/* Aquí reutilizamos el componente BotonAccion */}
        <BotonAccion 
          texto="Eliminar de la colección" 
          tipo="peligro" 
          onClick={() => alBorrar(libro.id)} 
        />
      </div>
    </div>
  );
}

export default DetalleLibro;