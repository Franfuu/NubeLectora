// src/components/EtiquetaEstado.tsx
import "./EtiquetaEstado.css"; 

interface PropsEtiqueta {
  estado: "leido" | "pendiente" | "leyendo";
}

function EtiquetaEstado({ estado }: PropsEtiqueta) {
  // Decide la clase CSS según el estado (verde, naranja, etc.)
  const claseColor = estado === "leido" ? "etiqueta-leido" : "etiqueta-pendiente";
  
  return (
    <span className={`etiqueta ${claseColor}`}>
      {estado.toUpperCase()}
    </span>
  );
}

export default EtiquetaEstado;