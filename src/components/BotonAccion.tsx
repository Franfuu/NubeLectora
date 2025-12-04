import "./BotonAccion.css";

interface PropsBoton {
  texto: string;
  onClick: () => void;
  tipo?: "primario" | "peligro"; // Para cambiar el color (azul o rojo)
}

function BotonAccion({ texto, onClick, tipo = "primario" }: PropsBoton) {
  return (
    <button 
      className={`boton-accion boton-${tipo}`} 
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default BotonAccion;