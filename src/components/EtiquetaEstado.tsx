interface EtiquetaEstado {
  estado: "leido" | "pendiente" | "leyendo";
}

const EtiquetaEstado = ({ estado }: EtiquetaEstado) => {
  const textos = {
    leido: "Leído",
    leyendo: "Leyendo",
    pendiente: "Pendiente"
  };

  return (
    <span className={`badge badge-${estado}`}>
      {textos[estado]}
    </span>
  );
};

export default EtiquetaEstado;